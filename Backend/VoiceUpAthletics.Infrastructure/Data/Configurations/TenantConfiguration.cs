using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Infrastructure.Data.Configurations;

public class TenantConfiguration : IEntityTypeConfiguration<Tenant>
{
    public void Configure(EntityTypeBuilder<Tenant> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(t => t.Subdomain)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(t => t.Subdomain)
            .IsUnique();

        builder.Property(t => t.ContactEmail)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(t => t.EntraTenantId)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(t => t.EntraTenantId);

        // Convert enum to string
        builder.Property(t => t.SubscriptionTier)
            .HasConversion<string>()
            .HasMaxLength(50);

        // Relationships
        builder.HasMany(t => t.Users)
            .WithOne(u => u.Tenant)
            .HasForeignKey(u => u.TenantId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(t => t.Reports)
            .WithOne(r => r.Tenant)
            .HasForeignKey(r => r.TenantId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(t => t.Resources)
            .WithOne(r => r.Tenant)
            .HasForeignKey(r => r.TenantId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
