using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Reports;

/// <summary>
/// Detailed report DTO
/// </summary>
public class ReportDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public ReportCategory Category { get; set; }
    public string CategoryDisplay { get; set; } = string.Empty;
    public ReportSeverity Severity { get; set; }
    public string SeverityDisplay { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ReportStatus Status { get; set; }
    public string StatusDisplay { get; set; } = string.Empty;

    public string SubmittedByAlias { get; set; } = string.Empty;
    public Guid SubmittedByAnonymousId { get; set; }

    public int? AssignedToUserId { get; set; }
    public string? AssignedToName { get; set; }
    public DateTime? AssignedAt { get; set; }

    public bool IsFlagged { get; set; }
    public string? FlagReason { get; set; }
    public bool IsEscalated { get; set; }
    public DateTime? EscalatedAt { get; set; }

    public string? ResolutionNotes { get; set; }
    public DateTime? ResolvedAt { get; set; }

    public string? IncidentDate { get; set; }
    public string? IncidentLocation { get; set; }
    public string? InvolvedParties { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public int MessageCount { get; set; }
    public int AttachmentCount { get; set; }
}
