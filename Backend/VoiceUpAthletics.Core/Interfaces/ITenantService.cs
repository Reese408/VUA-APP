using VoiceUpAthletics.Core.DTOs.Tenants;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Service interface for tenant management
/// </summary>
public interface ITenantService
{
    Task<TenantDto> GetTenantByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<TenantDto> GetTenantBySubdomainAsync(string subdomain, CancellationToken cancellationToken = default);
    Task<TenantDto> CreateTenantAsync(CreateTenantDto dto, CancellationToken cancellationToken = default);
    Task<TenantDto> UpdateTenantAsync(int id, UpdateTenantDto dto, CancellationToken cancellationToken = default);
    Task<IEnumerable<TenantDto>> GetAllTenantsAsync(CancellationToken cancellationToken = default);
    Task<bool> IsSubdomainAvailableAsync(string subdomain, CancellationToken cancellationToken = default);
}
