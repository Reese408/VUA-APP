import { apiClient } from './api-client';
import {
  ReportDto,
  CreateReportDto,
  ReportListItemDto,
  ReportFilterDto,
  UpdateReportStatusDto,
  AssignReportDto,
  EscalateReportDto,
} from '@/lib/types/reports';
import { PagedResult } from '@/lib/types/api';

export const reportsApi = {
  // Submit new report (Athlete only)
  createReport: (data: CreateReportDto) =>
    apiClient.post<ReportDto>('/api/reports', data),

  // Get all reports with filters (Staff only)
  getReports: (filter: ReportFilterDto) => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    return apiClient.get<PagedResult<ReportListItemDto>>(
      `/api/reports?${params.toString()}`
    );
  },

  // Get athlete's own reports
  getMyReports: () => apiClient.get<ReportListItemDto[]>('/api/reports/my-reports'),

  // Get single report by ID
  getReportById: (id: number) => apiClient.get<ReportDto>(`/api/reports/${id}`),

  // Update report status (Staff only)
  updateStatus: (id: number, data: UpdateReportStatusDto) =>
    apiClient.patch<ReportDto>(`/api/reports/${id}/status`, data),

  // Assign report to staff member
  assignReport: (id: number, data: AssignReportDto) =>
    apiClient.patch<ReportDto>(`/api/reports/${id}/assign`, data),

  // Escalate report
  escalateReport: (id: number, data: EscalateReportDto) =>
    apiClient.post<ReportDto>(`/api/reports/${id}/escalate`, data),

  // Delete report (soft delete, Admin only)
  deleteReport: (id: number) => apiClient.delete<void>(`/api/reports/${id}`),
};
