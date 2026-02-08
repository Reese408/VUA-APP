using System.ComponentModel.DataAnnotations;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Resources;

/// <summary>
/// DTO for creating a new resource
/// </summary>
public class CreateResourceDto
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "Description is required")]
    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Category is required")]
    public ResourceCategory Category { get; set; }

    [Url]
    public string? Url { get; set; }

    [Phone]
    public string? PhoneNumber { get; set; }

    [EmailAddress]
    public string? Email { get; set; }

    public bool IsEmergency { get; set; } = false;
    public string? AvailabilityHours { get; set; }
}
