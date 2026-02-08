namespace VoiceUpAthletics.Core.Enums;

/// <summary>
/// Severity level of a report
/// </summary>
public enum ReportSeverity
{
    /// <summary>
    /// Low priority, non-urgent
    /// </summary>
    Low,

    /// <summary>
    /// Medium priority, should be addressed soon
    /// </summary>
    Medium,

    /// <summary>
    /// High priority, urgent attention required
    /// </summary>
    High,

    /// <summary>
    /// Critical priority, immediate action required (safety concern)
    /// </summary>
    Critical
}
