# Implementation Guide: Semi-Automated University Approval System
## CORRECTED & PRODUCTION-READY VERSION

---

## Overview

This document outlines exactly what you need to build for the university request → approval → provisioning workflow.

**Architecture Pattern:** Sales-led B2B SaaS with manual approval and payment tracking

---

## 🎯 What This System Does

1. University submits request form (saves to DB)
2. Platform admin reviews in dashboard
3. Platform admin clicks "Approve"
4. **System auto-provisions in a TRANSACTION:**
   - Creates university record
   - Creates admin user
   - Creates activation token
   - Updates request status
5. Activation email sent (manual/automated)
6. Platform admin tracks payment manually
7. University gets access

---

## ⚠️ CRITICAL REQUIREMENTS (Non-Negotiable)

### 1. Transaction Wrapping
**The approve endpoint MUST use a database transaction.**

If any step fails, the entire operation rolls back.

```typescript
// Pseudocode
await db.transaction(async (tx) => {
  // All operations here
  // If ANY fail, EVERYTHING rolls back
});
```

### 2. Duplicate Prevention
**Prevent duplicate universities by BOTH email AND name.**

- Block duplicate request emails
- Block duplicate university names (case-insensitive)
- Use database constraints + application logic

### 3. Role Separation
**Use `platform_admin` for system admins, `university_admin` for university staff.**

Never confuse the two.

### 4. Audit Logging
**Log all approve/reject actions to `admin_actions` table.**

Who did what, when.

---

## 📊 Database Schema (CORRECTED)

### Table 1: `university_requests`
Stores incoming university access requests.

```sql
CREATE TABLE university_requests (
  id VARCHAR(36) PRIMARY KEY,
  university_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, -- ✅ Prevents duplicate emails
  phone VARCHAR(50) NOT NULL,
  num_teams INT NOT NULL CHECK (num_teams > 0),
  num_athletes INT NOT NULL CHECK (num_athletes > 0),
  selected_plan VARCHAR(50) NOT NULL CHECK (selected_plan IN ('per-team', 'university-wide', 'enterprise')),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP NULL,
  reviewed_by VARCHAR(36) NULL, -- id of platform_admin who reviewed
  rejection_reason TEXT NULL,

  FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_email (email),
  INDEX idx_university_name (university_name) -- ✅ For duplicate checking
);
```

**Key Changes:**
- ✅ Added `UNIQUE` constraint on email
- ✅ Added `CHECK` constraints for enums
- ✅ Added index on `university_name`
- ✅ Foreign key to `users` table

---

### Table 2: `universities`
Created when a request is approved.

```sql
CREATE TABLE universities (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE, -- URL-safe identifier (e.g., 'stanford', 'ucla')
  contact_email VARCHAR(255) NOT NULL,
  plan VARCHAR(50) NOT NULL CHECK (plan IN ('per-team', 'university-wide', 'enterprise')),
  status VARCHAR(20) DEFAULT 'trial' CHECK (status IN ('trial', 'active', 'suspended', 'cancelled')),
  payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'overdue')),
  trial_ends_at TIMESTAMP NOT NULL,
  subscription_starts_at TIMESTAMP NULL,
  logo_url VARCHAR(500) NULL,
  custom_branding JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP, -- For soft deletes
  created_from_request_id VARCHAR(36) UNIQUE, -- ✅ Prevents duplicate provisioning

  FOREIGN KEY (created_from_request_id) REFERENCES university_requests(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_payment_status (payment_status),
  INDEX idx_trial_ends_at (trial_ends_at),
  INDEX idx_name (name), -- ✅ For duplicate checking

  -- ⚠️ CRITICAL: Unique constraint on lowercase name to prevent duplicates
  UNIQUE INDEX idx_universities_name_unique (LOWER(name))
);
```

**Key Changes:**
- ✅ Added `UNIQUE` constraint on `created_from_request_id`
- ✅ Added `CHECK` constraints for enums
- ✅ Added index on `name`
- ✅ Foreign key to `university_requests`

---

