using VoiceUpAthletics.Core.Constants;
using VoiceUpAthletics.Core.DTOs;
using VoiceUpAthletics.Core.DTOs.Reports;
using VoiceUpAthletics.Core.Entities;
using VoiceUpAthletics.Core.Enums;
using VoiceUpAthletics.Core.Exceptions;
using VoiceUpAthletics.Core.Interfaces;

namespace VoiceUpAthletics.Infrastructure.Services;

public class ReportService : IReportService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IAuditService _auditService;

    public ReportService(IUnitOfWork unitOfWork, IAuditService auditService)
    {
        _unitOfWork = unitOfWork;
        _auditService = auditService;
    }

    public async Task<ReportDto> CreateReportAsync(CreateReportDto dto, Guid submitterAnonymousId, CancellationToken cancellationToken = default)
    {
        // Get the user profile by anonymous ID to check rate limits
        var userProfile = await _unitOfWork.UserProfiles.GetByAnonymousIdAsync(submitterAnonymousId, cancellationToken)
            ?? throw new NotFoundException("User profile not found");

        // Rate limiting: Check if user has exceeded daily report limit
        var reportsToday = await _unitOfWork.Reports.GetReportCountByAnonymousIdTodayAsync(submitterAnonymousId, cancellationToken);
        if (reportsToday >= AppConstants.RateLimits.MaxReportsPerDay)
        {
            throw new RateLimitExceededException($"Daily report limit of {AppConstants.RateLimits.MaxReportsPerDay} reports exceeded");
        }

        // Create the report
        var report = new Report
        {
            SubmittedByAnonymousId = submitterAnonymousId,
            Title = dto.Title,
            Category = dto.Category,
            Severity = dto.Severity,
            Description = dto.Description,
            Status = ReportStatus.Submitted,
            IncidentDate = dto.IncidentDate,
            IncidentLocation = dto.IncidentLocation,
            InvolvedParties = dto.InvolvedParties
        };

        // Auto-flagging logic
        if (ShouldAutoFlag(report))
        {
            report.IsFlagged = true;
            report.FlagReason = "Auto-flagged: Potential spam or policy violation detected";
        }

        await _unitOfWork.Reports.AddAsync(report, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Audit log
        await _auditService.LogAsync(
            AppConstants.AuditActions.ReportCreated,
            userProfile.Id,
            nameof(Report),
            report.Id,
            $"Report created: {report.Title}",
            cancellationToken: cancellationToken
        );

        return await MapToReportDto(report, cancellationToken);
    }

    public async Task<ReportDto> GetReportByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var report = await _unitOfWork.Reports.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException(nameof(Report), id);

        return await MapToReportDto(report, cancellationToken);
    }

    public async Task<PagedResultDto<ReportListItemDto>> GetReportsAsync(ReportFilterDto filter, CancellationToken cancellationToken = default)
    {
        var query = (await _unitOfWork.Reports.GetAllAsync(cancellationToken)).AsQueryable();

        // Apply filters
        if (filter.Status.HasValue)
        {
            query = query.Where(r => r.Status == filter.Status.Value);
        }

        if (filter.Category.HasValue)
        {
            query = query.Where(r => r.Category == filter.Category.Value);
        }

        if (filter.Severity.HasValue)
        {
            query = query.Where(r => r.Severity == filter.Severity.Value);
        }

        if (filter.AssignedToUserId.HasValue)
        {
            query = query.Where(r => r.AssignedToUserId == filter.AssignedToUserId.Value);
        }

        if (filter.IsFlagged.HasValue)
        {
            query = query.Where(r => r.IsFlagged == filter.IsFlagged.Value);
        }

        if (filter.IsEscalated.HasValue)
        {
            query = query.Where(r => r.IsEscalated == filter.IsEscalated.Value);
        }

        if (filter.CreatedFrom.HasValue)
        {
            query = query.Where(r => r.CreatedAt >= filter.CreatedFrom.Value);
        }

        if (filter.CreatedTo.HasValue)
        {
            query = query.Where(r => r.CreatedAt <= filter.CreatedTo.Value);
        }

        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            var searchTerm = filter.SearchTerm.ToLower();
            query = query.Where(r =>
                r.Title.ToLower().Contains(searchTerm) ||
                r.Description.ToLower().Contains(searchTerm));
        }

        // Get total count before pagination
        var totalCount = query.Count();

        // Apply sorting
        query = filter.SortBy?.ToLower() switch
        {
            "title" => filter.SortDescending ? query.OrderByDescending(r => r.Title) : query.OrderBy(r => r.Title),
            "status" => filter.SortDescending ? query.OrderByDescending(r => r.Status) : query.OrderBy(r => r.Status),
            "severity" => filter.SortDescending ? query.OrderByDescending(r => r.Severity) : query.OrderBy(r => r.Severity),
            "category" => filter.SortDescending ? query.OrderByDescending(r => r.Category) : query.OrderBy(r => r.Category),
            _ => filter.SortDescending ? query.OrderByDescending(r => r.CreatedAt) : query.OrderBy(r => r.CreatedAt)
        };

        // Apply pagination
        var items = query
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .Select(r => new ReportListItemDto
            {
                Id = r.Id,
                Title = r.Title,
                Category = r.Category,
                CategoryDisplay = r.Category.ToString(),
                Severity = r.Severity,
                SeverityDisplay = r.Severity.ToString(),
                Status = r.Status,
                StatusDisplay = r.Status.ToString(),
                SubmittedByAlias = GetAnonymousAliasForReport(r.SubmittedByAnonymousId).Result,
                AssignedToUserId = r.AssignedToUserId,
                AssignedToName = r.AssignedTo != null ? $"{r.AssignedTo.FirstName} {r.AssignedTo.LastName}" : null,
                IsFlagged = r.IsFlagged,
                IsEscalated = r.IsEscalated,
                CreatedAt = r.CreatedAt,
                UnreadMessageCount = 0 // TODO: Calculate unread count
            })
            .ToList();

        return new PagedResultDto<ReportListItemDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = filter.PageNumber,
            PageSize = filter.PageSize
        };
    }

    public async Task<IEnumerable<ReportListItemDto>> GetMyReportsAsync(Guid anonymousId, CancellationToken cancellationToken = default)
    {
        var reports = await _unitOfWork.Reports.GetReportsByAnonymousIdAsync(anonymousId, cancellationToken);

        return reports.Select(r => new ReportListItemDto
        {
            Id = r.Id,
            Title = r.Title,
            Category = r.Category,
            CategoryDisplay = r.Category.ToString(),
            Severity = r.Severity,
            SeverityDisplay = r.Severity.ToString(),
            Status = r.Status,
            StatusDisplay = r.Status.ToString(),
            SubmittedByAlias = GetAnonymousAliasForReport(r.SubmittedByAnonymousId).Result,
            AssignedToUserId = r.AssignedToUserId,
            AssignedToName = r.AssignedTo != null ? $"{r.AssignedTo.FirstName} {r.AssignedTo.LastName}" : null,
            IsFlagged = r.IsFlagged,
            IsEscalated = r.IsEscalated,
            CreatedAt = r.CreatedAt,
            UnreadMessageCount = 0
        });
    }

    public async Task<ReportDto> UpdateReportStatusAsync(int id, ReportStatus status, string? notes, CancellationToken cancellationToken = default)
    {
        var report = await _unitOfWork.Reports.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException(nameof(Report), id);

        report.Status = status;

        if (status == ReportStatus.Resolved)
        {
            report.ResolvedAt = DateTime.UtcNow;
            report.ResolutionNotes = notes;
        }

        _unitOfWork.Reports.Update(report);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        await _auditService.LogAsync(
            AppConstants.AuditActions.ReportStatusChanged,
            null,
            nameof(Report),
            report.Id,
            $"Status changed to: {status}",
            cancellationToken: cancellationToken
        );

        return await MapToReportDto(report, cancellationToken);
    }

    public async Task<ReportDto> AssignReportAsync(int id, int staffUserId, CancellationToken cancellationToken = default)
    {
        var report = await _unitOfWork.Reports.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException(nameof(Report), id);

        var staffUser = await _unitOfWork.UserProfiles.GetByIdAsync(staffUserId, cancellationToken)
            ?? throw new NotFoundException(nameof(UserProfile), staffUserId);

        report.AssignedToUserId = staffUserId;
        report.AssignedAt = DateTime.UtcNow;

        if (report.Status == ReportStatus.Submitted)
        {
            report.Status = ReportStatus.InReview;
        }

        _unitOfWork.Reports.Update(report);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        await _auditService.LogAsync(
            AppConstants.AuditActions.ReportAssigned,
            staffUserId,
            nameof(Report),
            report.Id,
            $"Report assigned to: {staffUser.FirstName} {staffUser.LastName}",
            cancellationToken: cancellationToken
        );

        return await MapToReportDto(report, cancellationToken);
    }

    public async Task<ReportDto> EscalateReportAsync(int id, string reason, CancellationToken cancellationToken = default)
    {
        var report = await _unitOfWork.Reports.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException(nameof(Report), id);

        report.IsEscalated = true;
        report.EscalatedAt = DateTime.UtcNow;
        report.Status = ReportStatus.Escalated;

        _unitOfWork.Reports.Update(report);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        await _auditService.LogAsync(
            AppConstants.AuditActions.ReportEscalated,
            null,
            nameof(Report),
            report.Id,
            $"Escalation reason: {reason}",
            cancellationToken: cancellationToken
        );

        return await MapToReportDto(report, cancellationToken);
    }

    public async Task<ReportDto> FlagReportAsync(int id, string reason, CancellationToken cancellationToken = default)
    {
        var report = await _unitOfWork.Reports.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException(nameof(Report), id);

        report.IsFlagged = true;
        report.FlagReason = reason;

        _unitOfWork.Reports.Update(report);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        await _auditService.LogAsync(
            AppConstants.AuditActions.ReportFlagged,
            null,
            nameof(Report),
            report.Id,
            $"Flag reason: {reason}",
            cancellationToken: cancellationToken
        );

        return await MapToReportDto(report, cancellationToken);
    }

    public async Task DeleteReportAsync(int id, CancellationToken cancellationToken = default)
    {
        var report = await _unitOfWork.Reports.GetByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException(nameof(Report), id);

        _unitOfWork.Reports.SoftDelete(report);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    // Private helper methods

    private bool ShouldAutoFlag(Report report)
    {
        // Check description length
        if (report.Description.Length < AppConstants.Flagging.MinDescriptionLength)
        {
            return true;
        }

        // Check for spam keywords
        var descriptionLower = report.Description.ToLower();
        var spamKeywordCount = AppConstants.Flagging.SpamKeywords.Count(keyword => descriptionLower.Contains(keyword));
        if (spamKeywordCount >= AppConstants.Flagging.SpamKeywordThreshold)
        {
            return true;
        }

        // Check for repeated characters (e.g., "aaaaaaa")
        if (System.Text.RegularExpressions.Regex.IsMatch(report.Description, @"(.)\1{10,}"))
        {
            return true;
        }

        return false;
    }

    private async Task<string> GetAnonymousAliasForReport(Guid anonymousId)
    {
        var user = await _unitOfWork.UserProfiles.GetByAnonymousIdAsync(anonymousId);
        return user?.AnonymousAlias ?? "Unknown";
    }

    private async Task<ReportDto> MapToReportDto(Report report, CancellationToken cancellationToken)
    {
        var submitterAlias = await GetAnonymousAliasForReport(report.SubmittedByAnonymousId);
        var assignedToName = report.AssignedTo != null ? $"{report.AssignedTo.FirstName} {report.AssignedTo.LastName}" : null;

        var messageCount = (await _unitOfWork.Messages.GetMessagesByReportIdAsync(report.Id, cancellationToken)).Count();
        var attachmentCount = (await _unitOfWork.ReportAttachments.GetByReportIdAsync(report.Id, cancellationToken)).Count();

        return new ReportDto
        {
            Id = report.Id,
            Title = report.Title,
            Category = report.Category,
            CategoryDisplay = report.Category.ToString(),
            Severity = report.Severity,
            SeverityDisplay = report.Severity.ToString(),
            Description = report.Description,
            Status = report.Status,
            StatusDisplay = report.Status.ToString(),
            SubmittedByAlias = submitterAlias,
            SubmittedByAnonymousId = report.SubmittedByAnonymousId,
            AssignedToUserId = report.AssignedToUserId,
            AssignedToName = assignedToName,
            AssignedAt = report.AssignedAt,
            IsFlagged = report.IsFlagged,
            FlagReason = report.FlagReason,
            IsEscalated = report.IsEscalated,
            EscalatedAt = report.EscalatedAt,
            ResolutionNotes = report.ResolutionNotes,
            ResolvedAt = report.ResolvedAt,
            IncidentDate = report.IncidentDate,
            IncidentLocation = report.IncidentLocation,
            InvolvedParties = report.InvolvedParties,
            CreatedAt = report.CreatedAt,
            UpdatedAt = report.UpdatedAt,
            MessageCount = messageCount,
            AttachmentCount = attachmentCount
        };
    }
}
