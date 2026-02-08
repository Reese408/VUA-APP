namespace VoiceUpAthletics.Core.DTOs.Users;

/// <summary>
/// DTO returned when an admin unmasks an athlete's identity
/// </summary>
public class UnmaskIdentityDto
{
    public Guid AnonymousId { get; set; }
    public string AnonymousAlias { get; set; } = string.Empty;
    public string RealName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Sport { get; set; }
    public string? TeamName { get; set; }
    public string? StudentId { get; set; }
    public DateTime UnmaskedAt { get; set; }
    public string UnmaskedBy { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
}
