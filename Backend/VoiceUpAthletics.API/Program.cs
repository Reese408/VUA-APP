using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Serilog;
using VoiceUpAthletics.API.Middleware;
using VoiceUpAthletics.Core.Interfaces;
using VoiceUpAthletics.Infrastructure.Data;
using VoiceUpAthletics.Infrastructure.Repositories;
using VoiceUpAthletics.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// ========== LOGGING CONFIGURATION (Serilog) ==========
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

// ========== DATABASE CONFIGURATION ==========
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
        });
});

// ========== AUTHENTICATION & AUTHORIZATION (Microsoft Entra ID) ==========
// CRITICAL: This validates JWT tokens issued by Entra ID. NO local token generation.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization(options =>
{
    // Role-based policies (roles come from Entra ID App Roles)
    options.AddPolicy("StaffOnly", policy =>
        policy.RequireRole("ComplianceStaff", "Admin", "SuperAdmin"));

    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin", "SuperAdmin"));

    options.AddPolicy("SuperAdminOnly", policy =>
        policy.RequireRole("SuperAdmin"));
});

// ========== DEPENDENCY INJECTION ==========
// Scoped services (per HTTP request)
builder.Services.AddScoped<ITenantAccessor, TenantAccessor>();

// Repositories
builder.Services.AddScoped<IReportRepository, ReportRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();
builder.Services.AddScoped<ITenantRepository, TenantRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IResourceRepository, ResourceRepository>();
builder.Services.AddScoped<IAuditLogRepository, AuditLogRepository>();
builder.Services.AddScoped<IReportAttachmentRepository, ReportAttachmentRepository>();

// Unit of Work
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Services
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IAuditService, AuditService>();
// TODO: Add other services (IUserProfileService, ITenantService, IMessageService, IResourceService)

// ========== CORS CONFIGURATION ==========
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>())
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// ========== API CONTROLLERS & SWAGGER ==========
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ========== MIDDLEWARE PIPELINE ==========
// Order matters! This is the exact sequence for request processing.

// 1. Exception handling (must be first to catch all errors)
app.UseMiddleware<ExceptionMiddleware>();

// 2. Security headers
app.UseMiddleware<SecurityHeadersMiddleware>();

// 3. Swagger (development only)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 4. HTTPS redirection
app.UseHttpsRedirection();

// 5. CORS
app.UseCors("AllowFrontend");

// 6. Authentication (Entra ID JWT validation)
app.UseAuthentication();

// 7. User sync (CRITICAL: Links Entra identity to our UserProfile table)
app.UseMiddleware<UserSyncMiddleware>();

// 8. Tenant resolution (CRITICAL: Sets tenant context for query filtering)
app.UseMiddleware<TenantMiddleware>();

// 9. Authorization (checks [Authorize] and role policies)
app.UseAuthorization();

// 10. Map controllers
app.MapControllers();

// ========== RUN APPLICATION ==========
try
{
    Log.Information("Starting Voice Up Athletics API");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
