namespace VoiceUpAthletics.Core.Enums;

/// <summary>
/// Subscription tiers for tenants (universities)
/// </summary>
public enum SubscriptionTier
{
    /// <summary>
    /// Free trial tier (limited features and users)
    /// </summary>
    Trial,

    /// <summary>
    /// Basic tier for small programs
    /// </summary>
    Basic,

    /// <summary>
    /// Professional tier for medium programs
    /// </summary>
    Professional,

    /// <summary>
    /// Enterprise tier for large programs (unlimited users)
    /// </summary>
    Enterprise
}
