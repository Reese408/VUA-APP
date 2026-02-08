namespace VoiceUpAthletics.Core.Exceptions;

/// <summary>
/// Base exception for all Voice Up Athletics application exceptions
/// </summary>
public abstract class VoiceUpException : Exception
{
    public int StatusCode { get; }

    protected VoiceUpException(string message, int statusCode) : base(message)
    {
        StatusCode = statusCode;
    }

    protected VoiceUpException(string message, Exception innerException, int statusCode)
        : base(message, innerException)
    {
        StatusCode = statusCode;
    }
}
