using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.Infrastructure.Data;

/// <summary>
/// Design-time factory for creating ApplicationDbContext during EF Core migrations.
/// This is only used by EF Core tools (dotnet ef migrations), not at runtime.
/// </summary>
public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

        // Use a placeholder connection string for migrations
        // The actual connection string will be configured in appsettings.json at runtime
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=VoiceUpAthletics;Trusted_Connection=True;");

        // Create a design-time tenant accessor (not used during migrations, but required for constructor)
        var designTimeTenantAccessor = new DesignTimeTenantAccessor();

        return new ApplicationDbContext(optionsBuilder.Options, designTimeTenantAccessor);
    }

    /// <summary>
    /// Design-time implementation of ITenantAccessor.
    /// This is only used during EF Core migrations and always returns TenantId = 1.
    /// </summary>
    private class DesignTimeTenantAccessor : ITenantAccessor
    {
        public int TenantId { get; set; } = 1;
        public string? TenantName { get; set; } = "DesignTime";
        public bool IsSet => true;
    }
}
