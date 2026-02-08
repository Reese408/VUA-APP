using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Repository interface for Report entity with domain-specific queries
/// </summary>
public interface IReportRepository : IRepository<Report>
{
    Task<IEnumerable<Report>> GetReportsByAnonymousIdAsync(Guid anonymousId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Report>> GetReportsByStatusAsync(ReportStatus status, CancellationToken cancellationToken = default);
    Task<IEnumerable<Report>> GetReportsByCategoryAsync(ReportCategory category, CancellationToken cancellationToken = default);
    Task<IEnumerable<Report>> GetReportsByAssignedStaffAsync(int staffUserId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Report>> GetFlaggedReportsAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<Report>> GetEscalatedReportsAsync(CancellationToken cancellationToken = default);
    Task<int> GetReportCountByAnonymousIdTodayAsync(Guid anonymousId, CancellationToken cancellationToken = default);
}
