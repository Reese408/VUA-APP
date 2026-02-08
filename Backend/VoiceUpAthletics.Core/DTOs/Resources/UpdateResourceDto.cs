using System.ComponentModel.DataAnnotations;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Resources;

/// <summary>
/// DTO for updating a resource
/// </summary>
public class UpdateResourceDto
{
    [StringLength(200)]
    public string? Title { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    public ResourceCategory? Category { get; set; }

    [Url]
    public string? Url { get; set; }

    [Phone]
    public string? PhoneNumber { get; set; }

    [EmailAddress]
    public string? Email { get; set; }

    public bool? IsEmergency { get; set; }
    public bool? IsAvailable { get; set; }
    public string? AvailabilityHours { get; set; }
}
