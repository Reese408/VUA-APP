using Microsoft.EntityFrameworkCore;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.Infrastructure.Data;

/// <summary>
/// Main database context with multi-tenant global query filters
/// </summary>
public class ApplicationDbContext : DbContext
{
    private readonly ITenantAccessor _tenantAccessor;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ITenantAccessor tenantAccessor)
        : base(options)
    {
        _tenantAccessor = tenantAccessor;
    }

    // DbSets
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<ReportAttachment> ReportAttachments { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all entity configurations from the assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        // Apply global query filters for multi-tenancy
        // All TenantEntity-derived entities are automatically scoped by TenantId
        modelBuilder.Entity<UserProfile>().HasQueryFilter(e => !e.IsDeleted && e.TenantId == _tenantAccessor.TenantId);
        modelBuilder.Entity<Report>().HasQueryFilter(e => !e.IsDeleted && e.TenantId == _tenantAccessor.TenantId);
        modelBuilder.Entity<Message>().HasQueryFilter(e => !e.IsDeleted && e.TenantId == _tenantAccessor.TenantId);
        modelBuilder.Entity<ReportAttachment>().HasQueryFilter(e => !e.IsDeleted && e.TenantId == _tenantAccessor.TenantId);
        modelBuilder.Entity<Resource>().HasQueryFilter(e => !e.IsDeleted && e.TenantId == _tenantAccessor.TenantId);
        modelBuilder.Entity<AuditLog>().HasQueryFilter(e => e.TenantId == _tenantAccessor.TenantId); // AuditLog is NEVER soft-deleted

        // Tenant entity (not tenant-scoped, just soft-delete filter)
        modelBuilder.Entity<Tenant>().HasQueryFilter(e => !e.IsDeleted);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Update timestamps before saving
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    break;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
