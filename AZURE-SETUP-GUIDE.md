# Azure Setup Guide for Voice Up Athletics

This guide covers all Azure resources needed for the demo and where to configure each value.

## Overview

You need to set up **3 Azure resources**:
1. **Entra ID App Registration (API)** - Backend authentication
2. **Entra ID App Registration (Frontend)** - Frontend authentication
3. **Azure SQL Database** - Data storage

## Part 1: Entra ID App Registrations

### Step 1: Create API App Registration (Backend)

1. **Navigate to Entra ID**
   - Go to [Azure Portal](https://portal.azure.com)
   - Search for "Microsoft Entra ID" or "Azure Active Directory"
   - Click on "App registrations" in left menu

2. **Register API Application**
   - Click "+ New registration"
   - **Name**: `VoiceUpAthletics-API`
   - **Supported account types**: "Accounts in this organizational directory only (Single tenant)"
   - **Redirect URI**: Leave blank for now
   - Click "Register"

3. **Copy API Client ID** ⭐
   - On the Overview page, copy the **Application (client) ID**
   - This is your `API_CLIENT_ID`
   - **Save this value** - you'll need it multiple times

4. **Copy Tenant ID** ⭐
   - On the same Overview page, copy the **Directory (tenant) ID**
   - This is your `TENANT_ID`
   - **Save this value** - you'll need it multiple times

5. **Expose an API**
   - Click "Expose an API" in left menu
   - Click "Add a scope"
   - For Application ID URI, click "Add" (it will auto-generate `api://{CLIENT_ID}`)
   - Click "Save and continue"

   **Create the scope:**
   - Scope name: `access_as_user`
   - Who can consent: "Admins and users"
   - Admin consent display name: `Access VoiceUpAthletics API`
   - Admin consent description: `Allows the app to access the VoiceUpAthletics API on behalf of the signed-in user`
   - User consent display name: `Access VoiceUpAthletics API`
   - User consent description: `Allows the app to access VoiceUpAthletics on your behalf`
   - State: "Enabled"
   - Click "Add scope"

6. **Add Authorized Client Application**
   - Still in "Expose an API" section
   - Scroll down to "Authorized client applications"
   - Click "+ Add a client application"
   - Client ID: (You'll add the Frontend Client ID here after Step 2)
   - Check the `access_as_user` scope
   - Click "Add application"
   - ⚠️ **Come back to this after creating the Frontend app**

### Step 2: Create Frontend App Registration

1. **Register Frontend Application**
   - Go back to "App registrations"
   - Click "+ New registration"
   - **Name**: `VoiceUpAthletics-Frontend`
   - **Supported account types**: "Accounts in this organizational directory only (Single tenant)"
   - **Redirect URI**:
     - Platform: "Single-page application (SPA)"
     - URI: `http://localhost:3000/callback`
   - Click "Register"

2. **Copy Frontend Client ID** ⭐
   - On the Overview page, copy the **Application (client) ID**
   - This is your `FRONTEND_CLIENT_ID`
   - **Save this value**

3. **Add Additional Redirect URIs**
   - Click "Authentication" in left menu
   - Under "Single-page application" redirect URIs, click "+ Add URI"
   - Add: `https://localhost:3000/callback` (for SSL testing)
   - Click "Save"

4. **Configure API Permissions**
   - Click "API permissions" in left menu
   - Click "+ Add a permission"
   - Go to "APIs my organization uses" tab
   - Search for `VoiceUpAthletics-API` (or your API app name)
   - Click on it
   - Select "Delegated permissions"
   - Check `access_as_user`
   - Click "Add permissions"
   - Click "✓ Grant admin consent for [Your Organization]" (requires admin)
   - Click "Yes" to confirm

5. **Enable Implicit Grant (if needed)**
   - Click "Authentication" in left menu
   - Scroll to "Implicit grant and hybrid flows"
   - Check both:
     - ✅ Access tokens (used for implicit flows)
     - ✅ ID tokens (used for implicit and hybrid flows)
   - Click "Save"

6. **Go Back to API App Registration**
   - Navigate back to the `VoiceUpAthletics-API` app registration
   - Click "Expose an API"
   - Scroll to "Authorized client applications"
   - Click "+ Add a client application"
   - Client ID: Paste your `FRONTEND_CLIENT_ID`
   - Check the `access_as_user` scope
   - Click "Add application"

### ✅ Entra ID Summary

You should now have these values:

| Value | Where to Find It | Used For |
|-------|-----------------|----------|
| `TENANT_ID` | API app → Overview → Directory (tenant) ID | Both Frontend & Backend |
| `API_CLIENT_ID` | API app → Overview → Application (client) ID | Both Frontend & Backend |
| `FRONTEND_CLIENT_ID` | Frontend app → Overview → Application (client) ID | Frontend Only |

---

## Part 2: Azure SQL Database Setup

### Step 3: Create Azure SQL Database

1. **Navigate to SQL Databases**
   - In Azure Portal, search for "SQL databases"
   - Click "+ Create"

2. **Configure Database**

   **Basics Tab:**
   - **Subscription**: Select your company subscription
   - **Resource group**: Create new or use existing (e.g., `rg-voiceup-dev`)
   - **Database name**: `VoiceUpAthletics-Dev`
   - **Server**: Click "Create new"

   **Create SQL Server:**
   - **Server name**: `voiceup-dev-sql` (must be globally unique)
   - **Location**: Choose nearest region (e.g., East US)
   - **Authentication method**: "Use SQL authentication"
   - **Server admin login**: `sqladmin` (or your preference)
   - **Password**: Create a strong password ⭐ **SAVE THIS**
   - Click "OK"

   **Compute + Storage:**
   - Click "Configure database"
   - **Service tier**: "Basic" (5 DTUs, 2GB) - $5/month, perfect for demo
   - Click "Apply"

3. **Configure Firewall**

   **Networking Tab:**
   - **Connectivity method**: "Public endpoint"
   - **Firewall rules**:
     - ✅ Allow Azure services and resources to access this server
     - ✅ Add current client IP address (adds your dev machine)

   Click "Review + create" → "Create"

   Wait for deployment to complete (~3-5 minutes)

4. **Get Connection String** ⭐
   - Once deployed, click "Go to resource"
   - Click "Connection strings" in left menu
   - Copy the **ADO.NET (SQL authentication)** connection string
   - Replace `{your_password}` with the password you set
   - **Save this connection string**

### ✅ Database Summary

You should have:
- **Server name**: `voiceup-dev-sql.database.windows.net`
- **Database name**: `VoiceUpAthletics-Dev`
- **Admin login**: `sqladmin`
- **Password**: (your secure password)
- **Connection string**: Full connection string with password

---

## Part 3: Configure Your Application

Now plug in all the values you collected:

### Frontend Configuration

**File**: `voice-up-athletics/.env.local`

Create this file (copy from .env.example):

```env
# Microsoft Entra ID (Azure AD)
NEXT_PUBLIC_ENTRA_TENANT_ID=<PASTE_YOUR_TENANT_ID_HERE>
NEXT_PUBLIC_ENTRA_CLIENT_ID=<PASTE_YOUR_FRONTEND_CLIENT_ID_HERE>
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback

# API Configuration
NEXT_PUBLIC_API_URL=https://localhost:7001
NEXT_PUBLIC_API_CLIENT_ID=<PASTE_YOUR_API_CLIENT_ID_HERE>

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Example with real values:**
```env
NEXT_PUBLIC_ENTRA_TENANT_ID=12345678-1234-1234-1234-123456789012
NEXT_PUBLIC_ENTRA_CLIENT_ID=87654321-4321-4321-4321-210987654321
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_API_URL=https://localhost:7001
NEXT_PUBLIC_API_CLIENT_ID=abcdef12-3456-7890-abcd-ef1234567890
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend Configuration

**File**: `Backend/VoiceUpAthletics.API/appsettings.Development.json`

Update these sections:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },

  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "<PASTE_YOUR_TENANT_ID_HERE>",
    "ClientId": "<PASTE_YOUR_API_CLIENT_ID_HERE>",
    "Audience": "api://<PASTE_YOUR_API_CLIENT_ID_HERE>"
  },

  "ConnectionStrings": {
    "DefaultConnection": "<PASTE_YOUR_FULL_CONNECTION_STRING_HERE>"
  },

  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://localhost:3000"
    ]
  }
}
```

**Example with real values:**
```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "12345678-1234-1234-1234-123456789012",
    "ClientId": "abcdef12-3456-7890-abcd-ef1234567890",
    "Audience": "api://abcdef12-3456-7890-abcd-ef1234567890"
  },

  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:voiceup-dev-sql.database.windows.net,1433;Initial Catalog=VoiceUpAthletics-Dev;Persist Security Info=False;User ID=sqladmin;Password=YourSecurePassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}
