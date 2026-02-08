namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Immutable audit log for HIPAA compliance.
/// NEVER soft-deleted - permanent record of all sensitive actions.
/// </summary>
public class AuditLog : TenantEntity
{
    public int? UserId { get; set; } // Nullable for system actions
    public string Action { get; set; } = string.Empty; // e.g., "Report.Created", "Identity.Unmasked"

    public string? EntityType { get; set; } // e.g., "Report", "Message"
    public int? EntityId { get; set; }

    public string? Details { get; set; } // JSON or text details
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }

    // For identity unmasking audit trail
    public string? UnmaskedUserId { get; set; }
    public string? UnmaskingReason { get; set; }
}
