# VoiceUp Athletics - Application Structure
## Production-Ready University SaaS Platform (CORRECTED VERSION)

---

## 🎯 Core Principles

- **No public user signup** - Universities provision all users
- **Account activation required** - Users activate via secure token
- **Mental health first** - Confidentiality & anonymity built-in (FERPA compliant)
- **University-scoped** - Multi-tenant architecture with strict data isolation
- **Role-based access** - 4 roles: Platform Admin, University Admin, Counselor, Athlete

---

## 🔐 USER ROLES (CRITICAL - READ THIS FIRST)

### Role Hierarchy
```
1. platform_admin    - System-level admins (YOU - approve universities)
2. university_admin  - Per-university admins (manage their users/teams)
3. counselor         - Mental health professionals
4. athlete           - Student-athletes
```

**⚠️ IMPORTANT:** Do NOT confuse `platform_admin` with `university_admin`

- **Platform Admin** = Approves university requests, sees ALL universities
- **University Admin** = Manages ONLY their university's users/teams

---

## 🌐 PUBLIC PAGES (No Authentication)

### `/` - Landing Page
**Purpose:** Marketing & trust-building

**Content:**
- What VoiceUp Athletics does
- Who it's for (student-athletes & universities)
- Mental health confidentiality messaging
- Trust signals (HIPAA, FERPA, security, testimonials)

**CTAs:**
- "Request University Access" → `/university/request-access`
- "Platform Login" → `/auth/login` (for platform admins)
- "Get Started" → `/auth/login`

**Sections (with IDs for smooth scroll):**
- `#hero` - Main value proposition
- `#challenge` - The problem we solve
- `#features` - Key features
- `#how-it-works` - Process explanation
- `#testimonials` - Student athlete testimonials
- `#faq` - Common questions
- `#pricing` - University plans

---

### `/university/request-access` - University Registration
**Purpose:** Sales intake (NOT user signup)

**Form Fields:**
- University Name
- Athletic Department Contact Name
- Contact Email
- Phone Number
- Number of Teams
- Estimated Number of Athletes
- Message / Specific Needs

**Security:**
- **MUST have rate limiting** (prevent spam)
- **MUST validate email domain** (prevent fake submissions)
- **OPTIONAL: Add CAPTCHA** for production

**Action:**
- Saves to `university_requests` table
- Status: 'pending'
- Platform admin reviews in dashboard
- No account created automatically

**Success State:**
- "Thank you! We'll contact you within 24 hours"
- (Optional) Email confirmation sent

---

### `/auth/login` - Universal Login
**Purpose:** Single login for ALL users (Platform Admins, University Admins, Counselors, Athletes)

**Form Fields:**
- Email
- Password

**Links:**
- "First time here? Activate your account" → `/auth/activate`
- "Forgot password?" → `/auth/forgot-password`

**Behavior:**
- After login → Role-based redirect:
  - **Platform Admin** → `/platform-admin/requests`
  - **University Admin** → `/admin/users`
  - **Counselor** → `/counselor/conversations`
  - **Athlete** → `/athlete/messages`

---

### `/auth/activate` - Account Activation
**Purpose:** First-time user account setup (replaces signup)

**Entry Methods:**
1. **Via Email Link (Preferred)**
   - User clicks link from email
   - Token auto-populated from URL
   - User just sets password

2. **Via Temp Credentials** (Fallback)
   - Temp ID (provided by university)
   - Temp Password (provided by university)
   - User enters both

**Form Fields:**
- New Password
- Confirm Password
- (Optional) Anonymous Display Name (for Athletes only)

