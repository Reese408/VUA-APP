namespace VoiceUpAthletics.Core.Exceptions;

/// <summary>
/// Exception thrown when authentication fails or is missing
/// </summary>
public class UnauthorizedException : VoiceUpException
{
    public UnauthorizedException(string message) : base(message, 401)
    {
    }

    public UnauthorizedException()
        : base("Authentication is required to access this resource", 401)
    {
    }
}
