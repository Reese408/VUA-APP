namespace VoiceUpAthletics.Core.Exceptions;

/// <summary>
/// Exception thrown when a requested resource is not found
/// </summary>
public class NotFoundException : VoiceUpException
{
    public NotFoundException(string message) : base(message, 404)
    {
    }

    public NotFoundException(string entityName, object key)
        : base($"{entityName} with key '{key}' was not found", 404)
    {
    }
}