```

---

## Part 4: Initialize Database

Run migrations to create all tables:

```bash
cd Backend/VoiceUpAthletics.API

# Run migrations
dotnet ef database update --project ../VoiceUpAthletics.Infrastructure

# You should see output like:
# Applying migration '20240101000000_InitialCreate'
# Applying migration '20240101000001_AddReports'
# Done.
```

---

## Part 5: Test the Setup

### 1. Start Backend

```bash
cd Backend/VoiceUpAthletics.API
dotnet run
```

**Expected output:**
```
Now listening on: https://localhost:7001
Application started. Press Ctrl+C to shut down.
```

**Verify**: Open `https://localhost:7001/swagger` in browser (you may need to accept SSL warning)

### 2. Start Frontend

```bash
cd voice-up-athletics
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.4
- Local:        http://localhost:3000
Ready in 2.3s
```

### 3. Test Authentication

1. Open browser to `http://localhost:3000`
2. Click "Login" button
3. You should be redirected to Microsoft login
4. Sign in with your company Microsoft account
5. You should be redirected back and see "Complete Profile" page
6. Fill out profile and submit
7. You should land on the Dashboard

**If you see the Dashboard**: ✅ **SUCCESS!**

---

## Troubleshooting

### "AADSTS50011: The redirect URI doesn't match"
- Go to Frontend app registration → Authentication
- Verify `http://localhost:3000/callback` is in the redirect URIs list
- Make sure it's under "Single-page application" platform

