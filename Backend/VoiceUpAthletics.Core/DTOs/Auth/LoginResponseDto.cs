namespace VoiceUpAthletics.Core.DTOs.Auth;

/// <summary>
/// Response after successful Entra ID authentication
/// </summary>
public class LoginResponseDto
{
    public CurrentUserDto User { get; set; } = new();
    public bool IsFirstLogin { get; set; }
    public bool RequiresProfileCompletion { get; set; }
}
