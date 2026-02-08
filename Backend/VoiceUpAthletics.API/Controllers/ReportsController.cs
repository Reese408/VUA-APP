using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VoiceUpAthletics.Core.Constants;
using VoiceUpAthletics.Core.DTOs.Reports;
using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.API.Controllers;

/// <summary>
/// Report management endpoints
/// </summary>
[Authorize]
public class ReportsController : BaseApiController
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    /// <summary>
    /// Submit a new anonymous report (Athletes only)
    /// </summary>
    [HttpPost]
    [Authorize(Roles = AppConstants.Roles.Athlete)]
    public async Task<IActionResult> CreateReport([FromBody] CreateReportDto dto)
    {
        var anonymousId = GetCurrentAnonymousId();
        var report = await _reportService.CreateReportAsync(dto, anonymousId);

        return Success(report, "Report submitted successfully");
    }

    /// <summary>
    /// Get all reports (Staff only) with filtering and pagination
    /// </summary>
    [HttpGet]
    [Authorize(Roles = AppConstants.Roles.StaffRoles)]
    public async Task<IActionResult> GetReports([FromQuery] ReportFilterDto filter)
    {
        var reports = await _reportService.GetReportsAsync(filter);
        return Success(reports);
    }

    /// <summary>
    /// Get my submitted reports (Athlete only)
    /// </summary>
    [HttpGet("my-reports")]
    [Authorize(Roles = AppConstants.Roles.Athlete)]
    public async Task<IActionResult> GetMyReports()
    {
        var anonymousId = GetCurrentAnonymousId();
        var reports = await _reportService.GetMyReportsAsync(anonymousId);

        return Success(reports);
    }

    /// <summary>
    /// Get a specific report by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetReportById(int id)
    {
        var report = await _reportService.GetReportByIdAsync(id);

        // Authorization: Athletes can only see their own reports, Staff can see all
        if (!HasRole(AppConstants.Roles.ComplianceStaff) &&
            !HasRole(AppConstants.Roles.Admin) &&
            !HasRole(AppConstants.Roles.SuperAdmin))
        {
            var anonymousId = GetCurrentAnonymousId();
            if (report.SubmittedByAnonymousId != anonymousId)
            {
                return Forbid();
            }
        }

        return Success(report);
    }

    /// <summary>
    /// Update report status (Staff only)
    /// </summary>
    [HttpPatch("{id}/status")]
    [Authorize(Roles = AppConstants.Roles.StaffRoles)]
    public async Task<IActionResult> UpdateReportStatus(int id, [FromBody] UpdateReportStatusDto dto)
    {
        var report = await _reportService.UpdateReportStatusAsync(id, dto.Status, dto.Notes);
        return Success(report, "Report status updated successfully");
    }

    /// <summary>
    /// Assign report to staff member (Staff only)
    /// </summary>
    [HttpPatch("{id}/assign")]
    [Authorize(Roles = AppConstants.Roles.StaffRoles)]
    public async Task<IActionResult> AssignReport(int id, [FromBody] AssignReportDto dto)
    {
        var report = await _reportService.AssignReportAsync(id, dto.StaffUserId);
        return Success(report, "Report assigned successfully");
    }

    /// <summary>
    /// Escalate report (Staff only)
    /// </summary>
    [HttpPost("{id}/escalate")]
    [Authorize(Roles = AppConstants.Roles.StaffRoles)]
    public async Task<IActionResult> EscalateReport(int id, [FromBody] EscalateReportDto dto)
    {
        var report = await _reportService.EscalateReportAsync(id, dto.Reason);
        return Success(report, "Report escalated successfully");
    }

    /// <summary>
    /// Delete report (Admin only - soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = AppConstants.Roles.AdminRoles)]
    public async Task<IActionResult> DeleteReport(int id)
    {
        await _reportService.DeleteReportAsync(id);
        return Success<object>(null, "Report deleted successfully");
    }
}
