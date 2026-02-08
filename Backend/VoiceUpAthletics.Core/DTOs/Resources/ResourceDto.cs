using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Resources;

/// <summary>
/// Resource DTO
/// </summary>
public class ResourceDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ResourceCategory Category { get; set; }
    public string CategoryDisplay { get; set; } = string.Empty;
    public string? Url { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public bool IsEmergency { get; set; }
    public bool IsAvailable { get; set; }
    public string? AvailabilityHours { get; set; }
}
