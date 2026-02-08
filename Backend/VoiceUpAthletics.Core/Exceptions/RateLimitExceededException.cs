namespace VoiceUpAthletics.Core.Exceptions;

/// <summary>
/// Exception thrown when a rate limit is exceeded
/// </summary>
public class RateLimitExceededException : VoiceUpException
{
    public RateLimitExceededException(string message) : base(message, 429)
    {
    }

    public RateLimitExceededException()
        : base("Rate limit exceeded. Please try again later", 429)
    {
    }
}
