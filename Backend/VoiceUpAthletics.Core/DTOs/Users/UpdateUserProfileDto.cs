using System.ComponentModel.DataAnnotations;

namespace VoiceUpAthletics.Core.DTOs.Users;

/// <summary>
/// DTO for updating user profile
/// </summary>
public class UpdateUserProfileDto
{
    [StringLength(100)]
    public string? Sport { get; set; }

    [StringLength(100)]
    public string? TeamName { get; set; }

    [StringLength(50)]
    public string? AcademicYear { get; set; }
}
