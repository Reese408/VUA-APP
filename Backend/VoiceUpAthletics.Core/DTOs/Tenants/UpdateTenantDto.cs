using System.ComponentModel.DataAnnotations;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Tenants;

/// <summary>
/// DTO for updating tenant settings
/// </summary>
public class UpdateTenantDto
{
    [StringLength(200)]
    public string? Name { get; set; }

    public string? LogoUrl { get; set; }

    [EmailAddress]
    public string? ContactEmail { get; set; }

    public string? ContactPhone { get; set; }

    public SubscriptionTier? SubscriptionTier { get; set; }
    public int? MaxUsers { get; set; }
    public DateTime? SubscriptionExpiresAt { get; set; }
    public bool? IsActive { get; set; }
    public bool? AllowAnonymousReports { get; set; }
    public int? MaxReportsPerDay { get; set; }
}
