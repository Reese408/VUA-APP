using System.Security.Cryptography;
using System.Text;
using VoiceUpAthletics.Core.Constants;

namespace VoiceUpAthletics.Infrastructure.Services;

/// <summary>
/// Generates anonymous aliases for athletes (e.g., "Athlete-X7K9M2")
/// </summary>
public static class AnonymousAliasGenerator
{
    public static string Generate()
    {
        var random = new StringBuilder();
        var chars = AppConstants.Anonymity.AliasCharacters;

        for (int i = 0; i < AppConstants.Anonymity.AliasRandomLength; i++)
        {
            random.Append(chars[RandomNumberGenerator.GetInt32(chars.Length)]);
        }

        return $"{AppConstants.Anonymity.AliasPrefix}{random}";
    }
}
