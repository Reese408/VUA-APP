using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.Infrastructure.Services;

/// <summary>
/// Scoped service that provides access to the current tenant context.
/// Set by TenantMiddleware and consumed by ApplicationDbContext for query filtering.
/// </summary>
public class TenantAccessor : ITenantAccessor
{
    public int TenantId { get; set; }
    public string? TenantName { get; set; }
    public bool IsSet => TenantId > 0;
}
