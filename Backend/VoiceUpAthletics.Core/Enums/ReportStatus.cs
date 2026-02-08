namespace VoiceUpAthletics.Core.Enums;

/// <summary>
/// Workflow status of a report
/// </summary>
public enum ReportStatus
{
    /// <summary>
    /// Report has been submitted but not yet reviewed
    /// </summary>
    Submitted,

    /// <summary>
    /// Report is under review by compliance staff
    /// </summary>
    InReview,

    /// <summary>
    /// Report is being actively investigated
    /// </summary>
    UnderInvestigation,

    /// <summary>
    /// Investigation is complete, awaiting final action
    /// </summary>
    PendingResolution,

    /// <summary>
    /// Report has been resolved
    /// </summary>
    Resolved,

    /// <summary>
    /// Report was closed without resolution
    /// </summary>
    Closed,

    /// <summary>
    /// Report has been escalated to higher authority
    /// </summary>
    Escalated
}