**Security Rules:**
- Token is one-time use (flag: `used = true` after activation)
- Token expires in 7 days
- Token is hashed with SHA-256 (NOT bcrypt - tokens don't need slow hashing)
- Password must meet requirements (min 8 chars, uppercase, number, special)
- Must change password (temp password disabled after first use)
- After activation → Redirect to `/dashboard`

**Implementation Detail:**
```typescript
// Generate token
const rawToken = crypto.randomBytes(32).toString('hex');
const tokenHash = sha256(rawToken);

// Store only the hash
await db.activationTokens.create({
  tokenHash,
  userId,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});

// Send rawToken in email, NEVER store it
```

---

### `/auth/forgot-password`
**Purpose:** Password reset flow

**Steps:**
1. Enter email
2. Receive reset link via email
3. Click link → `/auth/reset-password?token=xxx`
4. Enter new password
5. Redirect to login

---

## 🔒 AUTHENTICATED PAGES

### `/dashboard` - Role-Based Landing
**Purpose:** Smart redirect based on user role

**Behavior:**
- **Platform Admin** → `/platform-admin/requests`
- **University Admin** → `/admin/users`
- **Counselor** → `/counselor/conversations`
- **Athlete** → `/athlete/messages`

**Middleware:**
- Checks user role claim from JWT
- Redirects appropriately
- No actual UI on this page

---

## 🛠️ PLATFORM ADMIN PORTAL (System-Level)

### Role: `platform_admin`
**Access Level:** HIGHEST - Can see/manage ALL universities

### `/platform-admin/requests`
**Purpose:** Review and approve/reject university access requests

**Features:**
- View all pending/approved/rejected requests
- See university details (name, contact, plan, teams, athletes)
- **Approve** → Auto-creates university + admin user + activation token
- **Reject** → Requires reason
- Filter by status, date, plan
- Search by university name or email

**Security:**
- **MUST prevent double-approval** (idempotency)
- **MUST use database transaction** for approve flow
- Audit log all approve/reject actions

---

### `/platform-admin/universities`
**Purpose:** Manage all provisioned universities

**Features:**
- List all universities
- View trial expiration dates
- Update payment status (unpaid/paid/overdue)
- Suspend/unsuspend universities
- View usage metrics per university

---

## 👤 ATHLETE PORTAL

### Role: `athlete`
**Access Level:** Lowest - Only their own data

### `/athlete/messages`
**Purpose:** Anonymous messaging with counselors

**Features:**
- Start new conversation
- View active conversations
- **Completely anonymous** (no real name shown to counselors)
- Uses anonymous display name
- Read/unread indicators
- Timestamp on messages

**Privacy:**
- Counselors NEVER see athlete real names
- All conversations encrypted in database
- Audit logged for compliance

---

### `/athlete/resources`
**Purpose:** Mental health resources library

**Content:**
- Articles on mental health
- Coping strategies
- Crisis hotlines
- Video resources
- Self-assessment tools
- University-specific resources

**Categories:**
- Anxiety & Stress
- Depression
- Performance Pressure
- Sleep & Wellness
- Crisis Support
- General Mental Health

---

### `/athlete/profile`
**Purpose:** Manage account & preferences

**Editable Fields:**
- Anonymous Display Name
- Email (view only - contact admin to change)
- Password (change)
- Notification Preferences
- University (view only)
- Team (view only)

**Actions:**
- Change Password
- Update Display Name
- Manage Notifications
- View Privacy Policy
- Logout

---

## 🧠 COUNSELOR PORTAL

### Role: `counselor`
**Access Level:** Medium - Assigned conversations only (university-scoped)

### `/counselor/conversations`
**Purpose:** Manage athlete conversations

**Features:**
- View all assigned conversations (within their university)
- Respond to messages
- Flag urgent conversations
- Mark conversations as resolved
- See anonymous athlete IDs only (no real names)
- Filter: Active / Resolved / Urgent

**Privacy Rules:**
- Cannot see athlete real names
- Cannot see athlete contact info
- All access logged for audit (FERPA compliance)

---

### `/counselor/availability`
**Purpose:** Set working hours & availability

**Features:**
- Set available hours
- Mark out of office
- Auto-response when unavailable
- Vacation mode

---

### `/counselor/notes` (Private)
**Purpose:** Private clinical notes (NOT visible to athletes or admins)

**Features:**
- Add private notes per conversation
- Strictly confidential
- Encrypted storage
- Audit logged (who accessed when)

**Security:**
- Access logged
- Append-only (cannot be deleted)
- University admin CANNOT view (privacy protected)

---

## 🏫 UNIVERSITY ADMIN PORTAL

### Role: `university_admin`
**Access Level:** High - Full access to THEIR university only (scoped by `university_id`)

### `/admin/users`
**Purpose:** Manage all users in their university

**Features:**
- View all users (Athletes, Counselors, Other Admins)
- Upload CSV of new users
- Manually add individual users
- Resend activation emails
- Suspend/Unsuspend users
- Change user roles
- View user status (pending_activation / active / suspended)

**Bulk Actions:**
- Upload CSV (Name, Email, Role, Team)
- Bulk send activation emails
- Bulk suspend users

**User Table Columns:**
- Name
- Email
- Role
- Team (for athletes)
- Status
- Last Login
- Actions (Edit, Suspend, Resend Activation)

---

### `/admin/teams`
**Purpose:** Manage athletic teams

**Features:**
- Create new teams
- Edit team details
- Assign athletes to teams
- View team roster
- Archive teams

---

### `/admin/imports`
**Purpose:** Bulk user import history & management

**Features:**
- View past imports
- Download import templates
- Re-import failed rows
- Validation error reports

**CSV Template:**
```
FirstName, LastName, Email, Role, Team
John, Doe, john@stanford.edu, athlete, Football
Jane, Smith, jane@stanford.edu, counselor,
```

---

### `/admin/settings`
**Purpose:** University-wide settings

**Features:**
- University branding (logo, colors)
- Custom welcome message
- Resource library customization
- Notification templates
- Subscription & billing info (view only)

---

## 🧱 BACKEND CONCEPTS (No UI)

### User Status Enum (Use TypeScript enum)
```typescript
enum UserStatus {
  PENDING_ACTIVATION = 'pending_activation',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted'
}
```

### Request Status Enum
```typescript
enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}
```

### Payment Status Enum
```typescript
enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  OVERDUE = 'overdue'
}
```

### Authentication Flow
1. User logs in with email + password
2. Backend validates credentials
3. JWT issued with claims:
   - `id` (user ID)
   - `university_id` (NULL for platform_admin)
   - `role` (platform_admin / university_admin / counselor / athlete)
   - `status`
   - `email`
4. Frontend stores JWT in httpOnly cookie with SameSite=Strict (NOT localStorage)
5. Middleware checks role on each protected route
6. Token expires after 24 hours (refresh required)

### API Response Standards
All API responses follow this format:

**Success Response:**
```typescript
{
  success: true,
  data: { /* response data */ },
  message?: string // Optional success message
}
```

**Error Response:**
```typescript
{
  success: false,
  error: {
    code: string,        // Machine-readable error code (e.g., 'DUPLICATE_EMAIL')
    message: string,     // Human-readable error message
    field?: string,      // Field that caused the error (for form validation)
    details?: any        // Additional error context
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED` - Not authenticated
- `FORBIDDEN` - Authenticated but insufficient permissions
- `NOT_FOUND` - Resource not found
- `DUPLICATE_EMAIL` - Email already exists
- `DUPLICATE_UNIVERSITY` - University name already exists
- `VALIDATION_ERROR` - Input validation failed
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INVALID_TOKEN` - Token expired or invalid
- `ALREADY_PROCESSED` - Request already approved/rejected

### Activation Token System
- Generated when admin creates user
- **One-time use** (flag: `used = true`)
- Expires in 7 days
- Hashed with **SHA-256** (not bcrypt - tokens don't need slow hashing)
- Includes: `user_id`, `university_id`, `expires_at`
- **Validation must check:** token exists, not used, not expired
- Raw token sent via email, only hash stored in database

### University Scoping (Multi-Tenancy)
- Every user belongs to ONE university (except platform_admin)
- All queries MUST be scoped by `university_id`
- Prevents cross-university data leaks
- Middleware enforces scoping automatically

### Rate Limiting Strategy
**Public Endpoints:**
- `/api/university/request-access`: 10 requests/hour per IP
- `/api/auth/login`: 5 attempts/15 minutes per IP
- `/api/auth/forgot-password`: 3 requests/hour per email

**Authenticated Endpoints:**
- 100 requests/minute per user for read operations
- 30 requests/minute per user for write operations

**Implementation:** Use `@vercel/edge-limiter` or Redis-based solution

### Database Connection Pooling
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Connection pool settings (set in DATABASE_URL):
// ?connection_limit=10&pool_timeout=20
```

### CORS Configuration
```typescript
// For API routes that might be called from external tools
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'https://yourdomain.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};
```

---

## 📊 DATABASE SCHEMA (Corrected with Constraints)

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  university_id VARCHAR(36), -- NULL for platform_admin
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255), -- NULL when status = 'pending_activation'
  role VARCHAR(50) NOT NULL CHECK (role IN ('platform_admin', 'university_admin', 'counselor', 'athlete')),
  status VARCHAR(50) DEFAULT 'pending_activation' CHECK (status IN ('pending_activation', 'active', 'suspended', 'deleted')),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  anonymous_display_name VARCHAR(255), -- For athletes only
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  deleted_at TIMESTAMP, -- For soft deletes

  FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE,
  INDEX idx_university_id (university_id),
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status),

  -- Constraint: password_hash can only be NULL when status is pending_activation
  CONSTRAINT chk_password_required CHECK (
    (status = 'pending_activation' AND password_hash IS NULL) OR
    (status != 'pending_activation' AND password_hash IS NOT NULL)
  )
);
```

### Universities Table
```sql
CREATE TABLE universities (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE, -- URL-safe identifier (e.g., 'stanford', 'ucla')
  contact_email VARCHAR(255) NOT NULL,
  plan VARCHAR(50) NOT NULL CHECK (plan IN ('per-team', 'university-wide', 'enterprise')),
  status VARCHAR(50) DEFAULT 'trial' CHECK (status IN ('trial', 'active', 'suspended', 'cancelled')),
  payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'overdue')),
  trial_ends_at TIMESTAMP NOT NULL,
  subscription_starts_at TIMESTAMP,
  logo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP, -- For soft deletes
  created_from_request_id VARCHAR(36) UNIQUE, -- Prevents duplicate provisioning

  FOREIGN KEY (created_from_request_id) REFERENCES university_requests(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_payment_status (payment_status),
  INDEX idx_name (name),

  -- Unique constraint on lowercase name to prevent duplicates
  UNIQUE INDEX idx_universities_name_unique (LOWER(name))
);
```

### UniversityRequests Table
```sql
CREATE TABLE university_requests (
  id VARCHAR(36) PRIMARY KEY,
  university_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, -- Prevents duplicate requests
  phone VARCHAR(50) NOT NULL,
  num_teams INT NOT NULL CHECK (num_teams > 0),
  num_athletes INT NOT NULL CHECK (num_athletes > 0),
  selected_plan VARCHAR(50) NOT NULL CHECK (selected_plan IN ('per-team', 'university-wide', 'enterprise')),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by VARCHAR(36), -- id of platform_admin
  rejection_reason TEXT,

  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_email (email),
  INDEX idx_university_name (university_name)
);
```

### ActivationTokens Table
```sql
CREATE TABLE activation_tokens (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  university_id VARCHAR(36), -- For easier auditing
  token_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 hash
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE,
  INDEX idx_token_hash (token_hash),
  INDEX idx_user_id (user_id),
  INDEX idx_university_id (university_id),
  INDEX idx_expires_at (expires_at)
);
```

### AdminActions Table (Audit Log)
```sql
CREATE TABLE admin_actions (
  id VARCHAR(36) PRIMARY KEY,
  admin_id VARCHAR(36) NOT NULL,
  action VARCHAR(100) NOT NULL, -- 'approve_request', 'reject_request', 'suspend_user', etc.
  entity_type VARCHAR(50), -- 'university_request', 'user', 'university'
  entity_id VARCHAR(36),
  details JSON, -- Additional context
  ip_address VARCHAR(45), -- IPv4 or IPv6
  user_agent TEXT, -- Browser/client info
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_admin_id (admin_id),
  INDEX idx_action (action),
  INDEX idx_entity_type (entity_type),
  INDEX idx_created_at (created_at)
);
```

---

## 🔐 MIDDLEWARE LOGIC (Fixed)

### File: `middleware.ts` (Root Level)
**Location:** `middleware.ts` (at root, NOT inside app/)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth_token')?.value;

  // Parse JWT to get user info (or use session lookup)
  const { isAuthenticated, userRole, userId } = verifyToken(token);

  // Helper to check if path matches route prefix exactly
  const isProtectedRoute = (prefix: string) => {
    return path === prefix || path.startsWith(`${prefix}/`);
  };

  // Protect platform admin routes
  if (isProtectedRoute('/platform-admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (userRole !== 'platform_admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Protect university admin routes
  if (isProtectedRoute('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (userRole !== 'university_admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Protect counselor routes
  if (isProtectedRoute('/counselor')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (userRole !== 'counselor') {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Protect athlete routes
  if (isProtectedRoute('/athlete')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (userRole !== 'athlete') {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/platform-admin/:path*',
    '/admin/:path*',
    '/counselor/:path*',
    '/athlete/:path*',
    '/dashboard/:path*'
  ]
};
```

