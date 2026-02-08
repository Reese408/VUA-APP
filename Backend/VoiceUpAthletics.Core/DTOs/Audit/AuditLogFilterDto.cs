namespace VoiceUpAthletics.Core.DTOs.Audit;

/// <summary>
/// Filter options for audit log queries
/// </summary>
public class AuditLogFilterDto
{
    public int? UserId { get; set; }
    public string? Action { get; set; }
    public string? EntityType { get; set; }
    public int? EntityId { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
}
