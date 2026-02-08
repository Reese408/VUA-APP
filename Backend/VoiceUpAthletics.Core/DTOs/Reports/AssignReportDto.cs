using System.ComponentModel.DataAnnotations;

namespace VoiceUpAthletics.Core.DTOs.Reports;

/// <summary>
/// DTO for assigning a report to a staff member
/// </summary>
public class AssignReportDto
{
    [Required(ErrorMessage = "Staff user ID is required")]
    public int StaffUserId { get; set; }
}
