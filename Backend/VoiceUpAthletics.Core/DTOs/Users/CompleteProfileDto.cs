using System.ComponentModel.DataAnnotations;

namespace VoiceUpAthletics.Core.DTOs.Users;

/// <summary>
/// DTO for completing user profile on first login (athlete information)
/// </summary>
public class CompleteProfileDto
{
    [Required(ErrorMessage = "Sport is required")]
    [StringLength(100)]
    public string Sport { get; set; } = string.Empty;

    [StringLength(100)]
    public string? TeamName { get; set; }

    [Required(ErrorMessage = "Academic year is required")]
    [StringLength(50)]
    public string AcademicYear { get; set; } = string.Empty;

    [StringLength(50)]
    public string? StudentId { get; set; }
}
