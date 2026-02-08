using Microsoft.EntityFrameworkCore.Storage;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;

namespace VoiceUpAthletics.Infrastructure.Repositories;

/// <summary>
/// Unit of Work implementation for coordinating multiple repository operations
/// </summary>
public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IDbContextTransaction? _transaction;

    public UnitOfWork(ApplicationDbContext context,
        IReportRepository reports,
        IUserProfileRepository userProfiles,
        ITenantRepository tenants,
        IMessageRepository messages,
        IResourceRepository resources,
        IAuditLogRepository auditLogs,
        IReportAttachmentRepository reportAttachments)
    {
        _context = context;
        Reports = reports;
        UserProfiles = userProfiles;
        Tenants = tenants;
        Messages = messages;
        Resources = resources;
        AuditLogs = auditLogs;
        ReportAttachments = reportAttachments;
    }

    public IReportRepository Reports { get; }
    public IUserProfileRepository UserProfiles { get; }
    public ITenantRepository Tenants { get; }
    public IMessageRepository Messages { get; }
    public IResourceRepository Resources { get; }
    public IAuditLogRepository AuditLogs { get; }
    public IReportAttachmentRepository ReportAttachments { get; }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        _transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
    }

    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_transaction != null)
        {
            await _transaction.CommitAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_transaction != null)
        {
            await _transaction.RollbackAsync(cancellationToken);
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public void Dispose()
    {
        _transaction?.Dispose();
        _context.Dispose();
    }
}