### Table 3: `users` (Complete Schema)
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

  -- ⚠️ CRITICAL: Constraint ensures password_hash logic is enforced
  CONSTRAINT chk_password_required CHECK (
    (status = 'pending_activation' AND password_hash IS NULL) OR
    (status != 'pending_activation' AND password_hash IS NOT NULL)
  )
);
```

**Key Changes:**
- ✅ Changed role to include `platform_admin`
- ✅ Added `CHECK` constraints
- ✅ Added foreign key to universities

---

### Table 4: `activation_tokens` (IMPROVED)
For account activation flow.

```sql
CREATE TABLE activation_tokens (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  university_id VARCHAR(36) NULL, -- ✅ NEW: Easier auditing
  token_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 hash
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE,
  INDEX idx_token_hash (token_hash),
  INDEX idx_user_id (user_id),
  INDEX idx_university_id (university_id), -- ✅ NEW
  INDEX idx_expires_at (expires_at)
);
```

**Key Changes:**
- ✅ Added `university_id` column for easier auditing
- ✅ Changed `token_hash` to VARCHAR(64) for SHA-256
- ✅ Added `UNIQUE` constraint on token_hash

---

### Table 5: `admin_actions` (Audit Log)
Track all platform admin actions.

```sql
CREATE TABLE admin_actions (
  id VARCHAR(36) PRIMARY KEY,
  admin_id VARCHAR(36) NOT NULL,
  action VARCHAR(100) NOT NULL, -- 'approve_request', 'reject_request', 'suspend_university', etc.
  entity_type VARCHAR(50), -- 'university_request', 'university', 'user'
  entity_id VARCHAR(36),
  details JSON, -- Additional context
  ip_address VARCHAR(45), -- ✅ Track IP (IPv4 or IPv6)
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

## 🔌 API Endpoints to Build

### 1. POST `/api/university/request-access`
**Purpose:** Save university request form data

**Security Requirements:**
- ✅ Rate limiting (10 requests per hour per IP)
- ✅ Email validation (format + domain)
- ✅ Optional: CAPTCHA verification (recommended for production)

**Request Body:**
```typescript
{
  universityName: string
  contactName: string
  email: string
  phone: string
  numTeams: number
  numAthletes: number
  plan: 'per-team' | 'university-wide' | 'enterprise'
  message?: string
}
```

**Success Response:**
```typescript
{
  success: true,
  data: {
    requestId: string
  },
  message: "Thank you! We'll contact you within 24 hours."
}
```

**Error Response:**
```typescript
{
  success: false,
  error: {
    code: 'DUPLICATE_EMAIL' | 'DUPLICATE_UNIVERSITY' | 'VALIDATION_ERROR' | 'RATE_LIMIT_EXCEEDED',
    message: string,
    field?: string // e.g., 'email', 'universityName'
  }
}
```

**Rate Limiting Implementation:**
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const requestAccessLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
});

// In route.ts
const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
const { success, reset } = await requestAccessLimiter.limit(ip);

