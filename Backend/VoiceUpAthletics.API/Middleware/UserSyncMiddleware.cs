using System.Security.Claims;
using VoiceUpAthletics.Core.Constants;
using VoiceUpAthletics.Core.DTOs.Users;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Services;

namespace VoiceUpAthletics.API.Middleware;

/// <summary>
/// CRITICAL MIDDLEWARE: Syncs Entra ID identity to our UserProfile table.
/// On first login, creates a UserProfile with auto-generated AnonymousAlias.
/// Adds custom claims (dbUserId, anonymousId, anonymousAlias) to the request identity.
/// </summary>
public class UserSyncMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<UserSyncMiddleware> _logger;

    public UserSyncMiddleware(RequestDelegate next, ILogger<UserSyncMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, IUserProfileRepository userProfileRepository,
        ITenantAccessor tenantAccessor, IAuditService auditService)
    {
        var user = context.User;

        // Only process authenticated requests
        if (user.Identity?.IsAuthenticated == true)
        {
            var entraObjectId = user.FindFirst(AppConstants.Claims.ObjectId)?.Value;
            var email = user.FindFirst(AppConstants.Claims.Email) ?? user.FindFirst(ClaimTypes.Email);
            var name = user.FindFirst(AppConstants.Claims.Name) ?? user.FindFirst(ClaimTypes.Name);

            if (!string.IsNullOrEmpty(entraObjectId) && tenantAccessor.IsSet)
            {
                // Check if user profile exists
                var userProfile = await userProfileRepository.GetByEntraObjectIdAsync(entraObjectId, tenantAccessor.TenantId);

                if (userProfile == null)
                {
                    // First login - create user profile
                    var nameParts = name?.Value?.Split(' ', 2) ?? new[] { "Unknown", "User" };
                    var firstName = nameParts.Length > 0 ? nameParts[0] : "Unknown";
                    var lastName = nameParts.Length > 1 ? nameParts[1] : "User";

                    var newProfile = new Core.Entities.UserProfile
                    {
                        EntraObjectId = entraObjectId,
                        TenantId = tenantAccessor.TenantId,
                        Email = email?.Value ?? "unknown@example.com",
                        FirstName = firstName,
                        LastName = lastName,
                        AnonymousAlias = AnonymousAliasGenerator.Generate(),
                        AnonymousId = Guid.NewGuid(),
                        LastLoginAt = DateTime.UtcNow,
                        IsActive = true,
                        IsProfileComplete = false
                    };

                    await userProfileRepository.AddAsync(newProfile);
                    await auditService.LogAsync(
                        AppConstants.AuditActions.UserCreated,
                        null,
                        nameof(Core.Entities.UserProfile),
                        newProfile.Id,
                        $"First login: {newProfile.Email}",
                        context.Connection.RemoteIpAddress?.ToString(),
                        context.Request.Headers.UserAgent.ToString()
                    );

                    userProfile = newProfile;

                    _logger.LogInformation("Created new user profile for EntraObjectId: {EntraObjectId}", entraObjectId);
                }
                else
                {
                    // Update last login
                    userProfile.LastLoginAt = DateTime.UtcNow;
                    userProfileRepository.Update(userProfile);
                }

                // Add custom claims to the identity
                var identity = user.Identity as ClaimsIdentity;
                identity?.AddClaim(new Claim(AppConstants.Claims.DbUserId, userProfile.Id.ToString()));
                identity?.AddClaim(new Claim(AppConstants.Claims.AnonymousId, userProfile.AnonymousId.ToString()));
                identity?.AddClaim(new Claim(AppConstants.Claims.AnonymousAlias, userProfile.AnonymousAlias));

                _logger.LogInformation("User synced: EntraObjectId={EntraObjectId}, DbUserId={DbUserId}, AnonymousAlias={AnonymousAlias}",
                    entraObjectId, userProfile.Id, userProfile.AnonymousAlias);
            }
        }

        await _next(context);
    }
}
