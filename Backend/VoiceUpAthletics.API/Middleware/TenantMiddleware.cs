using System.Security.Claims;
using VoiceUpAthletics.Core.Constants;
using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.API.Middleware;

/// <summary>
/// Resolves the tenant context for the current request.
/// Sets TenantAccessor.TenantId which is used by ApplicationDbContext for query filtering.
/// </summary>
public class TenantMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<TenantMiddleware> _logger;

    public TenantMiddleware(RequestDelegate next, ILogger<TenantMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, ITenantAccessor tenantAccessor, ITenantRepository tenantRepository)
    {
        // Resolve tenant from:
        // 1. JWT 'tid' claim (Entra Tenant ID)
        // 2. X-Tenant-Id header (for testing/admin)
        // 3. Subdomain parsing from Host header

        var user = context.User;
        int? tenantId = null;

        // Option 1: Get from 'tid' claim in JWT (Entra Tenant ID)
        var entraTenantIdClaim = user.FindFirst(AppConstants.Claims.TenantId)?.Value;
        if (!string.IsNullOrEmpty(entraTenantIdClaim))
        {
            var tenant = await tenantRepository.GetByEntraTenantIdAsync(entraTenantIdClaim);
            tenantId = tenant?.Id;
        }

        // Option 2: Get from X-Tenant-Id header (fallback for API testing)
        if (!tenantId.HasValue && context.Request.Headers.TryGetValue("X-Tenant-Id", out var tenantIdHeader))
        {
            if (int.TryParse(tenantIdHeader.FirstOrDefault(), out var parsedTenantId))
            {
                tenantId = parsedTenantId;
            }
        }

        // Option 3: Parse subdomain from Host header
        if (!tenantId.HasValue)
        {
            var host = context.Request.Host.Host;
            var subdomain = ExtractSubdomain(host);

            if (!string.IsNullOrEmpty(subdomain))
            {
                var tenant = await tenantRepository.GetBySubdomainAsync(subdomain);
                tenantId = tenant?.Id;
            }
        }

        if (tenantId.HasValue)
        {
            tenantAccessor.TenantId = tenantId.Value;
            _logger.LogInformation("Tenant context set: TenantId={TenantId}", tenantId.Value);
        }
        else
        {
            // For public endpoints (like /health or /api/tenants/resolve), allow null tenant
            if (!context.Request.Path.StartsWithSegments("/api/tenants/resolve") &&
                !context.Request.Path.StartsWithSegments("/health"))
            {
                _logger.LogWarning("Unable to resolve tenant for request: {Path}", context.Request.Path);
            }
        }

        await _next(context);
    }

    private string? ExtractSubdomain(string host)
    {
        // Extract subdomain from host (e.g., "umich.voiceupathletics.com" -> "umich")
        var parts = host.Split('.');
        if (parts.Length >= 3)
        {
            return parts[0];
        }

        return null;
    }
}