---

## 🗂️ NEXT.JS ROUTING STRUCTURE (Updated)

```
voice-up-athletics/
├── middleware.ts                         # ⚠️ ROOT LEVEL - Auth + role middleware
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx                      # Landing page (/)
│   │   ├── layout.tsx                    # Public layout (Navbar + Footer)
│   │   └── university/
│   │       └── request-access/
│   │           └── page.tsx              # University registration
│   │
│   ├── (auth)/
│   │   ├── layout.tsx                    # Auth layout (minimal)
│   │   └── auth/
│   │       ├── login/
│   │       │   └── page.tsx              # Login page
│   │       ├── activate/
│   │       │   └── page.tsx              # Account activation
│   │       ├── forgot-password/
│   │       │   └── page.tsx              # Forgot password
│   │       └── reset-password/
│   │           └── page.tsx              # Reset password
│   │
│   ├── api/                              # API Routes
│   │   ├── university/
│   │   │   └── request-access/
│   │   │       └── route.ts              # POST - Submit university request
│   │   │
│   │   ├── platform-admin/
│   │   │   ├── requests/
│   │   │   │   ├── route.ts              # GET - List all requests
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts          # GET - Single request details
│   │   │   │       ├── approve/
│   │   │   │       │   └── route.ts      # POST - Approve request (TRANSACTION)
│   │   │   │       └── reject/
│   │   │   │           └── route.ts      # POST - Reject request
│   │   │   │
│   │   │   └── universities/
│   │   │       ├── route.ts              # GET - List all universities
│   │   │       └── [id]/
│   │   │           ├── route.ts          # GET/PATCH - University details
│   │   │           └── payment-status/
│   │   │               └── route.ts      # PATCH - Update payment status
│   │   │
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts              # POST - User login
│   │   │   ├── logout/
│   │   │   │   └── route.ts              # POST - User logout
│   │   │   ├── activate/
│   │   │   │   └── route.ts              # POST - Activate account with token
│   │   │   ├── forgot-password/
│   │   │   │   └── route.ts              # POST - Request password reset
│   │   │   └── reset-password/
│   │   │       └── route.ts              # POST - Reset password with token
│   │   │
│   │   └── admin/
│   │       └── users/
│   │           ├── route.ts              # GET/POST - List/Create users
│   │           └── [id]/
│   │               └── route.ts          # GET/PATCH/DELETE - User management
│   │
│   ├── dashboard/
│   │   └── page.tsx                      # Role-based redirect
│   │
│   ├── platform-admin/                   # System admin portal
│   │   ├── layout.tsx
│   │   ├── requests/
│   │   │   ├── page.tsx                  # List all requests
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Request detail
│   │   └── universities/
│   │       ├── page.tsx                  # Manage all universities
│   │       └── [id]/
│   │           └── page.tsx              # University detail
│   │
│   ├── admin/                            # University admin portal
│   │   ├── layout.tsx
│   │   ├── users/
│   │   │   ├── page.tsx                  # User management
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Edit user
│   │   ├── teams/
│   │   │   ├── page.tsx                  # Team management
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Team detail
│   │   ├── imports/
│   │   │   └── page.tsx                  # CSV import history
│   │   └── settings/
│   │       └── page.tsx                  # University settings
│   │
│   ├── athlete/
│   │   ├── layout.tsx
│   │   ├── messages/
│   │   │   ├── page.tsx                  # Message list
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Conversation detail
│   │   ├── resources/
│   │   │   ├── page.tsx                  # Resource library
│   │   │   └── [id]/
│   │   │       └── page.tsx              # Resource detail
│   │   └── profile/
│   │       └── page.tsx                  # Profile management
│   │
│   └── counselor/
│       ├── layout.tsx
│       ├── conversations/
│       │   ├── page.tsx                  # Conversation list
│       │   └── [id]/
│       │       └── page.tsx              # Conversation detail
│       ├── availability/
│       │   └── page.tsx                  # Availability settings
│       └── notes/
│           └── page.tsx                  # Private notes
│
├── lib/
│   ├── db.ts                             # Database client (Prisma)
│   ├── auth.ts                           # Auth utilities
│   ├── rate-limit.ts                     # Rate limiting middleware
│   └── email.ts                          # Email service
│
└── components/
    ├── ui/                               # shadcn/ui components
    └── ...                               # Other components
```

