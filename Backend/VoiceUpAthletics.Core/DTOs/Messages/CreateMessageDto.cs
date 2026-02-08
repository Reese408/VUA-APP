using System.ComponentModel.DataAnnotations;

namespace VoiceUpAthletics.Core.DTOs.Messages;

/// <summary>
/// DTO for creating a new message
/// </summary>
public class CreateMessageDto
{
    [Required(ErrorMessage = "Report ID is required")]
    public int ReportId { get; set; }

    [Required(ErrorMessage = "Message text is required")]
    [StringLength(2000, MinimumLength = 1, ErrorMessage = "Message must be between 1 and 2000 characters")]
    public string MessageText { get; set; } = string.Empty;

    public bool IsInternal { get; set; } = false;
}
