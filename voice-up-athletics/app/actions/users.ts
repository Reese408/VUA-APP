'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ApiResponse, PagedResult } from '@/lib/types/api';
import { UserProfileDto, StaffMemberDto } from '@/lib/types/Users';

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
 * Get all users with pagination (for admins)
 */
export async function getUsersAction(params?: {
  role?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ApiResponse<PagedResult<UserProfileDto>>> {
  const queryParams = new URLSearchParams();

  if (params?.role) queryParams.append('role', params.role);
  if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
  if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());

  const endpoint = `/api/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  return apiRequest<PagedResult<UserProfileDto>>(endpoint);
}

/**
 * Get a specific user by ID (for admins)
 */
export async function getUserByIdAction(
  id: number
): Promise<ApiResponse<UserProfileDto>> {
  return apiRequest<UserProfileDto>(`/api/users/${id}`);
}

/**
 * Get all staff members (for report assignment)
 */
export async function getStaffMembersAction(): Promise<
  ApiResponse<StaffMemberDto[]>
> {
  return apiRequest<StaffMemberDto[]>('/api/users/staff');
}

/**
 * Update user role (for admins)
 */
export async function updateUserRoleAction(
  userId: number,
  role: string
): Promise<ApiResponse<UserProfileDto>> {
  const result = await apiRequest<UserProfileDto>(`/api/users/${userId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });

  if (result.success) {
    revalidatePath('/admin/users');
    revalidatePath(`/admin/users/${userId}`);
  }

  return result;
}

/**
 * Deactivate user (for admins)
 */
export async function deactivateUserAction(
  userId: number
): Promise<ApiResponse<void>> {
  const result = await apiRequest<void>(`/api/users/${userId}/deactivate`, {
    method: 'POST',
  });

  if (result.success) {
    revalidatePath('/admin/users');
    revalidatePath(`/admin/users/${userId}`);
  }

  return result;
}

/**
 * Reactivate user (for admins)
 */
export async function reactivateUserAction(
  userId: number
): Promise<ApiResponse<void>> {
  const result = await apiRequest<void>(`/api/users/${userId}/reactivate`, {
    method: 'POST',
  });

  if (result.success) {
    revalidatePath('/admin/users');
    revalidatePath(`/admin/users/${userId}`);
  }

  return result;
}
