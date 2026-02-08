namespace VoiceUpAthletics.Core.Entities;

/// <summary>
/// Base entity for all tenant-scoped entities.
/// Global query filters automatically scope queries by TenantId.
/// </summary>
public abstract class TenantEntity : BaseEntity
{
    public int TenantId { get; set; }

    // Navigation property
    public virtual Tenant? Tenant { get; set; }
}
