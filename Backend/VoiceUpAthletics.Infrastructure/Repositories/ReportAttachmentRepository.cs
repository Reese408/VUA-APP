using Microsoft.EntityFrameworkCore;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;

namespace VoiceUpAthletics.Infrastructure.Repositories;

public class ReportAttachmentRepository : Repository<ReportAttachment>, IReportAttachmentRepository
{
    public ReportAttachmentRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<ReportAttachment>> GetByReportIdAsync(int reportId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(a => a.ReportId == reportId)
            .OrderBy(a => a.CreatedAt)
            .ToListAsync(cancellationToken);
    }
}
