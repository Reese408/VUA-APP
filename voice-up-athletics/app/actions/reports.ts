'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ApiResponse, PagedResult } from '@/lib/types/api';
import {
  ReportDto,
  ReportListItemDto,
  CreateReportDto,
  UpdateReportStatusDto,
  AssignReportDto,
  EscalateReportDto,
} from '@/lib/types/reports';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001';

/**
 * Get the access token from cookies
 */
async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value || null;
}

/**
 * Make an authenticated request to the backend API
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = await getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        success: false,
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      return {
        success: false,
        data: null,
        message: errorData.message || 'An error occurred',
        errors: errorData.errors,
      };
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error ? error.message : 'Network error occurred',
      errors: [],
    };
  }
}

/**
 * Create a new report
 */
export async function createReportAction(
  data: CreateReportDto
): Promise<ApiResponse<ReportDto>> {
  const result = await apiRequest<ReportDto>('/api/reports', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (result.success) {
    revalidatePath('/dashboard');
    revalidatePath('/reports');
  }

  return result;
}

/**
 * Get all reports with optional filters (for staff)
 */
export async function getReportsAction(params?: {
  status?: string;
  category?: string;
  severity?: string;
  assignedToId?: number;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ApiResponse<PagedResult<ReportListItemDto>>> {
  const queryParams = new URLSearchParams();

  if (params?.status) queryParams.append('status', params.status);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.severity) queryParams.append('severity', params.severity);
  if (params?.assignedToId) queryParams.append('assignedToId', params.assignedToId.toString());
  if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());

  const endpoint = `/api/reports${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  return apiRequest<PagedResult<ReportListItemDto>>(endpoint);
}

/**
 * Get current user's reports (for athletes)
 */
export async function getMyReportsAction(params?: {
  status?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ApiResponse<PagedResult<ReportListItemDto>>> {
  const queryParams = new URLSearchParams();

  if (params?.status) queryParams.append('status', params.status);
  if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());

  const endpoint = `/api/reports/my${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  return apiRequest<PagedResult<ReportListItemDto>>(endpoint);
}

/**
 * Get a specific report by ID
 */
export async function getReportByIdAction(
  id: number
): Promise<ApiResponse<ReportDto>> {
  return apiRequest<ReportDto>(`/api/reports/${id}`);
}

/**
 * Update report status (for staff)
 */
export async function updateReportStatusAction(
  id: number,
  data: UpdateReportStatusDto
): Promise<ApiResponse<ReportDto>> {
  const result = await apiRequest<ReportDto>(`/api/reports/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (result.success) {
    revalidatePath('/dashboard');
    revalidatePath('/reports');
    revalidatePath(`/reports/${id}`);
  }

  return result;
}

/**
 * Assign report to staff member (for admins)
 */
export async function assignReportAction(
  id: number,
  data: AssignReportDto
): Promise<ApiResponse<ReportDto>> {
  const result = await apiRequest<ReportDto>(`/api/reports/${id}/assign`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (result.success) {
    revalidatePath('/dashboard');
    revalidatePath('/reports');
    revalidatePath(`/reports/${id}`);
  }

  return result;
}

/**
 * Escalate report (for staff)
 */
export async function escalateReportAction(
  id: number,
  data: EscalateReportDto
): Promise<ApiResponse<ReportDto>> {
  const result = await apiRequest<ReportDto>(`/api/reports/${id}/escalate`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (result.success) {
    revalidatePath('/dashboard');
    revalidatePath('/reports');
    revalidatePath(`/reports/${id}`);
  }

  return result;
}

/**
 * Delete report (for admins/super admins)
 */
export async function deleteReportAction(
  id: number
): Promise<ApiResponse<void>> {
  const result = await apiRequest<void>(`/api/reports/${id}`, {
    method: 'DELETE',
  });

  if (result.success) {
    revalidatePath('/dashboard');
    revalidatePath('/reports');
  }

  return result;
}
