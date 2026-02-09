// Matches backend DTOs from VoiceUpAthletics.Core/DTOs/Auth/

export interface CurrentUserDto {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  anonymousId: string;
  anonymousAlias: string;
  roles: string[];
  tenantId: number;
  tenantName: string;
  isProfileComplete: boolean;
  sport?: string;
  teamName?: string;
}

export interface LoginResponseDto {
  user: CurrentUserDto;
  isFirstLogin: boolean;
  requiresProfileCompletion: boolean;
}
