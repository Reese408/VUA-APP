using System.ComponentModel.DataAnnotations;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Reports;

/// <summary>
/// DTO for creating a new report
/// </summary>
public class CreateReportDto
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(200, MinimumLength = 5, ErrorMessage = "Title must be between 5 and 200 characters")]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "Category is required")]
    public ReportCategory Category { get; set; }

    [Required(ErrorMessage = "Severity is required")]
    public ReportSeverity Severity { get; set; }

    [Required(ErrorMessage = "Description is required")]
    [StringLength(5000, MinimumLength = 20, ErrorMessage = "Description must be between 20 and 5000 characters")]
    public string Description { get; set; } = string.Empty;

    public string? IncidentDate { get; set; }
    public string? IncidentLocation { get; set; }
    public string? InvolvedParties { get; set; }
}
