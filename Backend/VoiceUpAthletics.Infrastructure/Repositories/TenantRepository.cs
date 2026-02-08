using Microsoft.EntityFrameworkCore;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;

namespace VoiceUpAthletics.Infrastructure.Repositories;

public class TenantRepository : Repository<Tenant>, ITenantRepository
{
    public TenantRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<Tenant?> GetBySubdomainAsync(string subdomain, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(t => t.Subdomain == subdomain.ToLower(), cancellationToken);
    }

    public async Task<Tenant?> GetByEntraTenantIdAsync(string entraTenantId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(t => t.EntraTenantId == entraTenantId, cancellationToken);
    }

    public async Task<bool> IsSubdomainAvailableAsync(string subdomain, CancellationToken cancellationToken = default)
    {
        return !await _dbSet
            .AnyAsync(t => t.Subdomain == subdomain.ToLower(), cancellationToken);
    }
}
