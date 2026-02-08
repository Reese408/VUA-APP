using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Infrastructure.Data.Configurations;

public class ReportConfiguration : IEntityTypeConfiguration<Report>
{
    public void Configure(EntityTypeBuilder<Report> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(r => r.Description)
            .IsRequired()
            .HasMaxLength(5000);

        // Convert enums to strings
        builder.Property(r => r.Category)
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.Property(r => r.Severity)
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.Property(r => r.Status)
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.Property(r => r.ResolutionNotes)
            .HasMaxLength(2000);

        builder.Property(r => r.FlagReason)
            .HasMaxLength(500);

        builder.Property(r => r.IncidentDate)
            .HasMaxLength(100);

        builder.Property(r => r.IncidentLocation)
            .HasMaxLength(500);

        builder.Property(r => r.InvolvedParties)
            .HasMaxLength(1000);

        // Indexes for filtering
        builder.HasIndex(r => r.SubmittedByAnonymousId);
        builder.HasIndex(r => r.Status);
        builder.HasIndex(r => r.Category);
        builder.HasIndex(r => r.Severity);
        builder.HasIndex(r => r.AssignedToUserId);
        builder.HasIndex(r => r.IsFlagged);
        builder.HasIndex(r => r.IsEscalated);
        builder.HasIndex(r => r.CreatedAt);

        // Composite index for common queries
        builder.HasIndex(r => new { r.TenantId, r.Status, r.CreatedAt });

        // Relationships
        builder.HasMany(r => r.Messages)
            .WithOne(m => m.Report)
            .HasForeignKey(m => m.ReportId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(r => r.Attachments)
            .WithOne(a => a.Report)
            .HasForeignKey(a => a.ReportId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
