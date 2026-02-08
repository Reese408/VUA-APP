using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Infrastructure.Data.Configurations;

public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
    public void Configure(EntityTypeBuilder<AuditLog> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Action)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(a => a.EntityType)
            .HasMaxLength(100);

        builder.Property(a => a.Details)
            .HasMaxLength(4000);

        builder.Property(a => a.IpAddress)
            .HasMaxLength(45); // IPv6 max length

        builder.Property(a => a.UserAgent)
            .HasMaxLength(500);

        builder.Property(a => a.UnmaskedUserId)
            .HasMaxLength(100);

        builder.Property(a => a.UnmaskingReason)
            .HasMaxLength(500);

        // Indexes for audit queries
        builder.HasIndex(a => a.UserId);
        builder.HasIndex(a => a.Action);
        builder.HasIndex(a => new { a.EntityType, a.EntityId });
        builder.HasIndex(a => a.CreatedAt);
        builder.HasIndex(a => new { a.TenantId, a.CreatedAt });

        // Special index for identity unmasking audits
        builder.HasIndex(a => a.UnmaskedUserId)
            .HasFilter("[UnmaskedUserId] IS NOT NULL");
    }
}
