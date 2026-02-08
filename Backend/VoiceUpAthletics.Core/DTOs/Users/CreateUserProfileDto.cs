using System.ComponentModel.DataAnnotations;

namespace VoiceUpAthletics.Core.DTOs.Users;

/// <summary>
/// DTO for creating a new user profile (used by UserSyncMiddleware)
/// </summary>
public class CreateUserProfileDto
{
    [Required]
    public string EntraObjectId { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public int TenantId { get; set; }
}
