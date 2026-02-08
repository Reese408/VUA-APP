using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Repository interface for Resource entity
/// </summary>
public interface IResourceRepository : IRepository<Resource>
{
    Task<IEnumerable<Resource>> GetByCategoryAsync(ResourceCategory category, CancellationToken cancellationToken = default);
    Task<IEnumerable<Resource>> GetEmergencyResourcesAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<Resource>> GetAvailableResourcesAsync(CancellationToken cancellationToken = default);
}