### "AADSTS65001: The user or administrator has not consented"
- Go to Frontend app registration → API permissions
- Click "Grant admin consent for [Your Organization]"
- Try logging in again

### "Cannot connect to SQL Server"
- Go to your SQL Database in Azure Portal
- Click "Networking" → "Firewall rules"
- Verify your IP is listed
- Add `0.0.0.0 - 255.255.255.255` temporarily for testing (⚠️ remove for production)

### "The SSL connection could not be established"
- In connection string, try adding: `TrustServerCertificate=True;`
- This is OK for development (⚠️ don't use in production)

### Backend won't start
```bash
# Check .NET SDK version
dotnet --version
# Should be 10.x.x

# Restore packages
dotnet restore

# Build to see errors
dotnet build
```

---

## Quick Reference Card

Print this out and keep it handy:

```
═══════════════════════════════════════════════════════════
VOICE UP ATHLETICS - AZURE CONFIGURATION QUICK REFERENCE
═══════════════════════════════════════════════════════════

TENANT ID: ___________________________________________

FRONTEND CLIENT ID: __________________________________

API CLIENT ID: _______________________________________

SQL SERVER: voiceup-dev-sql.database.windows.net

DATABASE: VoiceUpAthletics-Dev

SQL ADMIN: sqladmin

SQL PASSWORD: ________________________________________

═══════════════════════════════════════════════════════════
FRONTEND FILE: voice-up-athletics/.env.local
BACKEND FILE: Backend/VoiceUpAthletics.API/appsettings.Development.json
═══════════════════════════════════════════════════════════
```

---

## Team Access

To give other devs access:

### Database Access
1. Azure Portal → SQL Database → Query editor
2. Or add their IPs to firewall rules
3. Or use Azure Data Studio with connection string

### Entra ID Apps
1. Azure Portal → Entra ID → App registrations
2. They can see all apps in your tenant
3. No additional permissions needed for development

### Sharing Configuration
**DO NOT** commit these files:
- ❌ `.env.local` (git ignored)
- ❌ `appsettings.Development.json` with real values

**Instead:**
1. Share values via secure password manager (1Password, LastPass, etc.)
2. Or share via encrypted message
3. Each dev creates their own local config files

---

## Production Setup (Future)

When ready for production:
1. Create separate app registrations: `VoiceUpAthletics-API-Prod` and `VoiceUpAthletics-Frontend-Prod`
2. Create production database: `VoiceUpAthletics-Prod`
3. Use higher SQL tier (Standard S0 minimum)
4. Deploy backend to Azure App Service
5. Deploy frontend to Azure Static Web Apps
6. Update redirect URIs to production URLs
7. Use Azure Key Vault for secrets

---

## Cost Estimate (Development)

| Resource | Tier | Monthly Cost |
|----------|------|--------------|
| Azure SQL Database | Basic (2GB) | ~$5 |
| Entra ID App Registrations | Free | $0 |
| **Total** | | **~$5/month** |

*Frontend and Backend run locally for development - no hosting costs*

---

## Next Steps

1. ✅ Complete this Azure setup
2. ✅ Configure both .env.local and appsettings.Development.json
3. ✅ Run database migrations
4. ✅ Start both services
5. ✅ Test authentication flow
6. ✅ Run through demo checklist
7. 🎉 Present to team!

Need help? Reference the main [DEMO-SETUP.md](DEMO-SETUP.md) or [DEMO-CHECKLIST.md](DEMO-CHECKLIST.md)
