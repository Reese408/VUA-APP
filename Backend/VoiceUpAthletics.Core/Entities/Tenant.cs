using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Represents a university/institution tenant in the multi-tenant system
/// </summary>
public class Tenant : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty; // e.g., "umich" for umich.voiceupathletics.com
    public string? LogoUrl { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
    public string? ContactPhone { get; set; }

    // Entra ID Tenant ID (the Azure AD tenant for this university)
    public string EntraTenantId { get; set; } = string.Empty;

    // Subscription details
    public SubscriptionTier SubscriptionTier { get; set; } = SubscriptionTier.Trial;
    public int MaxUsers { get; set; } = 100;
    public DateTime? SubscriptionExpiresAt { get; set; }

    // Status
    public bool IsActive { get; set; } = true;

    // Settings
    public bool AllowAnonymousReports { get; set; } = true;
    public bool RequireStaffApproval { get; set; } = false;
    public int MaxReportsPerDay { get; set; } = 10;

    // Navigation properties
    public virtual ICollection<UserProfile> Users { get; set; } = new List<UserProfile>();
    public virtual ICollection<Report> Reports { get; set; } = new List<Report>();
    public virtual ICollection<Resource> Resources { get; set; } = new List<Resource>();
}
