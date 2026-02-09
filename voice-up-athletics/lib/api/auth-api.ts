import { apiClient } from './api-client';
import { CurrentUserDto } from '@/lib/types/auth';
import { CompleteProfileDto, UserProfileDto } from '@/lib/types/Users';

export const authApi = {
  // Get current authenticated user
  getCurrentUser: () => apiClient.get<CurrentUserDto>('/api/auth/me'),

  // Complete profile on first login
  completeProfile: (data: CompleteProfileDto) =>
    apiClient.post<UserProfileDto>('/api/auth/complete-profile', data),

  // Update user profile
  updateProfile: (data: Partial<CompleteProfileDto>) =>
    apiClient.put<UserProfileDto>('/api/auth/profile', data),
};
