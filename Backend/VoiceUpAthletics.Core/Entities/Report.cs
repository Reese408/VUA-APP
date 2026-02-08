using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Represents an anonymous report submitted by an athlete.
/// CRITICAL: Reports are linked to AnonymousId (GUID), NOT the real user identity.
/// </summary>
public class Report : TenantEntity
{
    // Anonymity: Link to AnonymousId instead of UserId
    public Guid SubmittedByAnonymousId { get; set; }

    // Report details
    public string Title { get; set; } = string.Empty;
    public ReportCategory Category { get; set; }
    public ReportSeverity Severity { get; set; }
    public string Description { get; set; } = string.Empty;
    public ReportStatus Status { get; set; } = ReportStatus.Submitted;

    // Assignment (staff member handling the report)
    public int? AssignedToUserId { get; set; }
    public virtual UserProfile? AssignedTo { get; set; }
    public DateTime? AssignedAt { get; set; }

    // Flagging and escalation
    public bool IsFlagged { get; set; } = false;
    public string? FlagReason { get; set; }
    public bool IsEscalated { get; set; } = false;
    public DateTime? EscalatedAt { get; set; }

    // Resolution
    public string? ResolutionNotes { get; set; }
    public DateTime? ResolvedAt { get; set; }

    // Optional metadata (if athlete chooses to provide)
    public string? IncidentDate { get; set; }
    public string? IncidentLocation { get; set; }
    public string? InvolvedParties { get; set; }

    // Navigation properties
    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
    public virtual ICollection<ReportAttachment> Attachments { get; set; } = new List<ReportAttachment>();
}
