using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Repository interface for ReportAttachment entity
/// </summary>
public interface IReportAttachmentRepository : IRepository<ReportAttachment>
{
    Task<IEnumerable<ReportAttachment>> GetByReportIdAsync(int reportId, CancellationToken cancellationToken = default);
}
