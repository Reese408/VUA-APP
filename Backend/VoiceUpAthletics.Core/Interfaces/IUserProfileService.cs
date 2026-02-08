using VoiceUpAthletics.Core.DTOs.Users;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Service interface for user profile management
/// </summary>
public interface IUserProfileService
{
    Task<UserProfileDto> GetProfileByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<UserProfileDto> GetProfileByEntraObjectIdAsync(string entraObjectId, int tenantId, CancellationToken cancellationToken = default);
    Task<UserProfileDto> CreateOrUpdateProfileAsync(CreateUserProfileDto dto, CancellationToken cancellationToken = default);
    Task<UserProfileDto> CompleteProfileAsync(int userId, CompleteProfileDto dto, CancellationToken cancellationToken = default);
    Task<UserProfileDto> UpdateProfileAsync(int userId, UpdateUserProfileDto dto, CancellationToken cancellationToken = default);
    Task<IEnumerable<StaffMemberDto>> GetStaffMembersAsync(CancellationToken cancellationToken = default);
    Task DeactivateUserAsync(int userId, CancellationToken cancellationToken = default);
    Task<UnmaskIdentityDto> UnmaskIdentityAsync(Guid anonymousId, string reason, CancellationToken cancellationToken = default);
}
