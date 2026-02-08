using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.DTOs.Tenants;

/// <summary>
/// Tenant DTO
/// </summary>
public class TenantDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
    public string? ContactPhone { get; set; }
    public string EntraTenantId { get; set; } = string.Empty;
    public SubscriptionTier SubscriptionTier { get; set; }
    public int MaxUsers { get; set; }
    public DateTime? SubscriptionExpiresAt { get; set; }
    public bool IsActive { get; set; }
    public bool AllowAnonymousReports { get; set; }
    public int MaxReportsPerDay { get; set; }
    public DateTime CreatedAt { get; set; }
}
