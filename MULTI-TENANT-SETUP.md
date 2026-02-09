# Multi-Tenant Setup for Voice Up Athletics

## Overview

Voice Up Athletics is designed as a **multi-tenant SaaS application** where:
- Each university has its own Microsoft Entra ID tenant
- Users authenticate with their university credentials (@ashland.edu, @osu.edu, etc.)
- Data is logically separated by tenant in a shared database
- Single application deployment serves all universities

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  VOICE UP ATHLETICS (Single Deployment)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend (Azure Static Web Apps)                           │
│  Backend (Azure App Service)                                │
│  Database (Azure SQL) - Single DB with tenant isolation     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Authenticates via
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  UNIVERSITY TENANTS (Multiple)                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🏫 Ashland University                                       │
│     └─ Entra ID: ashland.onmicrosoft.com                    │
│        Users: student@ashland.edu, staff@ashland.edu        │
│                                                              │
│  🏫 Ohio State University                                    │
│     └─ Entra ID: osu.onmicrosoft.com                        │
│        Users: student@osu.edu, staff@osu.edu                │
│                                                              │
│  🏫 [Future Universities...]                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Part 1: Decide Your Multi-Tenant Strategy

You have **2 options** for multi-tenant authentication:

### Option A: Multi-Tenant App Registration (Recommended for SaaS)

**Pros:**
- ✅ Single app registration that works for ALL universities
- ✅ Universities just add your app to their tenant (no re-registration)
- ✅ Scales automatically to unlimited universities
- ✅ True SaaS model

**Cons:**
- ⚠️ Requires admin consent from each university
- ⚠️ Some universities may be hesitant to grant consent

### Option B: Separate App Registration Per University

**Pros:**
- ✅ Each university has full control
- ✅ Easier for university IT to approve
- ✅ No cross-tenant permissions

**Cons:**
- ❌ Must create new app registration for each university
- ❌ Different Client IDs for each tenant
- ❌ More complex configuration management

**Recommendation for Voice Up Athletics:** Use **Option A** (Multi-Tenant App Registration)

---

## Part 2: Multi-Tenant Entra ID Setup (Option A - Recommended)

### Step 1: Create Multi-Tenant App Registration (in YOUR tenant)

You'll create the app registration in **your company's Entra ID tenant**, then universities will consent to use it.

