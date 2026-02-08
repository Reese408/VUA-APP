using VoiceUpAthletics.Core.DTOs.Audit;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Service interface for audit logging
/// </summary>
public interface IAuditService
{
    Task LogAsync(string action, int? userId, string? entityType = null, int? entityId = null,
        string? details = null, string? ipAddress = null, string? userAgent = null,
        CancellationToken cancellationToken = default);

    Task LogIdentityUnmaskingAsync(int adminUserId, Guid unmaskedAnonymousId, string unmaskedUserId,
        string reason, string? ipAddress = null, string? userAgent = null,
        CancellationToken cancellationToken = default);

    Task<IEnumerable<AuditLogDto>> GetAuditLogsAsync(AuditLogFilterDto filter, CancellationToken cancellationToken = default);
    Task<IEnumerable<AuditLogDto>> GetIdentityUnmaskingLogsAsync(CancellationToken cancellationToken = default);
}
