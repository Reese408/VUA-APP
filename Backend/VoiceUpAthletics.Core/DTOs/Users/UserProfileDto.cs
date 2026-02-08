namespace VoiceUpAthletics.Core.DTOs.Users;

/// <summary>
/// User profile DTO
/// </summary>
public class UserProfileDto
{
    public int Id { get; set; }
    public string EntraObjectId { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
    public Guid AnonymousId { get; set; }
    public string AnonymousAlias { get; set; } = string.Empty;
    public string? Sport { get; set; }
    public string? TeamName { get; set; }
    public string? AcademicYear { get; set; }
    public bool IsActive { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsProfileComplete { get; set; }
    public DateTime CreatedAt { get; set; }
}
