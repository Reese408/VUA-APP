using VoiceUpAthletics.Core.DTOs.Messages;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Service interface for message-related business logic
/// </summary>
public interface IMessageService
{
    Task<MessageDto> SendMessageAsync(CreateMessageDto dto, int senderId, CancellationToken cancellationToken = default);
    Task<IEnumerable<MessageDto>> GetMessagesByReportIdAsync(int reportId, CancellationToken cancellationToken = default);
    Task<int> GetUnreadCountAsync(int userId, CancellationToken cancellationToken = default);
    Task MarkAsReadAsync(int messageId, CancellationToken cancellationToken = default);
    Task MarkAllAsReadAsync(int reportId, int userId, CancellationToken cancellationToken = default);
}
