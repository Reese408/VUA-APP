using VoiceUpAthletics.Core.DTOs.Resources;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Service interface for resource management
/// </summary>
public interface IResourceService
{
    Task<ResourceDto> GetResourceByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IEnumerable<ResourceDto>> GetAllResourcesAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<ResourceDto>> GetResourcesByCategoryAsync(ResourceCategory category, CancellationToken cancellationToken = default);
    Task<IEnumerable<ResourceDto>> GetEmergencyResourcesAsync(CancellationToken cancellationToken = default);
    Task<ResourceDto> CreateResourceAsync(CreateResourceDto dto, CancellationToken cancellationToken = default);
    Task<ResourceDto> UpdateResourceAsync(int id, UpdateResourceDto dto, CancellationToken cancellationToken = default);
    Task DeleteResourceAsync(int id, CancellationToken cancellationToken = default);
}