if (!success) {
  return NextResponse.json({
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: `Too many requests. Please try again after ${new Date(reset).toLocaleTimeString()}.`
    }
  }, { status: 429 });
}
```

**Logic:**
1. **Validate all fields** (email format, phone format, numbers > 0)
2. **Check rate limit** (see implementation above)
3. **Check for duplicate email:**
   ```typescript
   const existingRequest = await prisma.universityRequest.findUnique({
     where: { email: body.email }
   });
   if (existingRequest) {
     return error('DUPLICATE_EMAIL', 'A request with this email already exists', 'email');
   }
   ```
4. **Check for duplicate university name (case-insensitive):**
   ```typescript
   const existingRequestByName = await prisma.universityRequest.findFirst({
     where: { universityName: { equals: body.universityName, mode: 'insensitive' } }
   });
   const existingUniversity = await prisma.university.findFirst({
     where: { name: { equals: body.universityName, mode: 'insensitive' } }
   });
   if (existingRequestByName || existingUniversity) {
     return error('DUPLICATE_UNIVERSITY', 'This university has already requested access', 'universityName');
   }
   ```
5. Generate unique ID (UUID v4)
6. Insert into `university_requests` with status='pending'
7. (Optional) Send confirmation email
8. Return success with request ID

**File Location:** `app/api/university/request-access/route.ts`

---

### 2. GET `/api/platform-admin/requests`
**Purpose:** List all university requests

**Auth Required:** Yes - `platform_admin` only

**Query Params:**
- `status` (optional): 'pending', 'approved', 'rejected', 'all' (default: 'all')
- `page` (optional): page number (default: 1)
- `limit` (optional): items per page (default: 20, max: 100)
- `search` (optional): search by university name or email

**Success Response:**
```typescript
{
  success: true,
  data: {
    requests: UniversityRequest[],
    pagination: {
      total: number,
      page: number,
      limit: number,
      totalPages: number
    }
  }
}
```

**Implementation Notes:**
- Enforce max limit of 100 to prevent abuse
- Use cursor-based pagination for better performance at scale
- Include search across name and email fields

**File Location:** `app/api/platform-admin/requests/route.ts`

---

### 3. GET `/api/platform-admin/requests/[id]`
**Purpose:** Get single request details

**Auth Required:** Yes - `platform_admin` only

**File Location:** `app/api/platform-admin/requests/[id]/route.ts`

---

### 4. POST `/api/platform-admin/requests/[id]/approve` ⚠️ CRITICAL
**Purpose:** Approve request and auto-provision university

**Auth Required:** Yes - `platform_admin` only

**Request Body:**
```typescript
{
  trialDays?: number // default 30
}
```

**Response:**
```typescript
{
  success: boolean
  message: string
  universityId: string
  adminUserId: string
  activationToken: string // Raw token (send in email, don't store)
}
```

**Logic (MUST BE IN A TRANSACTION):**

```typescript
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function approveRequest(
  requestId: string,
  currentAdminUserId: string,
  trialDays: number = 30,
  req: Request
) {
  return await prisma.$transaction(async (tx) => {
    // 1. Get request
    const request = await tx.universityRequest.findUnique({
      where: { id: requestId }
    });

    if (!request) {
      throw new Error('Request not found');
    }

    // 2. Prevent double-approval (Idempotency)
    if (request.status !== 'pending') {
      throw new Error('Request already processed');
    }

    // 3. Check for duplicate university name (case-insensitive)
    // This will also be caught by the UNIQUE INDEX on LOWER(name)
    const existingUniversity = await tx.university.findFirst({
      where: {
        name: {
          equals: request.universityName,
          mode: 'insensitive'
        }
      }
    });

    if (existingUniversity) {
      throw new Error('University with this name already exists');
    }

    // 4. Generate university slug from name
    const slug = request.universityName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // 5. Create university
    const university = await tx.university.create({
      data: {
        id: uuidv4(),
        name: request.universityName,
        slug,
        contactEmail: request.email,
        plan: request.selectedPlan,
        status: 'trial',
        paymentStatus: 'unpaid',
        trialEndsAt: new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000),
        createdFromRequestId: request.id
      }
    });

    // 6. Create admin user (password_hash is NULL for pending_activation)
    const nameParts = request.contactName.split(' ');
    const adminUser = await tx.user.create({
      data: {
        id: uuidv4(),
        universityId: university.id,
        email: request.email,
        passwordHash: null, // Will be set during activation
        role: 'university_admin',
        status: 'pending_activation',
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' ') || ''
      }
    });

    // 7. Generate activation token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    await tx.activationToken.create({
      data: {
        id: uuidv4(),
        userId: adminUser.id,
        universityId: university.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        used: false
      }
    });

    // 8. Update request status
    await tx.universityRequest.update({
      where: { id: request.id },
      data: {
        status: 'approved',
        reviewedAt: new Date(),
        reviewedBy: currentAdminUserId
      }
    });

    // 9. Log admin action
    const ip = req.headers.get('x-forwarded-for') ||
               req.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    await tx.adminAction.create({
      data: {
        id: uuidv4(),
        adminId: currentAdminUserId,
        action: 'approve_request',
        entityType: 'university_request',
        entityId: request.id,
        details: {
          universityId: university.id,
          adminUserId: adminUser.id,
          trialDays
        },
        ipAddress: ip,
        userAgent
      }
    });

    // 10. Return data (raw token only returned here, NEVER stored)
    return {
      universityId: university.id,
      adminUserId: adminUser.id,
      activationToken: rawToken, // ⚠️ Send in email, don't store
      activationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/activate?token=${rawToken}`
    };
  }, {
    maxWait: 5000, // Maximum time to wait for a transaction slot
    timeout: 10000, // Maximum time for the transaction to complete
  });
}
```

**After Transaction:**
- Send activation email with raw token
- Log success

**File Location:** `app/api/platform-admin/requests/[id]/approve/route.ts`

---

### 5. POST `/api/platform-admin/requests/[id]/reject`
**Purpose:** Reject a university request

**Auth Required:** Yes - `platform_admin` only

**Request Body:**
```typescript
{
  reason: string
}
```

**Logic:**
1. Verify platform admin
2. Check request status (must be 'pending')
3. Update request:
   - status = 'rejected'
   - reviewedAt = now
   - reviewedBy = current admin ID
   - rejectionReason = provided reason
4. Log to admin_actions
5. Return success

**File Location:** `app/api/platform-admin/requests/[id]/reject/route.ts`

---

### 6. PATCH `/api/platform-admin/universities/[id]/payment-status`
**Purpose:** Update payment status for a university

**Auth Required:** Yes - `platform_admin` only

**Request Body:**
```typescript
{
  paymentStatus: 'unpaid' | 'paid' | 'overdue'
  notes?: string
}
```

**Logic:**
1. Verify platform admin
2. Update university payment_status
3. If status changes to 'paid', update university status from 'trial' to 'active'
4. Log to admin_actions
5. Return success

**File Location:** `app/api/platform-admin/universities/[id]/payment-status/route.ts`

---

## 📄 Frontend Pages to Build

### 1. Platform Admin Requests Dashboard
**Path:** `/platform-admin/requests`

**Purpose:** View and manage all university access requests

**Auth:** `platform_admin` only

**UI Components:**
- Filter tabs: All / Pending / Approved / Rejected
- Request cards/table showing:
  - University name
  - Contact info
  - Plan selected
  - Date submitted
  - Status badge
  - Actions (View, Approve, Reject)
- Search functionality
- Pagination

**Features:**
- Click "View" → `/platform-admin/requests/[id]`
- Click "Approve" → Modal → Confirm → Call approve API
- Click "Reject" → Modal with reason → Call reject API
- Real-time status updates

**File Location:** `app/platform-admin/requests/page.tsx`

---

### 2. Request Detail Page
**Path:** `/platform-admin/requests/[id]`

**Purpose:** View full details of a single request

**Display:**
- University information
- Contact details
- Plan selected with pricing
- Message/special requirements
- Teams & athletes count
- Submission date
- Status history
- Approve/Reject buttons (if pending)

**File Location:** `app/platform-admin/requests/[id]/page.tsx`

---

### 3. Universities Management Dashboard
**Path:** `/platform-admin/universities`

**Purpose:** Manage all provisioned universities

**UI Components:**
- List of all universities
- Filters: Status, Payment Status, Plan
- For each university:
  - Name
  - Plan
  - Status (trial/active/suspended)
  - Payment status
  - Trial expiration (if applicable)
  - Number of users
  - Actions (View, Manage Payment, Suspend)

**Features:**
- Update payment status
- View trial expiration countdown
- Suspend/unsuspend universities

**File Location:** `app/platform-admin/universities/page.tsx`

---

## 🛠️ RECOMMENDED BUILD ORDER

**Follow this order to avoid refactoring.**

### Phase A: Backend First (CRITICAL - Do This First)

✅ **Week 1:**

**Day 1-2: Database Setup**
- [ ] Set up Supabase/PlanetScale
- [ ] Install Prisma
- [ ] Create all 5 tables (with constraints!)
- [ ] Run migrations
- [ ] Seed 3-5 fake requests manually

**Day 3: Request Access Endpoint**
- [ ] Build POST `/api/university/request-access`
- [ ] Add rate limiting
- [ ] Add duplicate checking (email + name)
- [ ] Test with Postman/Thunder Client

**Day 4-5: Admin Endpoints (Read)**
- [ ] Build GET `/api/platform-admin/requests`
- [ ] Build GET `/api/platform-admin/requests/[id]`
- [ ] Add pagination
- [ ] Test with Postman

**Day 6-7: Approve Endpoint (THE HARD ONE)**
- [ ] Build POST `/api/platform-admin/requests/[id]/approve`
- [ ] **⚠️ WRAP IN TRANSACTION**
- [ ] Add duplicate university name check
- [ ] Add idempotency check
- [ ] Generate SHA-256 token
- [ ] Log to admin_actions
- [ ] Test thoroughly with Postman

**✅ At this point, you can demo everything with Postman. This is your safety net.**

---

### Phase B: Platform Admin UI (DEMO GOLD)

✅ **Week 2:**

**Day 1-2: Requests List Page**
- [ ] Create `/platform-admin/requests` page
- [ ] Fetch and display requests
- [ ] Add status filters
- [ ] Add pagination
- [ ] Add status badges

**Day 3: Request Detail Page**
- [ ] Create `/platform-admin/requests/[id]` page
- [ ] Display full request details
- [ ] Add "Approve" button
- [ ] Add "Reject" button

**Day 4-5: Approval Flow**
- [ ] Create approval confirmation modal
- [ ] Call approve API
- [ ] Show loading states
- [ ] Handle errors gracefully
- [ ] Show success message
- [ ] Create rejection modal with reason input
- [ ] Test full flow end-to-end

**✅ This is your capstone demo centerpiece.**

---

### Phase C: University Management

✅ **Week 3:**

**Day 1-2: Universities List**
- [ ] Create `/platform-admin/universities` page
- [ ] Display all universities
- [ ] Show trial countdown
- [ ] Show payment status

**Day 2-3: Payment Management**
- [ ] Add payment status dropdown
- [ ] Update payment status API call
- [ ] Show success notifications

**Day 4: Polish**
- [ ] Add search functionality
- [ ] Add filters
- [ ] Improve UI/UX

---

### Phase D: Email Integration (OPTIONAL BUT IMPRESSIVE)

✅ **Week 4 (or later):**

**Day 1: Email Service Setup**
- [ ] Choose email provider (SendGrid/Resend)
- [ ] Set up API keys
- [ ] Create email templates

**Day 2: Activation Emails**
- [ ] Send activation email on approval
- [ ] Include activation link with token
- [ ] Test email delivery

**Day 3: Other Emails**
- [ ] Confirmation email on request submission
- [ ] Trial expiring reminders (can be fake for demo)

**Day 4: Polish**
- [ ] Email templates styling
- [ ] Test all email flows

**💡 For Demo:** Even console.log() is fine. Show the activation link in console and say "In production, this would be sent via SendGrid."

---

## 🎯 Testing Checklist

### Happy Path
- [ ] Submit request → See in database
- [ ] See request in platform admin dashboard
- [ ] Approve request → University created
- [ ] Admin user created with correct role
- [ ] Activation token created
- [ ] Request status updated
- [ ] Audit log entry created

### Edge Cases
- [ ] Try to submit duplicate email → Error
- [ ] Try to submit duplicate university name → Error
- [ ] Try to approve already approved request → Error
- [ ] Try to approve university with existing name → Error
- [ ] Test transaction rollback (simulate failure)
- [ ] Test unauthorized access to admin routes

### Security
- [ ] Rate limiting works on request submission
- [ ] Platform admin routes reject non-admins
- [ ] Tokens are hashed (SHA-256)
- [ ] Passwords are hashed (bcrypt)
- [ ] Database constraints prevent duplicates

---

## 💡 Pro Tips for Capstone Demo

### 1. Prepare Your Demo Script

**Show the full flow:**
1. "A university submits a request" (show form)
2. "I log in as platform admin" (show dashboard)
3. "I see the pending request" (show list)
4. "I review the details" (show detail page)
5. "I approve with one click" (click approve)
6. "The system provisions everything automatically" (show database or console)
7. "The activation email would be sent" (show console log)
8. "Payment is tracked manually" (show payment status update)

### 2. Explain Your Design Choices

**When asked "Why not Stripe?"**
> "Universities don't pay with credit cards—they use Purchase Orders that take 30-60 days to process. Manual tracking reflects real B2B SaaS sales."

**When asked "Why transactions?"**
> "If the activation token creation fails after creating the university, we'd have corrupted data. The transaction ensures atomicity—either everything succeeds or everything rolls back."

**When asked "Why separate platform_admin and university_admin?"**
> "A Stanford admin shouldn't be able to approve UCLA's request. Platform admins manage the system; university admins manage their own organization."

### 3. Highlight Enterprise Patterns

- "Notice the audit logging—we track who did what and when for compliance."
- "We prevent duplicate universities at both the database and application level."
- "The activation token is hashed with SHA-256 and never stored in plain text."
- "All admin actions are wrapped in transactions for data integrity."

---

## 🚀 Success Criteria

You'll know it's working when:
- ✅ Universities can submit requests
- ✅ Requests save to database with constraints enforced
- ✅ Platform admin can view all requests
- ✅ Platform admin can approve with one click
- ✅ Approval creates university + admin user + token IN A TRANSACTION
- ✅ Duplicate prevention works (email + name)
- ✅ Payment status can be updated
- ✅ All admin actions are logged
- ✅ Everything has proper error handling
- ✅ Transaction rolls back on failure

---

## 📚 Code Examples

### Transaction Example (Prisma) - See Full Implementation Above

The complete transaction implementation is shown in the approve endpoint logic above. Key points:

**Transaction Benefits:**
- ✅ Atomicity: All operations succeed or all fail
- ✅ Consistency: No partial data corruption
- ✅ Isolation: No race conditions between approvals
- ✅ Durability: Changes are permanent after commit

**Transaction Configuration:**
```typescript
await prisma.$transaction(async (tx) => {
  // ... operations
}, {
  maxWait: 5000,   // Max ms to wait for a transaction slot
  timeout: 10000,  // Max ms for transaction to complete
  isolationLevel: 'Serializable' // Optional: strictest isolation
});
```

**When to Use Transactions:**
- Creating multiple related records (university + user + token)
- Updating status that affects multiple tables
- Any operation where partial success would corrupt data
- Operations that must be atomic (all or nothing)

### Duplicate Check Example
```typescript
// Check for duplicate university name (case-insensitive)
const existingUniversity = await prisma.university.findFirst({
  where: {
    name: {
      equals: request.universityName,
      mode: 'insensitive'
    }
  }
});

if (existingUniversity) {
  return NextResponse.json({
    success: false,
    error: {
      code: 'DUPLICATE_UNIVERSITY',
      message: 'A university with this name already exists',
      field: 'universityName'
    }
  }, { status: 409 });
}

// Note: The UNIQUE INDEX on LOWER(name) provides database-level protection
// This application-level check provides better error messages
```

### Environment Variables Required

Create a `.env` file with these variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?connection_limit=10&pool_timeout=20"

# Auth
JWT_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"

# Email (Optional - for activation emails)
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
SMTP_FROM="noreply@voiceup.app"

# Admin (Seed initial platform admin)
INITIAL_ADMIN_EMAIL="admin@voiceup.app"
INITIAL_ADMIN_PASSWORD="change-this-in-production"
```

### Token Generation Example
```typescript
import crypto from 'crypto';

// Generate token
const rawToken = crypto.randomBytes(32).toString('hex');

// Hash with SHA-256 (NOT bcrypt - tokens don't need slow hashing)
const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

// Store only the hash
await prisma.activationToken.create({
  data: {
    tokenHash,
    userId: adminUser.id,
    universityId: university.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
});

// Return raw token (send in email, NEVER store)
return rawToken;
```

### Token Validation Example (For Activation Endpoint)
```typescript
// POST /api/auth/activate
async function validateAndActivateToken(rawToken: string, newPassword: string) {
  // 1. Hash the provided token
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  // 2. Find token with all necessary checks
  const token = await prisma.activationToken.findFirst({
    where: {
      tokenHash,
      used: false,
      expiresAt: { gt: new Date() } // ⚠️ CRITICAL: Check expiration
    },
    include: {
      user: true
    }
  });

  if (!token) {
    return {
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired activation token'
      }
    };
  }

  // 3. Activate user in transaction
  return await prisma.$transaction(async (tx) => {
    // Hash the new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user
    await tx.user.update({
      where: { id: token.userId },
      data: {
        passwordHash,
        status: 'active'
      }
    });

    // Mark token as used
    await tx.activationToken.update({
      where: { id: token.id },
      data: {
        used: true,
        usedAt: new Date()
      }
    });

    return { success: true, userId: token.userId };
  });
}
```

---

**You now have a production-ready implementation guide. Follow Phase A → B → C → D and you'll have a capstone-worthy system.** 🚀
