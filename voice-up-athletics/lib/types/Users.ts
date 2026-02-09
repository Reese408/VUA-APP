// Matches backend DTOs from VoiceUpAthletics.Core/DTOs/Users/

export interface UserProfileDto {
  id: number;
  entraObjectId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  anonymousId: string;
  anonymousAlias: string;
  sport?: string;
  teamName?: string;
  academicYear?: string;
  isActive: boolean;
  lastLoginAt?: string;
  isProfileComplete: boolean;
  createdAt: string;
}

export interface CompleteProfileDto {
  sport: string;
  teamName?: string;
  academicYear: string;
  studentId?: string;
}

export interface UpdateUserProfileDto {
  sport?: string;
  teamName?: string;
  academicYear?: string;
}

export interface StaffMemberDto {
  id: number;
  fullName: string;
  email: string;
  assignedReportCount: number;
}