---

## 🚀 IMPLEMENTATION PHASES

### Phase 1: Foundation ✅
- [x] Next.js app structure with route groups
- [x] Public landing page with sections
- [x] Navbar with smooth scroll
- [x] Footer component
- [x] Color palette (CSS variables)
- [x] Basic layouts

### Phase 2: Authentication & Approval Flow
- [ ] Database setup (Prisma + Supabase)
- [ ] POST `/api/university/request-access` (with rate limiting)
- [ ] GET `/api/platform-admin/requests`
- [ ] POST `/api/platform-admin/requests/[id]/approve` (WITH TRANSACTION)
- [ ] Platform admin dashboard UI
- [ ] Login page
- [ ] Activation page

### Phase 3: University Admin Portal
- [ ] User management page
- [ ] CSV import functionality
- [ ] Team management
- [ ] Settings page

### Phase 4: Athlete Portal
- [ ] Messages page (anonymous)
- [ ] Resources library
- [ ] Profile management

### Phase 5: Counselor Portal
- [ ] Conversations management
- [ ] Availability settings
- [ ] Private notes system

### Phase 6: Security & Polish
- [ ] Rate limiting on public endpoints
- [ ] Audit logging for all admin actions
- [ ] Transaction wrapping for critical flows
- [ ] FERPA compliance review
- [ ] Password strength enforcement
- [ ] Token security hardening

