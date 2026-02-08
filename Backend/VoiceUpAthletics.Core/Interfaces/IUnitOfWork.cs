namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Unit of Work pattern for coordinating multiple repository operations
/// </summary>
public interface IUnitOfWork : IDisposable
{
    IReportRepository Reports { get; }
    IUserProfileRepository UserProfiles { get; }
    ITenantRepository Tenants { get; }
    IMessageRepository Messages { get; }
    IResourceRepository Resources { get; }
    IAuditLogRepository AuditLogs { get; }
    IReportAttachmentRepository ReportAttachments { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    Task BeginTransactionAsync(CancellationToken cancellationToken = default);
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);
    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
}
