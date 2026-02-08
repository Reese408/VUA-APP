using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Infrastructure.Data.Configurations;

public class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.MessageText)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(m => m.DisplayName)
            .IsRequired()
            .HasMaxLength(100);

        // Indexes
        builder.HasIndex(m => m.ReportId);
        builder.HasIndex(m => m.SentByUserId);
        builder.HasIndex(m => m.IsRead);
        builder.HasIndex(m => m.CreatedAt);
    }
}
