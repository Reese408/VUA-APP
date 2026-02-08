using Microsoft.EntityFrameworkCore;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;

namespace VoiceUpAthletics.Infrastructure.Repositories;

public class UserProfileRepository : Repository<UserProfile>, IUserProfileRepository
{
    public UserProfileRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<UserProfile?> GetByEntraObjectIdAsync(string entraObjectId, int tenantId, CancellationToken cancellationToken = default)
    {
        // Use IgnoreQueryFilters to query across tenants, then filter manually
        return await _context.UserProfiles
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(u => u.EntraObjectId == entraObjectId && u.TenantId == tenantId && !u.IsDeleted, cancellationToken);
    }

    public async Task<UserProfile?> GetByAnonymousIdAsync(Guid anonymousId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(u => u.AnonymousId == anonymousId, cancellationToken);
    }

    public async Task<UserProfile?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
    }

    public async Task<IEnumerable<UserProfile>> GetStaffMembersAsync(CancellationToken cancellationToken = default)
    {
        // Note: Staff role is determined by Entra ID roles, not a column in the database.
        // This method returns all active users; the controller filters by role claims.
        return await _dbSet
            .Where(u => u.IsActive)
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName)
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> IsEntraObjectIdRegisteredAsync(string entraObjectId, int tenantId, CancellationToken cancellationToken = default)
    {
        return await _context.UserProfiles
            .IgnoreQueryFilters()
            .AnyAsync(u => u.EntraObjectId == entraObjectId && u.TenantId == tenantId && !u.IsDeleted, cancellationToken);
    }
}
