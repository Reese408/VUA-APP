using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using VoiceUpAthletics.Core.Constants;
using VoiceUpAthletics.Core.DTOs;

namespace VoiceUpAthletics.API.Controllers;

/// <summary>
/// Base controller with common functionality for all API controllers
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public abstract class BaseApiController : ControllerBase
{
    /// <summary>
    /// Gets the current user's database ID from claims (added by UserSyncMiddleware)
    /// </summary>
    protected int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(AppConstants.Claims.DbUserId)?.Value;
        return int.TryParse(userIdClaim, out var userId) ? userId : throw new UnauthorizedAccessException("User ID not found in claims");
    }

    /// <summary>
    /// Gets the current user's anonymous ID from claims
    /// </summary>
    protected Guid GetCurrentAnonymousId()
    {
        var anonymousIdClaim = User.FindFirst(AppConstants.Claims.AnonymousId)?.Value;
        return Guid.TryParse(anonymousIdClaim, out var anonymousId) ? anonymousId : throw new UnauthorizedAccessException("Anonymous ID not found in claims");
    }

    /// <summary>
    /// Gets the current user's anonymous alias from claims
    /// </summary>
    protected string GetCurrentAnonymousAlias()
    {
        return User.FindFirst(AppConstants.Claims.AnonymousAlias)?.Value ?? "Unknown";
    }

    /// <summary>
    /// Gets the current user's email from claims
    /// </summary>
    protected string GetCurrentUserEmail()
    {
        return User.FindFirst(AppConstants.Claims.Email)?.Value ?? User.FindFirst(ClaimTypes.Email)?.Value ?? "unknown@example.com";
    }

    /// <summary>
    /// Gets the current user's roles from claims
    /// </summary>
    protected List<string> GetCurrentUserRoles()
    {
        return User.FindAll(AppConstants.Claims.Roles).Select(c => c.Value).ToList();
    }

    /// <summary>
    /// Checks if the current user has a specific role
    /// </summary>
    protected bool HasRole(string role)
    {
        return User.IsInRole(role);
    }

    /// <summary>
    /// Returns a success response
    /// </summary>
    protected IActionResult Success<T>(T data, string? message = null)
    {
        return Ok(ApiResponse<T>.SuccessResponse(data, message));
    }

    /// <summary>
    /// Returns an error response
    /// </summary>
    protected IActionResult Error(string message, List<string>? errors = null)
    {
        return BadRequest(ApiResponse<object>.ErrorResponse(message, errors));
    }
}