1. **Navigate to Entra ID**
   - Go to [Azure Portal](https://portal.azure.com)
   - Search for "Microsoft Entra ID"
   - Click "App registrations"

2. **Create API App Registration**
   - Click "+ New registration"
   - **Name**: `VoiceUpAthletics-API`
   - **Supported account types**: **"Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)"** ⭐ This is key!
   - **Redirect URI**: Leave blank
   - Click "Register"

3. **Copy API Configuration** ⭐
   - **Application (client) ID**: Copy this (your `API_CLIENT_ID`)
   - **Directory (tenant) ID**: Copy this (your `TENANT_ID` - your company's tenant)

4. **Expose API**
   - Click "Expose an API"
   - Application ID URI: Click "Add" (it will be `api://{CLIENT_ID}`)
   - Click "Save and continue"

   **Add Scope:**
   - Scope name: `access_as_user`
   - Who can consent: **"Admins and users"**
   - Admin consent display name: `Access VoiceUpAthletics`
   - Admin consent description: `Allows the app to access VoiceUpAthletics on behalf of the signed-in user`
   - User consent display name: `Access VoiceUpAthletics`
   - User consent description: `Allows the app to access VoiceUpAthletics on your behalf`
   - State: "Enabled"
   - Click "Add scope"

5. **Create Frontend App Registration**
   - Click "App registrations" → "+ New registration"
   - **Name**: `VoiceUpAthletics-Frontend`
   - **Supported account types**: **"Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)"** ⭐
   - **Redirect URI**:
     - Platform: "Single-page application (SPA)"
     - For Demo: `http://localhost:3000/callback`
     - For Production: `https://voiceupathletics.com/callback`
   - Click "Register"

6. **Copy Frontend Client ID** ⭐
   - **Application (client) ID**: Copy this (your `FRONTEND_CLIENT_ID`)

7. **Configure Frontend API Permissions**
   - Click "API permissions"
   - Click "+ Add a permission"
   - Go to "APIs my organization uses"
   - Find `VoiceUpAthletics-API`
   - Select "Delegated permissions"
   - Check `access_as_user`
   - Click "Add permissions"

8. **Enable ID Tokens**
   - Click "Authentication"
   - Scroll to "Implicit grant and hybrid flows"
   - Check both:
     - ✅ Access tokens
     - ✅ ID tokens
   - Click "Save"

### Step 2: Configure Ashland University Tenant Access

Now you need Ashland University to consent to your app.

**Option 2A: Admin Consent (Recommended)**

You'll send Ashland's IT admin a consent URL:

```
https://login.microsoftonline.com/{ASHLAND_TENANT_ID}/adminconsent?client_id={YOUR_FRONTEND_CLIENT_ID}
```

**Steps:**
1. Get Ashland University's Tenant ID
   - Ask their IT admin for their Entra ID Tenant ID
   - Or: `ashland.onmicrosoft.com` (you may need to find their actual tenant ID)

2. Replace `{ASHLAND_TENANT_ID}` with their tenant ID
3. Replace `{YOUR_FRONTEND_CLIENT_ID}` with your frontend app client ID
4. Send this URL to Ashland's IT admin
5. They click the link, review permissions, and grant consent

**Option 2B: User Consent (If admin consent not available)**

If Ashland allows user consent:
1. Users will be prompted on first login
2. They can consent for themselves
3. No admin action needed

### Step 3: Update Application Configuration for Multi-Tenant

**Backend Configuration**

Update `Backend/VoiceUpAthletics.API/appsettings.Development.json`:

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "common",  // ⭐ Use "common" for multi-tenant!
    "ClientId": "<YOUR_API_CLIENT_ID>",
    "Audience": "api://<YOUR_API_CLIENT_ID>",
    "ValidateIssuer": false  // ⚠️ Important for multi-tenant
  },

  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:voiceup-prod-sql.database.windows.net,1433;Initial Catalog=VoiceUpAthletics;..."
  }
}
```

**Key Changes:**
- `TenantId: "common"` - Accepts tokens from any Entra ID tenant
- `ValidateIssuer: false` - Doesn't validate specific tenant (we'll validate in code)

**Frontend Configuration**

`voice-up-athletics/.env.local`:

```env
NEXT_PUBLIC_ENTRA_TENANT_ID=common  # ⭐ Use "common" for multi-tenant
NEXT_PUBLIC_ENTRA_CLIENT_ID=<YOUR_FRONTEND_CLIENT_ID>
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_API_URL=https://localhost:7001
NEXT_PUBLIC_API_CLIENT_ID=<YOUR_API_CLIENT_ID>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Part 3: Database Multi-Tenancy

Your database needs to track which university each user belongs to.

### Tenant Isolation Strategy

Check your `User` entity in the backend:

```csharp
// VoiceUpAthletics.Core/Entities/User.cs
public class User
{
    public int Id { get; set; }
    public string EntraObjectId { get; set; }
    public string Email { get; set; }

    // Multi-tenant fields
    public string TenantId { get; set; }  // Ashland's tenant ID
    public string TenantName { get; set; }  // "Ashland University"
    public string Domain { get; set; }  // "ashland.edu"

    // ... other fields
}
```

**How It Works:**
1. User logs in with `student@ashland.edu`
2. Backend extracts:
   - Email domain: `ashland.edu`
   - Tenant ID from token claims: `{ashland-tenant-id}`
3. All queries are filtered by `TenantId`
4. Users can only see data from their own university

### Backend Changes Needed

Let me check if your backend already has tenant isolation:

<function_calls>
<invoke name="Read">
<parameter name="file_path">Backend/VoiceUpAthletics.Core/Entities/User.cs