namespace VoiceUpAthletics.Core.Enums;

/// <summary>
/// User roles assigned via Microsoft Entra ID App Roles.
/// These roles flow through the 'roles' claim in JWT tokens.
/// </summary>
public enum UserRole
{
    /// <summary>
    /// Student-athlete who can submit anonymous reports
    /// </summary>
    Athlete,

    /// <summary>
    /// Compliance staff who can view and manage reports
    /// </summary>
    ComplianceStaff,

    /// <summary>
    /// Administrator who can manage tenant settings and users
    /// </summary>
    Admin,

    /// <summary>
    /// Super administrator who can create new tenants (universities)
    /// </summary>
    SuperAdmin
}
