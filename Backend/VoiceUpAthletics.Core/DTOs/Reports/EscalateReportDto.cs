using System.ComponentModel.DataAnnotations;

namespace VoiceUpAthletics.Core.DTOs.Reports;

/// <summary>
/// DTO for escalating a report
/// </summary>
public class EscalateReportDto
{
    [Required(ErrorMessage = "Reason is required")]
    [StringLength(500, MinimumLength = 10, ErrorMessage = "Reason must be between 10 and 500 characters")]
    public string Reason { get; set; } = string.Empty;
}
