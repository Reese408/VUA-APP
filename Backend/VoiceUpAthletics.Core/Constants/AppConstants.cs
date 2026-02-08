namespace VoiceUpAthletics.Core.Constants;

/// <summary>
/// Application-wide constants
/// </summary>
public static class AppConstants
{
    /// <summary>
    /// Role names that must match Entra ID App Roles
    /// </summary>
    public static class Roles
    {
        public const string Athlete = "Athlete";
        public const string ComplianceStaff = "ComplianceStaff";
        public const string Admin = "Admin";
        public const string SuperAdmin = "SuperAdmin";

        public const string StaffRoles = "ComplianceStaff,Admin,SuperAdmin";
        public const string AdminRoles = "Admin,SuperAdmin";
    }

    /// <summary>
    /// Entra ID JWT claim names
    /// </summary>
    public static class Claims
    {
        public const string ObjectId = "oid";           // Entra Object ID
        public const string TenantId = "tid";           // Entra Tenant ID
        public const string Roles = "roles";            // App Roles array
        public const string Email = "email";
        public const string Name = "name";

        // Custom claims added by UserSyncMiddleware
        public const string DbUserId = "dbUserId";
        public const string AnonymousId = "anonymousId";
        public const string AnonymousAlias = "anonymousAlias";
    }

    /// <summary>
    /// Rate limiting configuration
    /// </summary>
    public static class RateLimits
    {
        public const int MaxReportsPerDay = 10;
        public const int MaxMessagesPerHour = 50;
        public const int MaxLoginAttemptsPerMinute = 5;
    }

    /// <summary>
    /// Auto-flagging thresholds for abuse detection
    /// </summary>
    public static class Flagging
    {
        public const int MinDescriptionLength = 20;
        public const int MaxDescriptionLength = 5000;
        public const int MaxTitleLength = 200;

        // Spam detection keywords
        public static readonly string[] SpamKeywords =
        {
            "test", "testing", "asdf", "qwerty", "spam"
        };

        public const int SpamKeywordThreshold = 3;
    }

    /// <summary>
    /// Audit log action names
    /// </summary>
    public static class AuditActions
    {
        public const string ReportCreated = "Report.Created";
        public const string ReportViewed = "Report.Viewed";
        public const string ReportUpdated = "Report.Updated";
        public const string ReportStatusChanged = "Report.StatusChanged";
        public const string ReportAssigned = "Report.Assigned";
        public const string ReportEscalated = "Report.Escalated";
        public const string ReportFlagged = "Report.Flagged";
        public const string IdentityUnmasked = "Identity.Unmasked";

        public const string MessageSent = "Message.Sent";
        public const string MessageViewed = "Message.Viewed";

        public const string UserCreated = "User.Created";
        public const string UserUpdated = "User.Updated";
        public const string UserDeactivated = "User.Deactivated";

        public const string TenantCreated = "Tenant.Created";
        public const string TenantUpdated = "Tenant.Updated";

        public const string LoginSuccess = "Auth.LoginSuccess";
        public const string LoginFailed = "Auth.LoginFailed";
    }

    /// <summary>
    /// File upload constraints
    /// </summary>
    public static class FileUpload
    {
        public const int MaxFileSizeBytes = 10 * 1024 * 1024; // 10 MB
        public const int MaxFilesPerReport = 5;

        public static readonly string[] AllowedContentTypes =
        {
            "image/jpeg",
            "image/png",
            "image/gif",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
        };
    }

    /// <summary>
    /// Anonymous alias generation
    /// </summary>
    public static class Anonymity
    {
        public const string AliasPrefix = "Athlete-";
        public const int AliasRandomLength = 6; // e.g., Athlete-X7K9M2
        public const string AliasCharacters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excludes ambiguous chars
    }
}
