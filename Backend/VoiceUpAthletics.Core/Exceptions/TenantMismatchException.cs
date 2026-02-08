namespace VoiceUpAthletics.Core.Exceptions;

/// <summary>
/// Exception thrown when attempting to access a resource from a different tenant
/// </summary>
public class TenantMismatchException : VoiceUpException
{
    public TenantMismatchException(string message) : base(message, 403)
    {
    }

    public TenantMismatchException()
        : base("You do not have access to resources from this tenant", 403)
    {
    }
}
