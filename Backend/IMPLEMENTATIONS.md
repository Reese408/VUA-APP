# Voice Up Athletics - Implementation Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Core Layer Implementation](#core-layer-implementation)
4. [Infrastructure Layer Implementation](#infrastructure-layer-implementation)
5. [API Layer Implementation](#api-layer-implementation)
6. [Database Schema](#database-schema)
7. [Authentication Flow](#authentication-flow)
8. [Multi-Tenancy Implementation](#multi-tenancy-implementation)
9. [Next Steps](#next-steps)
10. [Configuration Guide](#configuration-guide)

---

## Architecture Overview

Voice Up Athletics follows a **three-layer clean architecture** pattern:

```
VoiceUpAthletics.API (Presentation)
    ↓ depends on
VoiceUpAthletics.Infrastructure (Data + External Services)
    ↓ depends on
VoiceUpAthletics.Core (Domain - NO external dependencies)
```

### Key Architectural Decisions

1. **Entra ID Authentication**: The backend validates JWT tokens from Microsoft Entra ID but does NOT issue tokens or manage passwords.
2. **Multi-Tenant Database**: Single Azure SQL database with row-level isolation via EF Core global query filters.
3. **Anonymous Reporting**: Reports link to `AnonymousId` (GUID) instead of real user IDs for athlete privacy.
4. **Repository Pattern**: Generic repository with domain-specific extensions + Unit of Work pattern.
5. **Clean Separation**: Core has zero external dependencies; all external concerns in Infrastructure.

---

## Project Structure

```
Backend/
├── VoiceUpAthletics.Core/              # Domain layer (zero dependencies)
│   ├── Entities/                        # Domain models
│   │   ├── BaseEntity.cs
│   │   ├── TenantEntity.cs
│   │   ├── Tenant.cs
│   │   ├── UserProfile.cs
│   │   ├── Report.cs
│   │   ├── Message.cs
│   │   ├── ReportAttachment.cs
│   │   ├── Resource.cs
│   │   └── AuditLog.cs
│   ├── DTOs/                            # Data transfer objects
│   │   ├── ApiResponse.cs
│   │   ├── PagedResultDto.cs
│   │   ├── Auth/                        # CurrentUserDto, LoginResponseDto
│   │   ├── Reports/                     # CreateReportDto, ReportDto, ReportListItemDto, etc.
│   │   ├── Messages/                    # MessageDto, CreateMessageDto
│   │   ├── Users/                       # UserProfileDto, CompleteProfileDto, UnmaskIdentityDto
│   │   ├── Tenants/                     # TenantDto, CreateTenantDto, UpdateTenantDto
│   │   ├── Resources/                   # ResourceDto, CreateResourceDto
│   │   └── Audit/                       # AuditLogDto, AuditLogFilterDto
│   ├── Interfaces/                      # Contracts
│   │   ├── IRepository.cs               # Generic repository interface
│   │   ├── IUnitOfWork.cs
│   │   ├── IReportRepository.cs
│   │   ├── IUserProfileRepository.cs
│   │   ├── ITenantRepository.cs
│   │   ├── IMessageRepository.cs
│   │   ├── IResourceRepository.cs
│   │   ├── IAuditLogRepository.cs
│   │   ├── IReportAttachmentRepository.cs
│   │   ├── IReportService.cs
│   │   ├── IUserProfileService.cs
│   │   ├── IMessageService.cs
│   │   ├── ITenantService.cs
│   │   ├── IAuditService.cs
│   │   ├── IResourceService.cs
│   │   └── ITenantAccessor.cs
│   ├── Enums/                           # Enumerations
│   │   ├── UserRole.cs
│   │   ├── ReportCategory.cs
│   │   ├── ReportSeverity.cs
│   │   ├── ReportStatus.cs
│   │   ├── ResourceCategory.cs
│   │   └── SubscriptionTier.cs
│   ├── Exceptions/                      # Custom exceptions
│   │   ├── VoiceUpException.cs          # Base exception
│   │   ├── NotFoundException.cs
│   │   ├── ForbiddenException.cs
│   │   ├── ValidationException.cs
│   │   ├── UnauthorizedException.cs
│   │   ├── TenantMismatchException.cs
│   │   └── RateLimitExceededException.cs
│   └── Constants/
│       └── AppConstants.cs              # Roles, Claims, RateLimits, Flagging, AuditActions, etc.
│
├── VoiceUpAthletics.Infrastructure/     # Data + external services
│   ├── Data/
│   │   ├── ApplicationDbContext.cs      # Main DbContext with query filters
│   │   ├── ApplicationDbContextFactory.cs # Design-time factory for migrations
│   │   └── Configurations/              # Fluent API entity configurations
│   │       ├── TenantConfiguration.cs
│   │       ├── UserProfileConfiguration.cs
│   │       ├── ReportConfiguration.cs
│   │       ├── MessageConfiguration.cs
│   │       ├── ReportAttachmentConfiguration.cs
│   │       ├── ResourceConfiguration.cs
│   │       └── AuditLogConfiguration.cs
│   ├── Repositories/                    # Data access implementations
│   │   ├── Repository.cs                # Generic repository
│   │   ├── ReportRepository.cs
│   │   ├── UserProfileRepository.cs
│   │   ├── TenantRepository.cs
│   │   ├── MessageRepository.cs
│   │   ├── ResourceRepository.cs
│   │   ├── AuditLogRepository.cs
│   │   ├── ReportAttachmentRepository.cs
│   │   └── UnitOfWork.cs
│   ├── Services/                        # Business logic implementations
│   │   ├── TenantAccessor.cs
│   │   ├── AnonymousAliasGenerator.cs
│   │   ├── AuditService.cs
│   │   └── ReportService.cs
│   └── Migrations/                      # EF Core migrations
│       └── [timestamp]_InitialCreate.cs
│
└── VoiceUpAthletics.API/                # Presentation layer
    ├── Controllers/
    │   ├── BaseApiController.cs         # Base controller with helper methods
    │   ├── AuthController.cs            # Authentication endpoints
    │   ├── ReportsController.cs         # Report management
    │   └── HealthController.cs          # Health check
    ├── Middleware/
    │   ├── ExceptionMiddleware.cs       # Global error handling
    │   ├── SecurityHeadersMiddleware.cs # OWASP security headers
    │   ├── TenantMiddleware.cs          # Tenant context resolution
    │   └── UserSyncMiddleware.cs        # Entra ID → UserProfile sync
    ├── Program.cs                       # Application configuration
    ├── appsettings.json                 # Configuration
    └── appsettings.Development.json     # Development overrides
```

---

## Core Layer Implementation

### Entities

**BaseEntity**: Common properties for all entities
- `Id` (int, primary key)
- `CreatedAt` (DateTime UTC)
- `UpdatedAt` (DateTime? UTC)
- `IsDeleted` (bool, soft delete flag)
- `DeletedAt` (DateTime? UTC)

**TenantEntity**: Base for tenant-scoped entities
- Inherits from `BaseEntity`
- `TenantId` (int, foreign key)
- Global query filter: `WHERE TenantId = @currentTenantId AND IsDeleted = false`

**Key Entities**:
1. **Tenant**: Universities/institutions (NOT tenant-scoped)
2. **UserProfile**: Application data linked to Entra ID (via `EntraObjectId`)
3. **Report**: Anonymous reports (linked to `AnonymousId`, not real user ID)
4. **Message**: Report conversation threads
5. **ReportAttachment**: Files stored in Azure Blob Storage
6. **Resource**: Support resources (counseling, hotlines, etc.)
7. **AuditLog**: Immutable audit trail (HIPAA compliance)

### DTOs

All API input/output uses DTOs to decouple the API contract from internal entities:
- **Request DTOs**: Data annotations for validation (e.g., `CreateReportDto`)
- **Response DTOs**: Formatted for frontend consumption (e.g., `ReportDto`)
- **Filter DTOs**: Query parameters for list endpoints (e.g., `ReportFilterDto`)
- **ApiResponse<T>**: Standard wrapper with `success`, `data`, `message`, `errors`
- **PagedResultDto<T>**: Pagination wrapper with `items`, `totalCount`, `pageNumber`, `pageSize`

### Enums

All enums are stored as strings in the database (via `.HasConversion<string>()`):
- **UserRole**: Athlete, ComplianceStaff, Admin, SuperAdmin (from Entra ID App Roles)
- **ReportCategory**: MentalHealth, ComplianceViolation, Harassment, etc.
- **ReportSeverity**: Low, Medium, High, Critical
- **ReportStatus**: Submitted, InReview, UnderInvestigation, PendingResolution, Resolved, Closed, Escalated
- **ResourceCategory**: MentalHealth, CrisisSupport, Legal, Medical, etc.
- **SubscriptionTier**: Trial, Basic, Professional, Enterprise

### Exceptions

Custom exception hierarchy for consistent error handling:
- `VoiceUpException` (base, includes HTTP status code)
  - `NotFoundException` (404)
  - `ForbiddenException` (403)
  - `ValidationException` (400)
  - `UnauthorizedException` (401)
  - `TenantMismatchException` (403)
  - `RateLimitExceededException` (429)

All caught by `ExceptionMiddleware` and returned as consistent JSON responses.

### Constants

**AppConstants** class with nested static classes:
- **Roles**: Role names matching Entra ID App Roles
- **Claims**: JWT claim names (oid, tid, roles, custom claims)
- **RateLimits**: MaxReportsPerDay, MaxMessagesPerHour
- **Flagging**: Auto-flagging thresholds for spam detection
- **AuditActions**: Action names for audit logging
- **FileUpload**: Max file size, allowed content types
- **Anonymity**: Alias generation settings

---

## Infrastructure Layer Implementation

### ApplicationDbContext

**Key Features**:
1. **Global Query Filters**: Automatically scope all queries by `TenantId`
2. **Soft Delete**: All entities respect `IsDeleted = false` filter
3. **Automatic Timestamps**: `CreatedAt` and `UpdatedAt` set in `SaveChangesAsync`
4. **Design-Time Factory**: `ApplicationDbContextFactory` for EF Core migrations

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Apply entity configurations from assembly
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

    // Apply global query filters for multi-tenancy
    modelBuilder.Entity<Report>()
        .HasQueryFilter(e => !e.IsDeleted && e.TenantId == _tenantAccessor.TenantId);
    // ... (repeated for all tenant-scoped entities)
}
```

### Entity Configurations

Fluent API configurations for all entities:
- **Indexes**: On foreign keys, frequently filtered columns, composite indexes
- **String Lengths**: Appropriate max lengths for all string properties
- **Enum Conversions**: `.HasConversion<string>()` for all enums
- **Relationships**: Configured with appropriate `OnDelete` behavior
- **Unique Constraints**: E.g., `(EntraObjectId, TenantId)` on UserProfile

### Repository Pattern

**Generic Repository** (`Repository<T>`):
- `GetByIdAsync`, `GetAllAsync`, `FindAsync`, `FindFirstAsync`
- `ExistsAsync`, `CountAsync`
- `AddAsync`, `AddRangeAsync`
- `Update`, `UpdateRange`
- `Remove`, `RemoveRange`
- `SoftDelete`, `SoftDeleteRange`

**Domain-Specific Repositories**:
- **ReportRepository**: `GetReportsByAnonymousIdAsync`, `GetReportsByStatusAsync`, `GetFlaggedReportsAsync`, etc.
- **UserProfileRepository**: `GetByEntraObjectIdAsync`, `GetByAnonymousIdAsync`, `GetStaffMembersAsync`
- **TenantRepository**: `GetBySubdomainAsync`, `GetByEntraTenantIdAsync`, `IsSubdomainAvailableAsync`
- **MessageRepository**: `GetMessagesByReportIdAsync`, `GetUnreadCountByUserIdAsync`, `MarkAsReadAsync`
- **ResourceRepository**: `GetByCategoryAsync`, `GetEmergencyResourcesAsync`
- **AuditLogRepository**: `GetByUserIdAsync`, `GetByEntityAsync`, `GetIdentityUnmaskingLogsAsync`

**Unit of Work**: Coordinates multiple repository operations and transactions.

### Services

**ReportService**:
- Auto-flagging logic for spam detection
- Rate limiting (max reports per day)
- Report CRUD with anonymity preservation
- Status management, assignment, escalation

**AuditService**:
- Log all sensitive actions with user, IP, timestamp
- Special handling for identity unmasking (HIPAA requirement)
- Query audit logs by user, action, entity, date range

**TenantAccessor**:
- Scoped service that holds current request's `TenantId`
- Injected into `ApplicationDbContext` for query filtering
- Set by `TenantMiddleware` early in the request pipeline

**AnonymousAliasGenerator**:
- Generates unique anonymous aliases (e.g., "Athlete-X7K9M2")
- Uses cryptographically secure random number generator
- Excludes ambiguous characters (0/O, 1/I/l)

---

## API Layer Implementation

### Middleware Pipeline Order

**CRITICAL**: Middleware order matters. This is the exact sequence:

1. **ExceptionMiddleware**: Catches all unhandled exceptions, returns JSON
2. **SecurityHeadersMiddleware**: Adds OWASP security headers (HSTS, CSP, X-Frame-Options, etc.)
3. **Swagger** (Development only)
4. **HTTPS Redirection**
5. **CORS**: Allows frontend origins
6. **Authentication**: Validates Entra ID JWT tokens
7. **UserSyncMiddleware**: Links Entra identity to UserProfile, adds custom claims
8. **TenantMiddleware**: Resolves tenant context from claims/headers/subdomain
9. **Authorization**: Checks `[Authorize]` attributes and role policies
10. **Controllers**: Handle requests

### Middleware Details

**ExceptionMiddleware**:
- Catches all exceptions (including custom `VoiceUpException` types)
- Returns consistent JSON: `{ success, message, errors }`
- Maps exception types to HTTP status codes
- Shows stack trace in development only

**SecurityHeadersMiddleware**:
- `Strict-Transport-Security`: Force HTTPS for 1 year
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (prevent clickjacking)
- `Content-Security-Policy`: Restrict resource loading
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: Restrict browser features

**TenantMiddleware**:
Resolves tenant from (in priority order):
1. `tid` claim in JWT (Entra Tenant ID) → lookup in Tenants table
2. `X-Tenant-Id` header (for API testing)
3. Subdomain from Host header (e.g., "umich.voiceupathletics.com" → "umich")

Sets `TenantAccessor.TenantId` for query filtering.

**UserSyncMiddleware** (CRITICAL):
- On EVERY authenticated request, looks up UserProfile by `EntraObjectId` + `TenantId`
- If not found (first login), creates UserProfile with auto-generated `AnonymousAlias`
- Updates `LastLoginAt` timestamp
- Adds custom claims to identity: `dbUserId`, `anonymousId`, `anonymousAlias`
- These claims are available to all controllers via `User.FindFirst()`

### Controllers

**BaseApiController**:
- Helper methods: `GetCurrentUserId()`, `GetCurrentAnonymousId()`, `GetCurrentUserRoles()`, `HasRole()`
- Standard responses: `Success<T>()`, `Error()`
- All controllers inherit from this

**AuthController** (`/api/auth`):
- `GET /me`: Returns current user info (profile + roles + tenant)
- `POST /complete-profile`: First-login profile completion (sport, team, academic year)
- `PUT /profile`: Update user profile

**ReportsController** (`/api/reports`):
- `POST /`: Submit anonymous report (Athlete only)
- `GET /`: List all reports with filtering (Staff only)
- `GET /my-reports`: Athlete's own reports
- `GET /{id}`: Get report details (with authorization check)
- `PATCH /{id}/status`: Update report status (Staff only)
- `PATCH /{id}/assign`: Assign report to staff member
- `POST /{id}/escalate`: Escalate report
- `DELETE /{id}`: Soft delete report (Admin only)

**HealthController** (`/health`):
- `GET /`: Basic health check (returns JSON with status, timestamp, service name)

### Program.cs Configuration

**Database**:
```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString, sqlOptions =>
        sqlOptions.EnableRetryOnFailure(maxRetryCount: 5, maxRetryDelay: TimeSpan.FromSeconds(30))));
```

**Authentication** (Entra ID):
```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
```

**Authorization Policies**:
- `StaffOnly`: Requires ComplianceStaff, Admin, or SuperAdmin role
- `AdminOnly`: Requires Admin or SuperAdmin role
- `SuperAdminOnly`: Requires SuperAdmin role

**Dependency Injection**:
- Scoped: `ITenantAccessor`, all repositories, `IUnitOfWork`, all services
- Repositories and services registered with their interface contracts

**CORS**:
- Reads allowed origins from `appsettings.json` (`Cors:AllowedOrigins`)
- Allows all headers, all methods, credentials

---

## Database Schema

### Tables Overview

| Table | Purpose | Tenant-Scoped | Soft Delete |
|-------|---------|---------------|-------------|
| Tenants | Universities/institutions | No | Yes |
| UserProfiles | App user data (linked to Entra ID) | Yes | Yes |
| Reports | Anonymous reports | Yes | Yes |
| Messages | Report conversation threads | Yes | Yes |
| ReportAttachments | File references (Azure Blob) | Yes | Yes |
| Resources | Support resources | Yes | Yes |
| AuditLogs | Audit trail (HIPAA) | Yes | **No** (immutable) |

### Key Relationships

```
Tenant (1) ────< (M) UserProfile
                     ├─ EntraObjectId → links to Entra ID
                     ├─ AnonymousId → used on reports
                     └─ AnonymousAlias → display name

UserProfile (1) ────< (M) Report (as AssignedTo, staff only)

Report (1) ────< (M) Message
Report (1) ────< (M) ReportAttachment

Tenant (1) ────< (M) Resource
```

### Important Indexes

- `UserProfile`: `(EntraObjectId, TenantId)` UNIQUE, `AnonymousId` UNIQUE
- `Tenant`: `Subdomain` UNIQUE, `EntraTenantId` indexed
- `Report`: Composite index on `(TenantId, Status, CreatedAt)` for efficient filtering
- `Report`: Separate indexes on `SubmittedByAnonymousId`, `AssignedToUserId`, `IsFlagged`, `IsEscalated`
- `AuditLog`: `UnmaskedUserId` filtered index for identity unmasking audits

### Enum Storage

All enums stored as strings (e.g., `"MentalHealth"`, `"High"`, `"Submitted"`):
- Human-readable in database
- Easier migrations when adding new values
- Configured via `.HasConversion<string>().HasMaxLength(50)`

---

## Authentication Flow

### End-to-End Flow

```
1. User opens frontend (Next.js)
   ↓
2. Frontend redirects to Microsoft Entra ID login page
   (handled by Entra ID, not our application)
   ↓
3. User authenticates (email + password, MFA, social login)
   (all handled by Microsoft - we never see credentials)
   ↓
4. Entra ID returns tokens to frontend:
   - id_token (user identity info)
   - access_token (for calling our API)
   ↓
5. Frontend sends API requests:
   Authorization: Bearer <access_token>
   ↓
6. Backend JwtBearer middleware validates token:
   - Checks signature against Entra ID public keys
   - Validates expiry, audience, issuer
   - Extracts claims: oid, tid, roles, email, name
   ↓
7. UserSyncMiddleware:
   - Looks up UserProfile by (EntraObjectId + TenantId)
   - First login? Creates profile with AnonymousAlias
   - Adds custom claims: dbUserId, anonymousId, anonymousAlias
   ↓
8. TenantMiddleware:
   - Sets TenantAccessor.TenantId from claims
   - All EF Core queries auto-scoped by this TenantId
   ↓
9. Authorization middleware:
   - Checks [Authorize] attributes
   - Validates role claims against required roles
   ↓
10. Controller handles request with full context
```

### JWT Claims

**From Entra ID**:
- `oid`: Entra Object ID (unique user identifier)
- `tid`: Entra Tenant ID (identifies which Azure AD tenant)
- `roles`: Array of App Roles assigned in Entra ID
- `email`: User email
- `name`: User full name

**Added by UserSyncMiddleware**:
- `dbUserId`: UserProfile.Id from our database
- `anonymousId`: UserProfile.AnonymousId (used on reports)
- `anonymousAlias`: UserProfile.AnonymousAlias (display name)

### Entra ID App Roles Setup (Required)

In the Azure Portal, configure App Roles in the API App Registration:

1. **Athlete**
   - Value: `Athlete`
   - Display Name: `Athlete`
   - Description: `Student-athlete who can submit anonymous reports`

2. **ComplianceStaff**
   - Value: `ComplianceStaff`
   - Display Name: `Compliance Staff`
   - Description: `Staff member who can view and manage reports`

3. **Admin**
   - Value: `Admin`
   - Display Name: `Administrator`
   - Description: `Admin who can manage tenant settings`

4. **SuperAdmin**
   - Value: `SuperAdmin`
   - Display Name: `Super Administrator`
   - Description: `Super admin who can create new tenants`

Users are assigned roles in Entra ID, which flow through the `roles` claim in the JWT.

---

## Multi-Tenancy Implementation

### How It Works

1. **Single Shared Database**: All tenants (universities) share one Azure SQL database.

2. **Row-Level Isolation**: Every tenant-scoped entity has a `TenantId` column.

3. **Global Query Filters**: EF Core automatically adds `WHERE TenantId = @currentTenantId` to ALL queries:
   ```csharp
   modelBuilder.Entity<Report>()
       .HasQueryFilter(e => !e.IsDeleted && e.TenantId == _tenantAccessor.TenantId);
   ```

4. **TenantAccessor**: Scoped service that holds the current request's `TenantId`.
   - Set by `TenantMiddleware` early in pipeline
   - Injected into `ApplicationDbContext`
   - Used by query filters

5. **Cross-Tenant Queries**: Use `.IgnoreQueryFilters()` when needed (e.g., user sync, admin operations).

### Tenant Resolution

**TenantMiddleware** resolves tenant from (priority order):

1. **Entra Tenant ID (`tid` claim)**:
   - Extract `tid` from JWT
   - Lookup `Tenant` where `EntraTenantId == tid`
   - **Preferred**: Each university has its own Entra ID tenant

2. **X-Tenant-Id Header**:
   - For API testing/development
   - `X-Tenant-Id: 1`

3. **Subdomain Parsing**:
   - Parse Host header (e.g., "umich.voiceupathletics.com")
   - Extract subdomain: "umich"
   - Lookup `Tenant` where `Subdomain == "umich"`

### Multi-Tenant Best Practices

**DO**:
- Always trust the `TenantAccessor.TenantId` set by middleware
- Use `.IgnoreQueryFilters()` only when explicitly needed
- Document any cross-tenant operations with comments
- Validate tenant context in sensitive operations

**DON'T**:
- Never manually add `WHERE TenantId = ...` to queries (filters handle it)
- Don't expose `TenantId` in DTOs or client-side code
- Don't allow users to specify `TenantId` in API requests (security risk)

---

## Next Steps

### Critical TODOs

1. **Configure Entra ID**:
   - Create App Registration for API
   - Add App Roles (Athlete, ComplianceStaff, Admin, SuperAdmin)
   - Configure redirect URIs for frontend
   - Update `appsettings.json` with `TenantId`, `ClientId`, `Audience`

2. **Create Azure SQL Database**:
   - Provision Azure SQL Database (Business Critical tier for HIPAA)
   - Enable Transparent Data Encryption (TDE)
   - Update connection string in `appsettings.json`
   - Run migration: `dotnet ef database update --project VoiceUpAthletics.Infrastructure --startup-project VoiceUpAthletics.API`

3. **Implement Missing Services**:
   - `IUserProfileService` implementation
   - `ITenantService` implementation
   - `IMessageService` implementation
   - `IResourceService` implementation

4. **Implement Missing Controllers**:
   - `MessagesController` (report conversations)
   - `TenantsController` (tenant management - SuperAdmin only)
   - `UsersController` (user management - Admin only)
   - `ResourcesController` (support resources)
   - `AnalyticsController` (reporting dashboard data)

5. **Azure Blob Storage**:
   - Provision Azure Storage Account
   - Create container for report attachments
   - Implement file upload service
   - Add `ReportAttachmentsController`

6. **Seed Data**:
   - Create seed data for:
     - First tenant (test university)
     - Default resources (crisis hotlines, counseling services)
   - Add to `Program.cs` or separate seeding class

7. **Testing**:
   - Unit tests for services (especially `ReportService` auto-flagging)
   - Integration tests for repositories
   - End-to-end tests for API endpoints

8. **Frontend Integration**:
   - Implement Entra ID authentication (MSAL.js or NextAuth)
   - API client with Bearer token injection
   - Test authentication flow end-to-end

9. **DevOps**:
   - Azure DevOps pipelines for CI/CD
   - Secrets management (Azure Key Vault)
   - Application Insights instrumentation

10. **Security**:
    - Penetration testing
    - OWASP Top 10 vulnerability scan
    - HIPAA compliance audit

---

## Configuration Guide

### appsettings.json

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "<YOUR-ENTRA-TENANT-ID>",          // From Azure Portal
    "ClientId": "<YOUR-API-APP-REGISTRATION-CLIENT-ID>",
    "Audience": "api://<YOUR-API-APP-REGISTRATION-CLIENT-ID>"
  },

  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:<your-server>.database.windows.net,1433;Initial Catalog=VoiceUpAthletics;Persist Security Info=False;User ID=<admin-user>;Password=<password>;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  },

  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",              // Local development
      "https://localhost:3000",
      "https://app.voiceupathletics.com"   // Production frontend
    ]
  },

  "ApplicationInsights": {
    "ConnectionString": "<YOUR-APPLICATION-INSIGHTS-CONNECTION-STRING>"
  }
}
```

### Environment Variables (Azure App Service Configuration)

**DO NOT commit secrets to source control!** Configure these in Azure App Service:

- `AzureAd__TenantId`
- `AzureAd__ClientId`
- `ConnectionStrings__DefaultConnection` (from Azure Key Vault reference)
- `ApplicationInsights__ConnectionString`

### EF Core Migrations

**Create Migration**:
```bash
cd VoiceUpAthletics.Infrastructure
dotnet ef migrations add MigrationName --startup-project ../VoiceUpAthletics.API
```

**Apply Migration**:
```bash
cd VoiceUpAthletics.Infrastructure
dotnet ef database update --startup-project ../VoiceUpAthletics.API
```

**Remove Last Migration** (if not applied):
```bash
dotnet ef migrations remove --startup-project ../VoiceUpAthletics.API
```

### Running the Application

**Development**:
```bash
cd VoiceUpAthletics.API
dotnet run
```

**Access**:
- API: `https://localhost:7001` (or configured HTTPS port)
- Swagger: `https://localhost:7001/swagger`
- Health Check: `https://localhost:7001/health`

---

## Summary

**What's Built**:
- ✅ Complete three-layer architecture (Core, Infrastructure, API)
- ✅ All entities with relationships and configurations
- ✅ All DTOs organized by feature
- ✅ Repository pattern with Unit of Work
- ✅ Entra ID JWT authentication (NO passwords in our code)
- ✅ Multi-tenant architecture with global query filters
- ✅ Critical middleware (Exception, Security, Tenant, UserSync)
- ✅ Core controllers (Auth, Reports, Health)
- ✅ ReportService with auto-flagging and rate limiting
- ✅ AuditService for HIPAA compliance
- ✅ Initial EF Core migration
- ✅ Configuration files (appsettings, .gitignore)

**What's Needed**:
- 🔲 Remaining services (User, Tenant, Message, Resource)
- 🔲 Remaining controllers (Messages, Tenants, Users, Resources, Analytics)
- 🔲 Azure Blob Storage integration for file uploads
- 🔲 Email notifications
- 🔲 Unit and integration tests
- 🔲 Entra ID App Registration setup
- 🔲 Frontend authentication integration
- 🔲 Azure deployment configuration

**Architecture is SOLID**. The foundation is built to scale, and you can now:
1. Configure Entra ID and Azure resources
2. Implement remaining services/controllers
3. Build the frontend
4. Deploy to Azure
5. Launch! 🚀

---

**Generated**: 2026-02-08
**Framework**: ASP.NET Core 10 / .NET 10
**Database**: Azure SQL with EF Core 10
**Authentication**: Microsoft Entra ID (OAuth 2.0 / OIDC)
