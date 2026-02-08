using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Infrastructure.Data.Configurations;

public class ResourceConfiguration : IEntityTypeConfiguration<Resource>
{
    public void Configure(EntityTypeBuilder<Resource> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(r => r.Description)
            .IsRequired()
            .HasMaxLength(1000);

        // Convert enum to string
        builder.Property(r => r.Category)
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.Property(r => r.Url)
            .HasMaxLength(500);

        builder.Property(r => r.PhoneNumber)
            .HasMaxLength(50);

        builder.Property(r => r.Email)
            .HasMaxLength(255);

        builder.Property(r => r.AvailabilityHours)
            .HasMaxLength(200);

        // Indexes
        builder.HasIndex(r => r.Category);
        builder.HasIndex(r => r.IsEmergency);
        builder.HasIndex(r => r.DisplayOrder);
    }
}
