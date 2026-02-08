using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Reports;

/// <summary>
/// Lightweight report DTO for list views
/// </summary>
public class ReportListItemDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public ReportCategory Category { get; set; }
    public string CategoryDisplay { get; set; } = string.Empty;
    public ReportSeverity Severity { get; set; }
    public string SeverityDisplay { get; set; } = string.Empty;
    public ReportStatus Status { get; set; }
    public string StatusDisplay { get; set; } = string.Empty;
    public string SubmittedByAlias { get; set; } = string.Empty;
    public int? AssignedToUserId { get; set; }
    public string? AssignedToName { get; set; }
    public bool IsFlagged { get; set; }
    public bool IsEscalated { get; set; }
    public DateTime CreatedAt { get; set; }
    public int UnreadMessageCount { get; set; }
}
