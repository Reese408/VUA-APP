namespace VoiceUpAthletics.Core.DTOs.Users;

/// <summary>
/// Lightweight DTO for staff member selection
/// </summary>
public class StaffMemberDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int AssignedReportCount { get; set; }
}
