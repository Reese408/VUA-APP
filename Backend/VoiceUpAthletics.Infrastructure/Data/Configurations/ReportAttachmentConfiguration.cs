using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Infrastructure.Data.Configurations;

public class ReportAttachmentConfiguration : IEntityTypeConfiguration<ReportAttachment>
{
    public void Configure(EntityTypeBuilder<ReportAttachment> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.FileName)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(a => a.ContentType)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(a => a.BlobStorageUrl)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(a => a.BlobContainerName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(a => a.BlobName)
            .IsRequired()
            .HasMaxLength(500);

        // Indexes
        builder.HasIndex(a => a.ReportId);
    }
}
