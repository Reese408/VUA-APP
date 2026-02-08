using Microsoft.AspNetCore.Mvc;

namespace VoiceUpAthletics.API.Controllers;

/// <summary>
/// Health check endpoint for monitoring
/// </summary>
[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    /// <summary>
    /// Basic health check
    /// </summary>
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Healthy",
            timestamp = DateTime.UtcNow,
            service = "Voice Up Athletics API"
        });
    }
}
