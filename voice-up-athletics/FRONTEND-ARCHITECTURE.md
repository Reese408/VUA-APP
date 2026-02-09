# Voice Up Athletics - Frontend Architecture

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Principles](#architecture-principles)
4. [Project Structure](#project-structure)
5. [Authentication Flow](#authentication-flow)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Routing & Navigation](#routing--navigation)
9. [Component Architecture](#component-architecture)
10. [Multi-Tenancy](#multi-tenancy)
11. [Security & Privacy](#security--privacy)
12. [Implementation Roadmap](#implementation-roadmap)

---

## Overview

Voice Up Athletics is a **multi-tenant SaaS platform** that enables NCAA student-athletes to submit **anonymous reports** for mental health concerns, compliance issues, and misconduct. The frontend is a **Next.js 15+ TypeScript application** that integrates with a **Microsoft Entra ID authenticated ASP.NET Core API**.

### Key Product Requirements
- ✅ **Anonymous Reporting**: Athletes submit reports without revealing identity
- ✅ **Multi-Tenant**: Each university has isolated data
- ✅ **Microsoft Entra ID Authentication**: Enterprise SSO (no passwords in our app)
- ✅ **Role-Based Access**: Athlete, ComplianceStaff, Admin, SuperAdmin
- ✅ **HIPAA/PHI Compliant**: Mental health data protection
- ✅ **Real-Time Messaging**: Report conversation threads
- ✅ **Responsive Design**: Mobile-first for athletes

---

## Technology Stack

### Core Framework
```json
{
  "framework": "Next.js 16.1.4 (App Router)",
  "language": "TypeScript 5",
  "react": "19.2.3",
  "runtime": "Node.js 20+"
}
```

### Authentication
```json
{
  "provider": "Microsoft Entra ID (Azure AD)",
  "library": "@azure/msal-react + @azure/msal-browser",
  "flow": "OAuth 2.0 / OpenID Connect",
  "tokens": "JWT access tokens issued by Entra ID"
}
```

### UI & Styling
```json
{
  "styling": "Tailwind CSS 4",
  "components": "shadcn/ui (Radix UI primitives)",
  "icons": "lucide-react",
  "animations": "Framer Motion"
}
```

### State Management
```json
{
  "global": "Zustand (lightweight alternative to Redux)",
  "server": "React Server Components + Server Actions",
  "cache": "Next.js built-in caching + SWR for data fetching"
}
```

### API Client
```json
{
  "client": "Custom type-safe API client (lib/api/api-client.ts)",
  "validation": "Zod schemas matching backend DTOs",
  "interceptors": "Auto-inject Bearer tokens, handle errors, refresh tokens"
}
```

### Deployment
```json
{
  "hosting": "Azure Static Web Apps",
  "cdn": "Azure Front Door",
  "ci_cd": "Azure DevOps Pipelines"
}
```

---

## Architecture Principles

### 1. **Entra ID First**
- **NO custom authentication** - Microsoft Entra ID handles login, MFA, password recovery
- Frontend redirects to Entra ID login page
- Backend validates JWT tokens (frontend just sends them)
- No user provisioning in frontend - users exist in Entra ID first

### 2. **API-Driven**
- Frontend is a **thin client** - all business logic in backend
- No local state for reports, messages, users (always fetch from API)
- Optimistic UI updates for better UX, but always sync with backend

### 3. **Anonymity Preservation**
- Reports display **AnonymousAlias** (e.g., "Athlete-X7K9M2"), NOT real names
- Frontend never stores or exposes real identity on athlete reports
- Only Staff/Admin roles can see assigned staff names

### 4. **Multi-Tenant Aware**
- Tenant context resolved automatically by backend
- Frontend doesn't manage TenantId - backend middleware handles it
- Subdomain routing: `umich.voiceupathletics.com`, `ucla.voiceupathletics.com`

### 5. **Mobile-First**
- Athletes primarily use mobile devices
- Responsive breakpoints: mobile (< 768px), tablet (768px-1024px), desktop (> 1024px)
- Touch-friendly UI elements (48px minimum tap targets)

### 6. **Accessibility (WCAG 2.1 AA)**
- Keyboard navigation
- Screen reader support
- Sufficient color contrast
- Focus indicators

### 7. **Security by Default**
- All API calls use HTTPS
- Bearer tokens in Authorization header (never in URL)
- No sensitive data in localStorage (use secure cookies or sessionStorage)
- Content Security Policy (CSP) headers
- CSRF protection via Next.js

---

## Project Structure

```
voice-up-athletics/
│
├── app/                                    # Next.js App Router
│   ├── (auth)/                            # Auth group (no layout)
│   │   ├── login/
│   │   │   └── page.tsx                   # Login page (redirects to Entra ID)
│   │   ├── callback/
│   │   │   └── page.tsx                   # Entra ID callback handler
│   │   └── complete-profile/
│   │       └── page.tsx                   # First-login profile completion
│   │
│   ├── (public)/                          # Public marketing pages
│   │   ├── page.tsx                       # Landing page
│   │   ├── product/
│   │   │   ├── features/page.tsx
│   │   │   ├── for-universities/page.tsx
│   │   │   ├── for-teams/page.tsx
│   │   │   └── pricing/page.tsx
│   │   ├── company/
│   │   │   ├── about/page.tsx
│   │   │   ├── mission/page.tsx
│   │   │   ├── careers/page.tsx
│   │   │   ├── partners/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── legal/
│   │   │   ├── privacy-policy/page.tsx
│   │   │   ├── terms-of-service/page.tsx
│   │   │   ├── hipaa-compliance/page.tsx
│   │   │   └── security/page.tsx
│   │   ├── resources/
│   │   │   ├── mental-health/page.tsx
│   │   │   ├── support/page.tsx
│   │   │   ├── help-center/page.tsx
│   │   │   ├── success-stories/page.tsx
│   │   │   └── research-insights/page.tsx
│   │   └── university/
│   │       └── request-access/page.tsx    # University demo request
│   │
│   ├── (dashboard)/                       # Protected app (requires auth)
│   │   ├── layout.tsx                     # Dashboard layout with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx                   # Main dashboard (role-specific)
│   │   │
│   │   ├── reports/                       # Report management
│   │   │   ├── page.tsx                   # List reports (Staff) OR My Reports (Athlete)
│   │   │   ├── new/page.tsx               # Submit new report (Athlete only)
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx               # Report details
│   │   │   │   └── edit/page.tsx          # Edit report (Staff only)
│   │   │   └── flagged/page.tsx           # Flagged reports (Staff only)
│   │   │
│   │   ├── messages/                      # Messaging (integrated with reports)
│   │   │   └── [reportId]/page.tsx        # Message thread for specific report
│   │   │
│   │   ├── resources/                     # Support resources
│   │   │   └── page.tsx                   # List resources (all authenticated users)
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx                   # User profile settings
│   │   │
│   │   ├── admin/                         # Admin-only pages
│   │   │   ├── users/page.tsx             # User management (view only - Entra ID is source)
│   │   │   ├── tenants/page.tsx           # Tenant settings (Admin only)
│   │   │   ├── resources/page.tsx         # Manage support resources
│   │   │   └── analytics/page.tsx         # Analytics dashboard
│   │   │
│   │   └── superadmin/                    # SuperAdmin-only pages
│   │       └── tenants/
│   │           ├── page.tsx               # List all tenants
│   │           └── new/page.tsx           # Create new tenant
│   │
│   ├── api/                               # Next.js API routes (optional - mainly for server actions)
│   │   └── auth/
│   │       └── [...nextauth]/route.ts     # NextAuth or MSAL callback handling
│   │
│   ├── layout.tsx                         # Root layout
│   ├── globals.css                        # Global styles
│   └── not-found.tsx                      # 404 page
│
├── components/
│   ├── auth/
│   │   ├── LoginButton.tsx                # Triggers Entra ID redirect
│   │   ├── LogoutButton.tsx
│   │   ├── ProtectedRoute.tsx             # HOC for auth protection
│   │   └── RoleGuard.tsx                  # HOC for role-based access
│   │
│   ├── dashboard/
│   │   ├── Sidebar.tsx                    # Navigation sidebar (role-aware)
│   │   ├── Topbar.tsx                     # Search, notifications, user menu
│   │   ├── StatsCard.tsx                  # Dashboard metric cards
│   │   ├── RecentReports.tsx              # Recent reports widget
│   │   └── QuickActions.tsx               # Role-specific quick actions
│   │
│   ├── reports/
│   │   ├── ReportList.tsx                 # Paginated, filterable report list
│   │   ├── ReportCard.tsx                 # Report list item
│   │   ├── ReportDetailView.tsx           # Full report details
│   │   ├── ReportForm.tsx                 # Create/edit report form
│   │   ├── ReportFilters.tsx              # Status, category, severity filters
│   │   ├── ReportStatusBadge.tsx          # Visual status indicator
│   │   ├── ReportActions.tsx              # Assign, escalate, resolve actions
│   │   └── AnonymousIndicator.tsx         # Shows anonymous alias
│   │
│   ├── messages/
│   │   ├── MessageThread.tsx              # Full conversation view
│   │   ├── MessageBubble.tsx              # Individual message
│   │   ├── MessageInput.tsx               # Send message form
│   │   └── InternalNoteToggle.tsx         # Staff-only internal notes
│   │
│   ├── resources/
│   │   ├── ResourceCard.tsx               # Support resource card
│   │   ├── EmergencyResources.tsx         # Crisis hotlines (always visible)
│   │   └── ResourceCategoryFilter.tsx     # Filter by category
│   │
│   ├── layout/
│   │   ├── Navbar.tsx                     # Public site navbar
│   │   ├── Footer.tsx                     # Public site footer
│   │   ├── DashboardLayout.tsx            # Dashboard wrapper
│   │   └── MobileNav.tsx                  # Mobile hamburger menu
│   │
│   ├── forms/
│   │   ├── Input.tsx                      # Reusable form input
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── FileUpload.tsx                 # For report attachments
│   │   ├── FormField.tsx                  # Wrapper with label + error
│   │   └── ValidationMessage.tsx          # Error/success messages
│   │
│   ├── ui/                                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── skeleton.tsx                   # Loading skeletons
│   │   └── toast.tsx                      # Notifications
│   │
│   └── landing/                           # Landing page sections
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── HowItWorks.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── Pricing.tsx
│       └── CTA.tsx
│
├── lib/
│   ├── api/
│   │   ├── api-client.ts                  # Base API client with interceptors
│   │   ├── auth-api.ts                    # Auth endpoints (/api/auth/*)
│   │   ├── reports-api.ts                 # Report endpoints (/api/reports/*)
│   │   ├── messages-api.ts                # Message endpoints (/api/messages/*)
│   │   ├── users-api.ts                   # User endpoints (/api/users/*)
│   │   ├── tenants-api.ts                 # Tenant endpoints (/api/tenants/*)
│   │   └── resources-api.ts               # Resource endpoints (/api/resources/*)
│   │
│   ├── auth/
│   │   ├── msal-config.ts                 # MSAL configuration
│   │   ├── auth-provider.tsx              # MSAL React Provider wrapper
│   │   └── auth-utils.ts                  # Token helpers, role checks
│   │
│   ├── store/                             # Zustand stores
│   │   ├── auth-store.ts                  # User, roles, tenant info
│   │   ├── reports-store.ts               # Report list cache
│   │   └── ui-store.ts                    # Sidebar open/close, theme, etc.
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                     # Access current user, roles, logout
│   │   ├── useReports.ts                  # Fetch reports with SWR
│   │   ├── useMessages.ts                 # Fetch messages with real-time updates
│   │   ├── useResources.ts                # Fetch support resources
│   │   └── usePermissions.ts              # Check role-based permissions
│   │
│   ├── types/
│   │   ├── api.ts                         # API response types (mirrors backend DTOs)
│   │   ├── auth.ts                        # User, CurrentUser, LoginResponse
│   │   ├── reports.ts                     # Report, ReportListItem, CreateReport, etc.
│   │   ├── messages.ts                    # Message, CreateMessage
│   │   ├── users.ts                       # UserProfile, StaffMember
│   │   └── tenants.ts                     # Tenant, TenantSettings
│   │
│   ├── validations/
│   │   ├── report-schema.ts               # Zod schemas for report forms
│   │   ├── message-schema.ts
│   │   └── profile-schema.ts
│   │
│   ├── constants/
│   │   ├── roles.ts                       # Role constants (match backend)
│   │   ├── routes.ts                      # App routes
│   │   └── config.ts                      # App configuration
│   │
│   └── utils.ts                           # Utility functions (cn, formatDate, etc.)
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│       ├── hero-background.jpg
│       └── testimonials/
│
├── config/
│   └── site.ts                            # Site metadata, SEO
│
├── middleware.ts                          # Next.js middleware (auth checks)
├── next.config.ts                         # Next.js configuration
├── tsconfig.json                          # TypeScript configuration
├── tailwind.config.ts                     # Tailwind CSS configuration
├── components.json                        # shadcn/ui configuration
├── .env.local                             # Environment variables (NOT committed)
├── .env.example                           # Environment variables template
├── package.json
└── README.md
```

---

## Authentication Flow

### Microsoft Entra ID Integration (MSAL)

**Frontend DOES NOT handle authentication** - it redirects to Microsoft:

```typescript
// lib/auth/msal-config.ts
import { Configuration, PublicClientApplication } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_ENTRA_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_ENTRA_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI, // e.g., https://app.voiceupathletics.com/callback
  },
  cache: {
    cacheLocation: 'sessionStorage', // or 'localStorage'
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
```

### Authentication Flow Steps

```
1. User clicks "Login"
   ↓
2. Frontend calls msalInstance.loginRedirect()
   (redirects to login.microsoftonline.com)
   ↓
3. User authenticates with Entra ID
   (email + password, MFA, social login)
   ↓
4. Entra ID redirects back to /callback with auth code
   ↓
5. MSAL library exchanges code for tokens:
   - id_token (user identity)
   - access_token (for calling our API)
   ↓
6. Frontend stores tokens in sessionStorage
   ↓
7. Frontend calls GET /api/auth/me with Bearer token
   ↓
8. Backend (UserSyncMiddleware):
   - Creates UserProfile if first login
   - Returns CurrentUserDto with:
     * userId, email, name
     * anonymousId, anonymousAlias
     * roles (from Entra ID)
     * tenantId, tenantName
   ↓
9. Frontend stores user in auth store (Zustand)
   ↓
10. Redirect to:
    - /complete-profile if IsProfileComplete = false
    - /dashboard if profile complete
```

### Login Component Example

```typescript
// components/auth/LoginButton.tsx
'use client';

import { useMsal } from '@azure/msal-react';
import { Button } from '@/components/ui/button';

export function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginRedirect({
        scopes: [`api://${process.env.NEXT_PUBLIC_API_CLIENT_ID}/access_as_user`],
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <Button onClick={handleLogin}>Sign In with Microsoft</Button>;
}
```

### Protected Route Example

```typescript
// components/auth/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children, requiredRoles }: {
  children: React.ReactNode;
  requiredRoles?: string[];
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }

    if (!isLoading && isAuthenticated && requiredRoles) {
      const hasRequiredRole = requiredRoles.some(role => user?.roles.includes(role));
      if (!hasRequiredRole) {
        router.push('/dashboard'); // Redirect to default page
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRoles, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or skeleton
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

---

## State Management

### Zustand Stores

**Why Zustand?**
- Lightweight (< 1KB)
- No boilerplate (compared to Redux)
- TypeScript-first
- Works with React Server Components

#### Auth Store

```typescript
// lib/store/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  anonymousId: string;
  anonymousAlias: string;
  roles: string[];
  tenantId: number;
  tenantName: string;
  isProfileComplete: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
      hasRole: (role) => get().user?.roles.includes(role) ?? false,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user, not token
    }
  )
);
```

#### Reports Store (Optional - can also use SWR)

```typescript
// lib/store/reports-store.ts
import { create } from 'zustand';
import { ReportListItem } from '@/lib/types/reports';

interface ReportsState {
  reports: ReportListItem[];
  selectedReport: number | null;
  filters: {
    status?: string;
    category?: string;
    search?: string;
  };

  setReports: (reports: ReportListItem[]) => void;
  selectReport: (id: number) => void;
  updateFilters: (filters: Partial<ReportsState['filters']>) => void;
}

export const useReportsStore = create<ReportsState>((set) => ({
  reports: [],
  selectedReport: null,
  filters: {},

  setReports: (reports) => set({ reports }),
  selectReport: (id) => set({ selectedReport: id }),
  updateFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
```

---

## API Integration

### API Client Base

```typescript
// lib/api/api-client.ts
import { useAuthStore } from '@/lib/store/auth-store';

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.voiceupathletics.com';
  }

  private async getAccessToken(): Promise<string | null> {
    // Get token from MSAL or auth store
    const { accessToken } = useAuthStore.getState();
    return accessToken;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data: T | null; message?: string; errors?: string[] }> {
    const token = await this.getAccessToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(data.message || 'An error occurred', response.status, data.errors);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Network error', 500);
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const result = await this.request<T>(endpoint, { method: 'GET' });
    if (!result.success || !result.data) {
      throw new ApiError(result.message || 'Failed to fetch data', 500, result.errors);
    }
    return result.data;
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const result = await this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!result.success || !result.data) {
      throw new ApiError(result.message || 'Failed to create resource', 400, result.errors);
    }
    return result.data;
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const result = await this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    if (!result.success || !result.data) {
      throw new ApiError(result.message || 'Failed to update resource', 400, result.errors);
    }
    return result.data;
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    const result = await this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    if (!result.success || !result.data) {
      throw new ApiError(result.message || 'Failed to update resource', 400, result.errors);
    }
    return result.data;
  }

  async delete(endpoint: string): Promise<void> {
    await this.request(endpoint, { method: 'DELETE' });
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: string[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = new ApiClient();
```

### Feature-Specific API Modules

```typescript
// lib/api/reports-api.ts
import { apiClient } from './api-client';
import { ReportDto, CreateReportDto, PagedResult, ReportListItem, ReportFilter } from '@/lib/types/reports';

export const reportsApi = {
  // Submit new report (Athlete only)
  createReport: (data: CreateReportDto) =>
    apiClient.post<ReportDto>('/api/reports', data),

  // Get all reports with filters (Staff only)
  getReports: (filter: ReportFilter) =>
    apiClient.get<PagedResult<ReportListItem>>(`/api/reports?${new URLSearchParams(filter as any)}`),

  // Get athlete's own reports
  getMyReports: () =>
    apiClient.get<ReportListItem[]>('/api/reports/my-reports'),

  // Get single report by ID
  getReportById: (id: number) =>
    apiClient.get<ReportDto>(`/api/reports/${id}`),

  // Update report status (Staff only)
  updateStatus: (id: number, status: string, notes?: string) =>
    apiClient.patch<ReportDto>(`/api/reports/${id}/status`, { status, notes }),

  // Assign report to staff member
  assignReport: (id: number, staffUserId: number) =>
    apiClient.patch<ReportDto>(`/api/reports/${id}/assign`, { staffUserId }),

  // Escalate report
  escalateReport: (id: number, reason: string) =>
    apiClient.post<ReportDto>(`/api/reports/${id}/escalate`, { reason }),

  // Delete report (soft delete, Admin only)
  deleteReport: (id: number) =>
    apiClient.delete(`/api/reports/${id}`),
};
```

### Custom Hooks with SWR

```typescript
// lib/hooks/useReports.ts
import useSWR from 'swr';
import { reportsApi } from '@/lib/api/reports-api';
import { useAuthStore } from '@/lib/store/auth-store';

export function useMyReports() {
  const { hasRole } = useAuthStore();
  const isAthlete = hasRole('Athlete');

  return useSWR(
    isAthlete ? '/api/reports/my-reports' : null,
    () => reportsApi.getMyReports(),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );
}

export function useReportDetail(id: number) {
  return useSWR(
    id ? `/api/reports/${id}` : null,
    () => reportsApi.getReportById(id)
  );
}
```

---

## Routing & Navigation

### App Router Structure

```
app/
├── (auth)/          - No layout, just login/callback pages
├── (public)/        - Public marketing site layout
└── (dashboard)/     - Protected dashboard layout with sidebar
```

### Role-Based Navigation

```typescript
// lib/constants/routes.ts
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  CALLBACK: '/callback',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Reports
  REPORTS: '/reports',
  NEW_REPORT: '/reports/new',
  REPORT_DETAIL: (id: number) => `/reports/${id}`,

  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_TENANTS: '/admin/tenants',
  ADMIN_ANALYTICS: '/admin/analytics',

  // SuperAdmin
  SUPERADMIN_TENANTS: '/superadmin/tenants',
} as const;

// Role-based navigation items
export function getNavigationItems(roles: string[]) {
  const items = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'LayoutDashboard', roles: ['Athlete', 'ComplianceStaff', 'Admin', 'SuperAdmin'] },
    { label: 'My Reports', href: ROUTES.REPORTS, icon: 'FileText', roles: ['Athlete'] },
    { label: 'All Reports', href: ROUTES.REPORTS, icon: 'FileText', roles: ['ComplianceStaff', 'Admin', 'SuperAdmin'] },
    { label: 'Resources', href: '/resources', icon: 'BookOpen', roles: ['Athlete', 'ComplianceStaff', 'Admin', 'SuperAdmin'] },
    { label: 'Analytics', href: ROUTES.ADMIN_ANALYTICS, icon: 'BarChart', roles: ['Admin', 'SuperAdmin'] },
    { label: 'Settings', href: ROUTES.ADMIN_TENANTS, icon: 'Settings', roles: ['Admin', 'SuperAdmin'] },
    { label: 'All Tenants', href: ROUTES.SUPERADMIN_TENANTS, icon: 'Building', roles: ['SuperAdmin'] },
  ];

  return items.filter(item => item.roles.some(role => roles.includes(role)));
}
```

### Middleware for Auth Protection

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes (no auth required)
  const publicRoutes = ['/', '/login', '/callback', '/product', '/company', '/legal', '/resources', '/university/request-access'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for auth token (from cookie or sessionStorage)
  const authToken = request.cookies.get('auth-token')?.value;

  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Component Architecture

### Component Categories

1. **Presentation Components**: Pure UI, no business logic
2. **Container Components**: Fetch data, handle state
3. **Layout Components**: Page structure (Sidebar, Navbar, etc.)
4. **Form Components**: Input handling, validation

### Example: Report Card Component

```typescript
// components/reports/ReportCard.tsx
'use client';

import { ReportListItem } from '@/lib/types/reports';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface ReportCardProps {
  report: ReportListItem;
}

export function ReportCard({ report }: ReportCardProps) {
  const severityColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Critical: 'bg-red-100 text-red-800',
  }[report.severityDisplay];

  return (
    <Link href={`/reports/${report.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{report.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Submitted by <span className="font-medium">{report.submittedByAlias}</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge className={severityColor}>
              {report.severityDisplay}
            </Badge>
            <Badge variant="outline">
              {report.statusDisplay}
            </Badge>
            {report.isFlagged && (
              <Badge variant="destructive">Flagged</Badge>
            )}
          </div>
        </div>

        {report.unreadMessageCount > 0 && (
          <div className="mt-3 pt-3 border-t">
            <span className="text-sm font-medium text-blue-600">
              {report.unreadMessageCount} unread message{report.unreadMessageCount > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}
```

---

## Multi-Tenancy

### How It Works

1. **Subdomain Resolution**: `umich.voiceupathletics.com` → Backend resolves to University of Michigan
2. **Backend Handles Isolation**: Frontend doesn't manage TenantId
3. **Branding Per Tenant**: Each university can have custom logo, colors

### Tenant-Specific Branding (Optional Future Feature)

```typescript
// lib/hooks/useTenant.ts
import { useAuthStore } from '@/lib/store/auth-store';
import { useSWR } from 'swr';
import { tenantsApi } from '@/lib/api/tenants-api';

export function useTenant() {
  const { user } = useAuthStore();

  const { data: tenant } = useSWR(
    user ? `/api/tenants/${user.tenantId}` : null,
    () => tenantsApi.getTenantById(user!.tenantId)
  );

  return {
    tenantName: tenant?.name || user?.tenantName || '',
    logoUrl: tenant?.logoUrl,
    primaryColor: tenant?.primaryColor || '#3b82f6',
  };
}
```

---

## Security & Privacy

### Security Best Practices

1. **No Secrets in Code**: Use `.env.local` for API URLs, Entra ID config
2. **HTTPS Only**: Enforce in production
3. **Content Security Policy**: Set CSP headers in `next.config.ts`
4. **Input Sanitization**: Validate all user input (Zod schemas)
5. **XSS Prevention**: React escapes by default, but be careful with `dangerouslySetInnerHTML`
6. **CSRF Protection**: Next.js built-in
7. **Rate Limiting**: Handle 429 errors from backend gracefully

### Privacy (Anonymity)

1. **Never Display Real Names on Reports**: Always show `anonymousAlias`
2. **No PII in URLs**: Use report IDs, not user IDs
3. **Secure Message Threads**: Only report submitter + assigned staff can see messages
4. **Audit Logging**: Log when admin unmasks identity (backend handles this)

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- ✅ Next.js project structure
- ✅ Tailwind CSS + shadcn/ui components
- ⬜ MSAL configuration
- ⬜ API client with interceptors
- ⬜ Auth store (Zustand)
- ⬜ Protected routes + role guards

### Phase 2: Authentication (Week 2-3)
- ⬜ Login page (redirect to Entra ID)
- ⬜ Callback handler
- ⬜ Complete profile page (first login)
- ⬜ Logout functionality
- ⬜ User profile page

### Phase 3: Core Features - Athletes (Week 3-4)
- ⬜ Dashboard (athlete view)
- ⬜ Submit report form
- ⬜ My reports list
- ⬜ Report detail view
- ⬜ Message thread UI

### Phase 4: Core Features - Staff (Week 4-5)
- ⬜ Dashboard (staff view)
- ⬜ All reports list with filters
- ⬜ Report assignment
- ⬜ Status updates
- ⬜ Internal notes
- ⬜ Escalation workflow

### Phase 5: Admin Features (Week 5-6)
- ⬜ User management (view only - Entra ID is source)
- ⬜ Tenant settings
- ⬜ Resource management
- ⬜ Analytics dashboard

### Phase 6: Polish (Week 6-7)
- ⬜ Mobile responsive design
- ⬜ Loading states + skeletons
- ⬜ Error handling + toast notifications
- ⬜ Accessibility improvements
- ⬜ Performance optimization

### Phase 7: Deployment (Week 7-8)
- ⬜ Azure Static Web Apps deployment
- ⬜ Environment configuration
- ⬜ CI/CD pipeline
- ⬜ E2E testing
- ⬜ Production launch

---

## Environment Variables

```bash
# .env.local (NOT committed to git)

# Entra ID (Microsoft Azure AD)
NEXT_PUBLIC_ENTRA_TENANT_ID=<your-entra-tenant-id>
NEXT_PUBLIC_ENTRA_CLIENT_ID=<your-frontend-app-registration-client-id>
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback

# API
NEXT_PUBLIC_API_URL=https://localhost:7001
NEXT_PUBLIC_API_CLIENT_ID=<your-api-app-registration-client-id>

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Summary

### Architecture Highlights
- ✅ **Next.js 16 App Router** with TypeScript
- ✅ **Microsoft Entra ID** for authentication (no custom auth)
- ✅ **Zustand** for state management
- ✅ **Type-safe API client** with interceptors
- ✅ **Role-based access control** (4 roles: Athlete, ComplianceStaff, Admin, SuperAdmin)
- ✅ **Multi-tenant aware** (backend handles isolation)
- ✅ **Anonymity-first** (reports show anonymous aliases)
- ✅ **Mobile-first design** (Tailwind CSS + shadcn/ui)
- ✅ **HIPAA/PHI compliant** (secure communication, audit logging)

### Integration with Backend
- Backend: ASP.NET Core 10 Web API (Azure-hosted)
- Authentication: Entra ID JWT tokens validated by backend
- Multi-Tenancy: Backend auto-filters data by tenant
- Anonymity: Backend generates anonymous aliases
- Real-Time: WebSocket support for messages (future)

### Next Steps
1. Configure MSAL with Entra ID App Registration
2. Implement API client + auth hooks
3. Build core report submission + viewing features
4. Deploy to Azure Static Web Apps
5. Test end-to-end authentication flow

---

**Generated**: 2026-02-08
**Framework**: Next.js 16 / React 19 / TypeScript 5
**Authentication**: Microsoft Entra ID (OAuth 2.0 / OIDC)
**Backend**: ASP.NET Core 10 Web API (see Backend/IMPLEMENTATIONS.md)
