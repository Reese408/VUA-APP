'use client';

import useSWR from 'swr';
import { ApiResponse } from '@/lib/types/api';
import { MessageDto } from '@/app/actions/messages';
import { getMessagesAction } from '@/app/actions/messages';

/**
 * Hook to fetch messages for a report
 */
export function useMessages(reportId: number | null) {
  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<MessageDto[]>
  >(
    reportId ? ['messages', reportId] : null,
    () => (reportId ? getMessagesAction(reportId) : Promise.reject('No report ID')),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 5000, // Poll every 5 seconds for new messages
    }
  );

  return {
    messages: data?.data || [],
    isLoading,
    isError: !!error || (data?.success === false),
    error: data?.message || error?.message,
    mutate,
  };
}
