using VoiceUpAthletics.Core.Entities;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Repository interface for UserProfile entity
/// </summary>
public interface IUserProfileRepository : IRepository<UserProfile>
{
    Task<UserProfile?> GetByEntraObjectIdAsync(string entraObjectId, int tenantId, CancellationToken cancellationToken = default);
    Task<UserProfile?> GetByAnonymousIdAsync(Guid anonymousId, CancellationToken cancellationToken = default);
    Task<UserProfile?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<IEnumerable<UserProfile>> GetStaffMembersAsync(CancellationToken cancellationToken = default);
    Task<bool> IsEntraObjectIdRegisteredAsync(string entraObjectId, int tenantId, CancellationToken cancellationToken = default);
}
