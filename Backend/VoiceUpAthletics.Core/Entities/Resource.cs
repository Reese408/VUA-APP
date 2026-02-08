using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Represents a support resource (counseling service, hotline, legal aid, etc.)
/// </summary>
public class Resource : TenantEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ResourceCategory Category { get; set; }

    public string? Url { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }

    // Is this an emergency/crisis resource?
    public bool IsEmergency { get; set; } = false;

    // Display order
    public int DisplayOrder { get; set; } = 0;

    // Availability
    public bool IsAvailable { get; set; } = true;
    public string? AvailabilityHours { get; set; }
}