---

## ✅ WHY THIS ARCHITECTURE WORKS

### 1. **Enterprise SaaS Pattern**
- Multi-tenant by design
- University-scoped data isolation
- Role-based access control (4 distinct roles)
- Audit logging for compliance

### 2. **University Procurement Ready**
- No self-signup (controlled provisioning)
- Platform admin approves all universities
- Bulk import via CSV
- Trial period management

### 3. **Mental Health Confidentiality (FERPA/HIPAA-Aware)**
- Anonymous athlete identities
- Encrypted messages
- Counselor notes are private
- Audit logging for all data access
- University-scoped data (no cross-contamination)

### 4. **Security First**
- SHA-256 token hashing
- httpOnly cookies (not localStorage)
- Database transactions for critical operations
- Rate limiting on public endpoints
- Idempotency protection
- Role separation (platform vs university admin)

### 5. **Capstone-Level Quality**
- Demonstrates real-world SaaS architecture
- Shows understanding of multi-tenancy
- Security best practices
- Audit compliance
- Scalable design

---

## 🎓 CAPSTONE PRESENTATION TALKING POINTS

### "Why did you separate platform_admin and university_admin?"

> "In real SaaS systems, you need system-level admins who manage the platform itself, and customer-level admins who manage their own organization. Mixing these roles would be a security risk—a Stanford admin shouldn't be able to approve UCLA's request."

### "How do you ensure data isolation?"

> "Every query is scoped by university_id in the WHERE clause. The database foreign keys enforce referential integrity, and middleware checks ensure users can only access their own university's data."

### "Why manual payment tracking instead of Stripe?"

> "Universities don't pay with credit cards—they use Purchase Orders and wire transfers. The payment cycle can take 30-60 days. Manual tracking reflects real-world B2B SaaS sales."

### "How do you handle security for mental health data?"

> "Athletes are completely anonymous—counselors never see real names. All conversations are encrypted in the database. Access is audit-logged for FERPA compliance. Counselor notes are private and append-only."

---

## 📞 NEXT STEPS

1. ✅ Landing page (DONE)
2. ✅ Request access form (DONE)
3. 🔄 Set up Supabase database
4. 🔄 Create Prisma schema
5. 🔄 Build POST `/api/university/request-access`
6. 🔄 Build platform admin dashboard
7. 🔄 Build approve endpoint (WITH TRANSACTION)
8. 🔄 Test full flow

---

**This architecture is production-ready and demonstrates enterprise-level thinking.** 🚀
