namespace VoiceUpAthletics.Core.Exceptions;

/// <summary>
/// Exception thrown when a user doesn't have permission to perform an action
/// </summary>
public class ForbiddenException : VoiceUpException
{
    public ForbiddenException(string message) : base(message, 403)
    {
    }

    public ForbiddenException()
        : base("You do not have permission to perform this action", 403)
    {
    }
}
