using Microsoft.EntityFrameworkCore;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;

namespace VoiceUpAthletics.Infrastructure.Repositories;

public class MessageRepository : Repository<Message>, IMessageRepository
{
    public MessageRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Message>> GetMessagesByReportIdAsync(int reportId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(m => m.ReportId == reportId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetUnreadCountByUserIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        // Count unread messages in reports where the user is involved
        // (either submitted by them or assigned to them)
        return await _context.Messages
            .Where(m => !m.IsRead && m.SentByUserId != userId)
            .Join(_context.Reports,
                message => message.ReportId,
                report => report.Id,
                (message, report) => new { message, report })
            .Where(x => x.report.AssignedToUserId == userId ||
                       _context.UserProfiles.Any(u => u.Id == userId && u.AnonymousId == x.report.SubmittedByAnonymousId))
            .CountAsync(cancellationToken);
    }

    public async Task MarkAsReadAsync(int messageId, CancellationToken cancellationToken = default)
    {
        var message = await GetByIdAsync(messageId, cancellationToken);
        if (message != null && !message.IsRead)
        {
            message.IsRead = true;
            message.ReadAt = DateTime.UtcNow;
            Update(message);
        }
    }

    public async Task MarkAllAsReadByReportIdAsync(int reportId, int userId, CancellationToken cancellationToken = default)
    {
        var messages = await _dbSet
            .Where(m => m.ReportId == reportId && !m.IsRead && m.SentByUserId != userId)
            .ToListAsync(cancellationToken);

        foreach (var message in messages)
        {
            message.IsRead = true;
            message.ReadAt = DateTime.UtcNow;
        }

        UpdateRange(messages);
    }
}
