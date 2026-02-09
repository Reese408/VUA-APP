export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  CALLBACK: '/callback',

  // Dashboard
  DASHBOARD: '/dashboard',
  COMPLETE_PROFILE: '/complete-profile',

  // Reports
  REPORTS: '/reports',
  NEW_REPORT: '/reports/new',
  REPORT_DETAIL: (id: number) => `/reports/${id}`,
  MY_REPORTS: '/reports',

  // Messages
  MESSAGES: (reportId: number) => `/messages/${reportId}`,

  // Resources
  RESOURCES: '/resources',

  // Profile
  PROFILE: '/profile',

  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_TENANTS: '/admin/tenants',
  ADMIN_RESOURCES: '/admin/resources',
  ADMIN_ANALYTICS: '/admin/analytics',

  // SuperAdmin
  SUPERADMIN_TENANTS: '/superadmin/tenants',
  SUPERADMIN_NEW_TENANT: '/superadmin/tenants/new',
} as const;
