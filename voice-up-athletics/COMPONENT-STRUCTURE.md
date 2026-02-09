# Component Structure - Voice Up Athletics

## 📁 Modern SaaS Component Architecture

Your components are now organized following industry best practices for a production SaaS application.

## Directory Structure

```
components/
├── auth/              # Authentication & Authorization
│   ├── login-button.tsx
│   ├── logout-button.tsx
│   ├── protected-route.tsx
│   ├── user-profile-dropdown.tsx
│   └── index.ts
│
├── reports/           # Report Management
│   ├── report-card.tsx
│   ├── report-filters.tsx
│   ├── report-form.tsx
│   ├── report-status-badge.tsx
│   └── index.ts
│
├── messages/          # Messaging & Communication
│   ├── message-bubble.tsx
│   ├── message-input.tsx
│   ├── message-thread.tsx
│   └── index.ts
│
├── admin/             # Admin-Specific Components
│   ├── stats-card.tsx
│   ├── user-table.tsx
│   └── index.ts
│
├── shared/            # Shared/Common Components
│   ├── loading-spinner.tsx
│   ├── empty-state.tsx
│   ├── error-message.tsx
│   ├── page-header.tsx
│   ├── pagination.tsx
│   └── index.ts
│
├── ui/                # Base UI Components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   ├── badge.tsx
│   ├── dialog.tsx
│   ├── avatar.tsx
│   └── dropdown-menu.tsx
│
├── dashboard/         # Dashboard Components (Your Existing)
│   ├── category-metrics.tsx
│   ├── main-page.tsx
│   ├── messages-metrics.tsx
│   ├── metrics.tsx
│   └── team-metrics.tsx
│
├── landing/           # Landing Page Components (Your Existing)
│   ├── hero.tsx
│   ├── featured-section.tsx
│   ├── pricing.tsx
│   └── ...
│
├── layout/            # Layout Components (Your Existing)
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   ├── footer.tsx
│   └── ...
│
└── forms/             # Form Components (Your Existing)
    ├── contact-form.tsx
    ├── login-form.tsx
    └── register-form.tsx
```

---

## 🎯 Component Categories

### 1. Auth Components (`/auth`)
**Purpose**: Handle authentication, authorization, and user profile display

- **LoginButton** - Triggers MSAL login flow
- **LogoutButton** - Handles logout and token cleanup
- **ProtectedRoute** - Wraps pages requiring authentication
- **UserProfileDropdown** - User menu with profile and actions

**Usage**:
```tsx
import { LoginButton, ProtectedRoute, UserProfileDropdown } from '@/components/auth';

// In a page
<ProtectedRoute requiredRoles={['Admin', 'ComplianceStaff']}>
  <YourProtectedContent />
</ProtectedRoute>
```

### 2. Report Components (`/reports`)
**Purpose**: Display, create, and manage reports

- **ReportCard** - Display report summary in list view
- **ReportFilters** - Filter reports by status/category/severity
- **ReportForm** - Create new report with validation
- **ReportStatusBadge** - Colored badge for report status

**Usage**:
```tsx
import { ReportCard, ReportFilters, ReportForm } from '@/components/reports';

// Display reports
{reports.map(report => (
  <ReportCard key={report.id} report={report} />
))}
```

### 3. Message Components (`/messages`)
**Purpose**: Real-time messaging on reports

- **MessageThread** - Complete message view with polling
- **MessageBubble** - Individual message display
- **MessageInput** - Send messages with internal note option

**Usage**:
```tsx
import { MessageThread } from '@/components/messages';

<MessageThread reportId={reportId} />
```

### 4. Admin Components (`/admin`)
**Purpose**: Admin dashboard and management

- **StatsCard** - Display metrics with icons and trends
- **UserTable** - Manage users with actions

**Usage**:
```tsx
import { StatsCard, UserTable } from '@/components/admin';

<StatsCard
  title="Total Reports"
  value={245}
  icon={FileText}
  trend={{ value: 12, isPositive: true }}
/>
```

### 5. Shared Components (`/shared`)
**Purpose**: Reusable components across the app

- **LoadingSpinner** - Consistent loading states
- **EmptyState** - Empty list states with actions
- **ErrorMessage** - Error display with retry
- **PageHeader** - Page titles with actions
- **Pagination** - Pagination controls

**Usage**:
```tsx
import { LoadingSpinner, EmptyState, PageHeader } from '@/components/shared';

<PageHeader
  title="Reports"
  description="Manage all reports"
  action={<Button>New Report</Button>}
/>
```

### 6. UI Components (`/ui`)
**Purpose**: Base UI components (shadcn/ui style)

All styled with Tailwind and consistent with your design system:
- Input, Textarea, Label
- Select, Dropdown Menu
- Button, Badge, Card
- Dialog, Avatar

**Usage**:
```tsx
import { Button, Card, Input, Select } from '@/components/ui';
```

---

## 🚀 Usage Patterns

### Client Components
Components that use hooks, state, or browser APIs:
```tsx
'use client';

import { useAuth } from '@/lib/hooks/use-auth';
```

### Server Components
Components that fetch data or don't need interactivity:
```tsx
// No 'use client' directive
// Can use server actions directly
```

### With Server Actions
```tsx
'use client';

import { createReportAction } from '@/app/actions/reports';

const handleSubmit = async (data) => {
  const result = await createReportAction(data);
  if (result.success) {
    // Handle success
  }
};
```

---

## 📦 Import Examples

### Barrel Exports (Recommended)
```tsx
// Import multiple components from one category
import { LoginButton, ProtectedRoute } from '@/components/auth';
import { ReportCard, ReportForm } from '@/components/reports';
import { LoadingSpinner, EmptyState } from '@/components/shared';
```

### Direct Imports
```tsx
// Import specific component
import { Button } from '@/components/ui/button';
import { MessageThread } from '@/components/messages/message-thread';
```

---

## 🎨 Design Principles

1. **Consistency**: All components use the same UI library (shadcn/ui)
2. **Accessibility**: Proper ARIA labels and keyboard navigation
3. **Responsive**: Mobile-first design with Tailwind
4. **Type-Safe**: Full TypeScript coverage
5. **Composable**: Small, reusable components
6. **Performance**: Client components only when needed

---

## 🛠️ Next Steps

### Pages to Build Using These Components:

1. **Complete Profile Page** (`/app/complete-profile/page.tsx`)
   - Use: Input, Label, Button, Card

2. **Dashboard** (`/app/dashboard/page.tsx`)
   - Use: ProtectedRoute, StatsCard, ReportCard, PageHeader

3. **Reports List** (`/app/reports/page.tsx`)
   - Use: ReportCard, ReportFilters, EmptyState, Pagination

4. **New Report** (`/app/reports/new/page.tsx`)
   - Use: ReportForm, PageHeader

5. **Report Detail** (`/app/reports/[id]/page.tsx`)
   - Use: ReportStatusBadge, MessageThread, Card

6. **Admin Users** (`/app/admin/users/page.tsx`)
   - Use: UserTable, PageHeader, ProtectedRoute

---

**Updated**: 2026-02-08
**Status**: Production-ready component library complete
**Total Components**: 30+
