using VoiceUpAthletics.Core.Constants;
using VoiceUpAthletics.Core.DTOs.Audit;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.Infrastructure.Services;

public class AuditService : IAuditService
{
    private readonly IUnitOfWork _unitOfWork;

    public AuditService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task LogAsync(string action, int? userId, string? entityType = null, int? entityId = null,
        string? details = null, string? ipAddress = null, string? userAgent = null,
        CancellationToken cancellationToken = default)
    {
        var auditLog = new AuditLog
        {
            Action = action,
            UserId = userId,
            EntityType = entityType,
            EntityId = entityId,
            Details = details,
            IpAddress = ipAddress,
            UserAgent = userAgent
        };

        await _unitOfWork.AuditLogs.AddAsync(auditLog, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    public async Task LogIdentityUnmaskingAsync(int adminUserId, Guid unmaskedAnonymousId, string unmaskedUserId,
        string reason, string? ipAddress = null, string? userAgent = null,
        CancellationToken cancellationToken = default)
    {
        var auditLog = new AuditLog
        {
            Action = AppConstants.AuditActions.IdentityUnmasked,
            UserId = adminUserId,
            UnmaskedUserId = unmaskedUserId,
            UnmaskingReason = reason,
            Details = $"Unmasked AnonymousId: {unmaskedAnonymousId}",
            IpAddress = ipAddress,
            UserAgent = userAgent
        };

        await _unitOfWork.AuditLogs.AddAsync(auditLog, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    public async Task<IEnumerable<AuditLogDto>> GetAuditLogsAsync(AuditLogFilterDto filter, CancellationToken cancellationToken = default)
    {
        var query = (await _unitOfWork.AuditLogs.GetAllAsync(cancellationToken)).AsQueryable();

        if (filter.UserId.HasValue)
        {
            query = query.Where(a => a.UserId == filter.UserId.Value);
        }

        if (!string.IsNullOrEmpty(filter.Action))
        {
            query = query.Where(a => a.Action == filter.Action);
        }

        if (!string.IsNullOrEmpty(filter.EntityType))
        {
            query = query.Where(a => a.EntityType == filter.EntityType);
        }

        if (filter.EntityId.HasValue)
        {
            query = query.Where(a => a.EntityId == filter.EntityId.Value);
        }

        if (filter.From.HasValue)
        {
            query = query.Where(a => a.CreatedAt >= filter.From.Value);
        }

        if (filter.To.HasValue)
        {
            query = query.Where(a => a.CreatedAt <= filter.To.Value);
        }

        var logs = query
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new AuditLogDto
            {
                Id = a.Id,
                UserId = a.UserId,
                Action = a.Action,
                EntityType = a.EntityType,
                EntityId = a.EntityId,
                Details = a.Details,
                IpAddress = a.IpAddress,
                UserAgent = a.UserAgent,
                CreatedAt = a.CreatedAt
            })
            .ToList();

        return logs;
    }

    public async Task<IEnumerable<AuditLogDto>> GetIdentityUnmaskingLogsAsync(CancellationToken cancellationToken = default)
    {
        var logs = await _unitOfWork.AuditLogs.GetIdentityUnmaskingLogsAsync(cancellationToken);

        return logs.Select(a => new AuditLogDto
        {
            Id = a.Id,
            UserId = a.UserId,
            Action = a.Action,
            EntityType = a.EntityType,
            EntityId = a.EntityId,
            Details = a.Details,
            IpAddress = a.IpAddress,
            UserAgent = a.UserAgent,
            CreatedAt = a.CreatedAt
        });
    }
}
