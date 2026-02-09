'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ApiResponse } from '@/lib/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001';

// Message types (matching backend DTOs)
export interface MessageDto {
  id: number;
  reportId: number;
  senderId: number;
  senderAnonymousAlias: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

export interface CreateMessageDto {
  reportId: number;
  content: string;
  isInternal: boolean;
}

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
 * Get all messages for a report
 */
export async function getMessagesAction(
  reportId: number
): Promise<ApiResponse<MessageDto[]>> {
  return apiRequest<MessageDto[]>(`/api/reports/${reportId}/messages`);
}

/**
 * Send a message on a report
 */
export async function sendMessageAction(
  data: CreateMessageDto
): Promise<ApiResponse<MessageDto>> {
  const result = await apiRequest<MessageDto>(
    `/api/reports/${data.reportId}/messages`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  if (result.success) {
    revalidatePath(`/reports/${data.reportId}`);
    revalidatePath(`/messages/${data.reportId}`);
  }

  return result;
}

/**
 * Mark messages as read
 */
export async function markMessagesAsReadAction(
  reportId: number
): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/api/reports/${reportId}/messages/mark-read`, {
    method: 'POST',
  });
}
