namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Application-specific user profile data linked to Entra ID identity.
/// This is NOT an identity table - authentication is handled by Entra ID.
/// This table stores supplementary app data like sport, team, anonymous alias.
/// </summary>
public class UserProfile : TenantEntity
{
    // Link to Entra ID identity
    public string EntraObjectId { get; set; } = string.Empty; // From 'oid' claim in JWT

    // Basic user info (synced from Entra ID on login)
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    // Anonymity fields
    public Guid AnonymousId { get; set; } = Guid.NewGuid();
    public string AnonymousAlias { get; set; } = string.Empty; // e.g., "Athlete-X7K9M2"

    // Athlete-specific fields
    public string? Sport { get; set; }
    public string? TeamName { get; set; }
    public string? AcademicYear { get; set; } // Freshman, Sophomore, Junior, Senior, Graduate
    public string? StudentId { get; set; }

    // Status
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginAt { get; set; }

    // Rate limiting tracking
    public int ReportsSubmittedToday { get; set; } = 0;
    public DateTime? LastReportSubmittedAt { get; set; }

    // Profile completion
    public bool IsProfileComplete { get; set; } = false;

    // Navigation properties
    public virtual ICollection<Report> AssignedReports { get; set; } = new List<Report>(); // For staff
    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
