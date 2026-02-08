namespace VoiceUpAthletics.Core.DTOs.Messages;

/// <summary>
/// Message DTO
/// </summary>
public class MessageDto
{
    public int Id { get; set; }
    public int ReportId { get; set; }
    public int SentByUserId { get; set; }
    public string MessageText { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public bool IsInternal { get; set; }
    public bool IsRead { get; set; }
    public DateTime? ReadAt { get; set; }
    public DateTime CreatedAt { get; set; }
}
