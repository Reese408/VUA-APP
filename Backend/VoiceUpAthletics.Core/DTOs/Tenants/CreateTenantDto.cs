using System.ComponentModel.DataAnnotations;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Tenants;

/// <summary>
/// DTO for creating a new tenant (SuperAdmin only)
/// </summary>
public class CreateTenantDto
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(200, MinimumLength = 3)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Subdomain is required")]
    [StringLength(50, MinimumLength = 3)]
    [RegularExpression(@"^[a-z0-9-]+$", ErrorMessage = "Subdomain must contain only lowercase letters, numbers, and hyphens")]
    public string Subdomain { get; set; } = string.Empty;

    [Required(ErrorMessage = "Contact email is required")]
    [EmailAddress]
    public string ContactEmail { get; set; } = string.Empty;

    public string? ContactPhone { get; set; }

    [Required(ErrorMessage = "Entra Tenant ID is required")]
    public string EntraTenantId { get; set; } = string.Empty;

    public SubscriptionTier SubscriptionTier { get; set; } = SubscriptionTier.Trial;
    public int MaxUsers { get; set; } = 100;
}
