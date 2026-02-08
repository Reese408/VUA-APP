using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VoiceUpAthletics.Core.DTOs.Auth;
using VoiceUpAthletics.Core.DTOs.Users;
using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.API.Controllers;

/// <summary>
/// Authentication and user profile management endpoints
/// </summary>
[Authorize]
public class AuthController : BaseApiController
{
    private readonly IUserProfileService _userProfileService;
    private readonly ITenantService _tenantService;

    public AuthController(IUserProfileService userProfileService, ITenantService tenantService)
    {
        _userProfileService = userProfileService;
        _tenantService = tenantService;
    }

    /// <summary>
    /// Get current authenticated user information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = GetCurrentUserId();
        var userProfile = await _userProfileService.GetProfileByIdAsync(userId);

        var currentUser = new CurrentUserDto
        {
            UserId = userProfile.Id,
            Email = userProfile.Email,
            FirstName = userProfile.FirstName,
            LastName = userProfile.LastName,
            AnonymousId = userProfile.AnonymousId,
            AnonymousAlias = userProfile.AnonymousAlias,
            Roles = GetCurrentUserRoles(),
            TenantId = 0, // TODO: Get from TenantAccessor
            TenantName = string.Empty, // TODO: Get from Tenant
            IsProfileComplete = userProfile.IsProfileComplete,
            Sport = userProfile.Sport,
            TeamName = userProfile.TeamName
        };

        return Success(currentUser);
    }

    /// <summary>
    /// Complete user profile on first login (athlete-specific information)
    /// </summary>
    [HttpPost("complete-profile")]
    public async Task<IActionResult> CompleteProfile([FromBody] CompleteProfileDto dto)
    {
        var userId = GetCurrentUserId();
        var profile = await _userProfileService.CompleteProfileAsync(userId, dto);

        return Success(profile, "Profile completed successfully");
    }

    /// <summary>
    /// Update user profile
    /// </summary>
    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileDto dto)
    {
        var userId = GetCurrentUserId();
        var profile = await _userProfileService.UpdateProfileAsync(userId, dto);

        return Success(profile, "Profile updated successfully");
    }
}
