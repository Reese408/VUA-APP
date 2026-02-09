'use client';

import useSWR from 'swr';
import { ApiResponse, PagedResult } from '@/lib/types/api';
import { ReportDto, ReportListItemDto } from '@/lib/types/reports';
import {
  getReportsAction,
  getMyReportsAction,
  getReportByIdAction,
} from '@/app/actions/reports';

interface UseReportsParams {
  status?: string;
  category?: string;
  severity?: string;
  assignedToId?: number;
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Hook to fetch all reports (for staff)
 */
export function useReports(params?: UseReportsParams) {
  const key = params ? ['reports', params] : ['reports'];
  
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<PagedResult<ReportListItemDto>>
  >(key, () => getReportsAction(params), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    reports: data?.data?.items || [],
    totalCount: data?.data?.totalCount || 0,
    totalPages: data?.data?.totalPages || 0,
    hasNextPage: data?.data?.hasNextPage || false,
    hasPreviousPage: data?.data?.hasPreviousPage || false,
    isLoading,
    isError: !!error || (data?.success === false),
    error: data?.message || error?.message,
    mutate,
  };
}

/**
 * Hook to fetch current user's reports (for athletes)
 */
export function useMyReports(params?: {
  status?: string;
  pageNumber?: number;
  pageSize?: number;
}) {
  const key = params ? ['my-reports', params] : ['my-reports'];
  
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<PagedResult<ReportListItemDto>>
  >(key, () => getMyReportsAction(params), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    reports: data?.data?.items || [],
    totalCount: data?.data?.totalCount || 0,
    totalPages: data?.data?.totalPages || 0,
    hasNextPage: data?.data?.hasNextPage || false,
    hasPreviousPage: data?.data?.hasPreviousPage || false,
    isLoading,
    isError: !!error || (data?.success === false),
    error: data?.message || error?.message,
    mutate,
  };
}

/**
 * Hook to fetch a single report by ID
 */
export function useReport(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<ReportDto>>(
    id ? ['report', id] : null,
    () => (id ? getReportByIdAction(id) : Promise.reject('No ID')),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    report: data?.data || null,
    isLoading,
    isError: !!error || (data?.success === false),
    error: data?.message || error?.message,
    mutate,
  };
}
