namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Provides access to the current tenant context for the request.
/// Used by ApplicationDbContext to apply global query filters.
/// Scoped per HTTP request.
/// </summary>
public interface ITenantAccessor
{
    int TenantId { get; set; }
    string? TenantName { get; set; }
    bool IsSet { get; }
}
