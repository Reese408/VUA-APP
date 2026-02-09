// Matches backend DTOs from VoiceUpAthletics.Core/DTOs/Reports/

export type ReportCategory =
  | 'MentalHealth'
  | 'ComplianceViolation'
  | 'Harassment'
  | 'Discrimination'
  | 'SexualMisconduct'
  | 'SubstanceAbuse'
  | 'AcademicMisconduct'
  | 'InjuryConcerns'
  | 'CoachingMisconduct'
  | 'Other';

export type ReportSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export type ReportStatus =
  | 'Submitted'
  | 'InReview'
  | 'UnderInvestigation'
  | 'PendingResolution'
  | 'Resolved'
  | 'Closed'
  | 'Escalated';

export interface ReportDto {
  id: number;
  title: string;
  category: ReportCategory;
  categoryDisplay: string;
  severity: ReportSeverity;
  severityDisplay: string;
  description: string;
  status: ReportStatus;
  statusDisplay: string;
  submittedByAlias: string;
  submittedByAnonymousId: string;
  assignedToUserId?: number;
  assignedToName?: string;
  assignedAt?: string;
  isFlagged: boolean;
  flagReason?: string;
  isEscalated: boolean;
  escalatedAt?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  incidentDate?: string;
  incidentLocation?: string;
  involvedParties?: string;
  createdAt: string;
  updatedAt?: string;
  messageCount: number;
  attachmentCount: number;
}

export interface ReportListItemDto {
  id: number;
  title: string;
  category: ReportCategory;
  categoryDisplay: string;
  severity: ReportSeverity;
  severityDisplay: string;
  status: ReportStatus;
  statusDisplay: string;
  submittedByAlias: string;
  assignedToUserId?: number;
  assignedToName?: string;
  isFlagged: boolean;
  isEscalated: boolean;
  createdAt: string;
  unreadMessageCount: number;
}

export interface CreateReportDto {
  title: string;
  category: ReportCategory;
  severity: ReportSeverity;
  description: string;
  incidentDate?: string;
  incidentLocation?: string;
  involvedParties?: string;
}

export interface UpdateReportStatusDto {
  status: ReportStatus;
  notes?: string;
}

export interface AssignReportDto {
  staffUserId: number;
}

export interface EscalateReportDto {
  reason: string;
}

export interface ReportFilterDto {
  status?: ReportStatus;
  category?: ReportCategory;
  severity?: ReportSeverity;
  assignedToUserId?: number;
  isFlagged?: boolean;
  isEscalated?: boolean;
  createdFrom?: string;
  createdTo?: string;
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDescending?: boolean;
}
