using Microsoft.EntityFrameworkCore;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Enums;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;

namespace VoiceUpAthletics.Infrastructure.Repositories;

public class ReportRepository : Repository<Report>, IReportRepository
{
    public ReportRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Report>> GetReportsByAnonymousIdAsync(Guid anonymousId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.SubmittedByAnonymousId == anonymousId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Report>> GetReportsByStatusAsync(ReportStatus status, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.Status == status)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Report>> GetReportsByCategoryAsync(ReportCategory category, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.Category == category)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Report>> GetReportsByAssignedStaffAsync(int staffUserId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.AssignedToUserId == staffUserId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Report>> GetFlaggedReportsAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.IsFlagged)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Report>> GetEscalatedReportsAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.IsEscalated)
            .OrderByDescending(r => r.EscalatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetReportCountByAnonymousIdTodayAsync(Guid anonymousId, CancellationToken cancellationToken = default)
    {
        var today = DateTime.UtcNow.Date;
        return await _dbSet
            .Where(r => r.SubmittedByAnonymousId == anonymousId && r.CreatedAt >= today)
            .CountAsync(cancellationToken);
    }
}
