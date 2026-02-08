using Microsoft.EntityFrameworkCore;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Enums;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;

namespace VoiceUpAthletics.Infrastructure.Repositories;

public class ResourceRepository : Repository<Resource>, IResourceRepository
{
    public ResourceRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Resource>> GetByCategoryAsync(ResourceCategory category, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.Category == category && r.IsAvailable)
            .OrderBy(r => r.DisplayOrder)
            .ThenBy(r => r.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Resource>> GetEmergencyResourcesAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.IsEmergency && r.IsAvailable)
            .OrderBy(r => r.DisplayOrder)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Resource>> GetAvailableResourcesAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Where(r => r.IsAvailable)
            .OrderBy(r => r.DisplayOrder)
            .ThenBy(r => r.Title)
            .ToListAsync(cancellationToken);
    }
}
