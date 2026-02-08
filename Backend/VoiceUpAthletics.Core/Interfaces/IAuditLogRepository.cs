using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Repository interface for AuditLog entity.
/// AuditLogs are IMMUTABLE - no updates or deletes allowed.
/// </summary>
public interface IAuditLogRepository : IRepository<AuditLog>
{
    Task<IEnumerable<AuditLog>> GetByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<AuditLog>> GetByEntityAsync(string entityType, int entityId, CancellationToken cancellationToken = default);
    Task<IEnumerable<AuditLog>> GetByActionAsync(string action, CancellationToken cancellationToken = default);
    Task<IEnumerable<AuditLog>> GetIdentityUnmaskingLogsAsync(CancellationToken cancellationToken = default);
}
