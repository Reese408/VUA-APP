using System.Net;
using System.Text.Json;
using VoiceUpAthletics.Core.DTOs;
using VoiceUpAthletics.Core.Exceptions;

namespace VoiceUpAthletics.API.Middleware;

/// <summary>
/// Global exception handling middleware.
/// Catches all unhandled exceptions and returns consistent JSON responses.
/// </summary>
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = exception switch
        {
            VoiceUpException voiceUpEx => new ApiResponse<object>
            {
                Success = false,
                Message = voiceUpEx.Message,
                Errors = voiceUpEx is ValidationException valEx ? valEx.Errors : new List<string> { voiceUpEx.Message }
            },
            _ => new ApiResponse<object>
            {
                Success = false,
                Message = _env.IsDevelopment() ? exception.Message : "An internal server error occurred",
                Errors = _env.IsDevelopment() ? new List<string> { exception.StackTrace ?? string.Empty } : null
            }
        };

        context.Response.StatusCode = exception switch
        {
            VoiceUpException voiceUpEx => voiceUpEx.StatusCode,
            _ => (int)HttpStatusCode.InternalServerError
        };

        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(json);
    }
}
