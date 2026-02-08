using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Reports;

/// <summary>
/// Filter options for report queries
/// </summary>
public class ReportFilterDto
{
    public ReportStatus? Status { get; set; }
    public ReportCategory? Category { get; set; }
    public ReportSeverity? Severity { get; set; }
    public int? AssignedToUserId { get; set; }
    public bool? IsFlagged { get; set; }
    public bool? IsEscalated { get; set; }
    public DateTime? CreatedFrom { get; set; }
    public DateTime? CreatedTo { get; set; }
    public string? SearchTerm { get; set; }

    // Pagination
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;

    // Sorting
    public string SortBy { get; set; } = "CreatedAt";
    public bool SortDescending { get; set; } = true;
}
