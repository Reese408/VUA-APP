// Role constants matching backend AppConstants.Roles

export const ROLES = {
  ATHLETE: 'Athlete',
  COMPLIANCE_STAFF: 'ComplianceStaff',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'SuperAdmin',
} as const;

export const STAFF_ROLES = [
  ROLES.COMPLIANCE_STAFF,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
] as const;

export const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN] as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
