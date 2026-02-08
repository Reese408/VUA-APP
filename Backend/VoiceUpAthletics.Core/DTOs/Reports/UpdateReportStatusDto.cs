using System.ComponentModel.DataAnnotations;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Reports;

/// <summary>
/// DTO for updating report status
/// </summary>
public class UpdateReportStatusDto
{
    [Required(ErrorMessage = "Status is required")]
    public ReportStatus Status { get; set; }

    [StringLength(1000, ErrorMessage = "Notes cannot exceed 1000 characters")]
    public string? Notes { get; set; }
}
