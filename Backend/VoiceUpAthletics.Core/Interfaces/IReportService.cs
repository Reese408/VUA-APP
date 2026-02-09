using VoiceUpAthletics.Core.DTOs;
using VoiceUpAthletics.Core.DTOs.Reports;
using VoiceUpAthletics.Core.Enums;

namespace VoiceUpAthletics.Core.Interfaces;

/// <summary>
/// Service interface for report-related business logic
/// </summary>
public interface IReportService
{
    Task<ReportDto> CreateReportAsync(CreateReportDto dto, Guid submitterAnonymousId, CancellationToken cancellationToken = default);
    Task<ReportDto> GetReportByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<PagedResultDto<ReportListItemDto>> GetReportsAsync(ReportFilterDto filter, CancellationToken cancellationToken = default);
    Task<IEnumerable<ReportListItemDto>> GetMyReportsAsync(Guid anonymousId, CancellationToken cancellationToken = default);
    Task<ReportDto> UpdateReportStatusAsync(int id, ReportStatus status, string? notes, CancellationToken cancellationToken = default);
    Task<ReportDto> AssignReportAsync(int id, int staffUserId, CancellationToken cancellationToken = default);
    Task<ReportDto> EscalateReportAsync(int id, string reason, CancellationToken cancellationToken = default);
    Task<ReportDto> FlagReportAsync(int id, string reason, CancellationToken cancellationToken = default);
    Task DeleteReportAsync(int id, CancellationToken cancellationToken = default);
}
