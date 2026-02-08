using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Infrastructure.Data.Configurations;

public class UserProfileConfiguration : IEntityTypeConfiguration<UserProfile>
{
    public void Configure(EntityTypeBuilder<UserProfile> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.EntraObjectId)
            .IsRequired()
            .HasMaxLength(100);

        // Composite unique index on EntraObjectId + TenantId
        builder.HasIndex(u => new { u.EntraObjectId, u.TenantId })
            .IsUnique();

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(255);

        builder.HasIndex(u => u.Email);

        builder.Property(u => u.FirstName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.LastName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.AnonymousAlias)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(u => u.AnonymousId)
            .IsUnique();

        builder.Property(u => u.Sport)
            .HasMaxLength(100);

        builder.Property(u => u.TeamName)
            .HasMaxLength(100);

        builder.Property(u => u.AcademicYear)
            .HasMaxLength(50);

        builder.Property(u => u.StudentId)
            .HasMaxLength(50);

        // Relationships
        builder.HasMany(u => u.AssignedReports)
            .WithOne(r => r.AssignedTo)
            .HasForeignKey(r => r.AssignedToUserId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(u => u.Messages)
            .WithOne(m => m.SentBy)
            .HasForeignKey(m => m.SentByUserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
