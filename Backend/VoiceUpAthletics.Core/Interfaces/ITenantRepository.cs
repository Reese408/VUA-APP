using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Repository interface for Tenant entity
/// </summary>
public interface ITenantRepository : IRepository<Tenant>
{
    Task<Tenant?> GetBySubdomainAsync(string subdomain, CancellationToken cancellationToken = default);
    Task<Tenant?> GetByEntraTenantIdAsync(string entraTenantId, CancellationToken cancellationToken = default);
    Task<bool> IsSubdomainAvailableAsync(string subdomain, CancellationToken cancellationToken = default);
}
