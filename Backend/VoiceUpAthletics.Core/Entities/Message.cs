namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Represents a message in a report thread (conversation between athlete and staff)
/// </summary>
public class Message : TenantEntity
{
    public int ReportId { get; set; }
    public virtual Report? Report { get; set; }

    public int SentByUserId { get; set; }
    public virtual UserProfile? SentBy { get; set; }

    public string MessageText { get; set; } = string.Empty;

    // Display name shown to the recipient
    // For athletes: shows their AnonymousAlias
    // For staff: shows their real name or role
    public string DisplayName { get; set; } = string.Empty;

    // Internal notes are only visible to staff members
    public bool IsInternal { get; set; } = false;

    // Read tracking
    public bool IsRead { get; set; } = false;
    public DateTime? ReadAt { get; set; }
}
