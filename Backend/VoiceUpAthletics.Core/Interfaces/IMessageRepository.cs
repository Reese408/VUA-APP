using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Repository interface for Message entity
/// </summary>
public interface IMessageRepository : IRepository<Message>
{
    Task<IEnumerable<Message>> GetMessagesByReportIdAsync(int reportId, CancellationToken cancellationToken = default);
    Task<int> GetUnreadCountByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task MarkAsReadAsync(int messageId, CancellationToken cancellationToken = default);
    Task MarkAllAsReadByReportIdAsync(int reportId, int userId, CancellationToken cancellationToken = default);
}
