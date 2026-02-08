namespace VoiceUpAthletics.Core.DTOs.Auth;

/// <summary>
/// Current authenticated user information
/// </summary>
public class CurrentUserDto
{
    public int UserId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
    public Guid AnonymousId { get; set; }
    public string AnonymousAlias { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = new();
    public int TenantId { get; set; }
    public string TenantName { get; set; } = string.Empty;
    public bool IsProfileComplete { get; set; }
    public string? Sport { get; set; }
    public string? TeamName { get; set; }
}
