# Azure Values - Where They Go

Quick visual reference for plugging in Azure values.

## 🎯 The 3 Key IDs You Need

```
┌─────────────────────────────────────────────────────────────────┐
│  ENTRA ID APP REGISTRATIONS (Create 2)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📱 APP #1: VoiceUpAthletics-API (Backend)                      │
│     ├─ Tenant ID          → Use in BOTH frontend & backend      │
│     └─ API Client ID      → Use in BOTH frontend & backend      │
│                                                                  │
│  🌐 APP #2: VoiceUpAthletics-Frontend (SPA)                     │
│     └─ Frontend Client ID → Use in frontend only                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  AZURE SQL DATABASE (Create 1)                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  💾 DATABASE: VoiceUpAthletics-Dev                              │
│     └─ Connection String  → Use in backend only                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 Value Checklist

Copy these values from Azure Portal:

- [ ] `TENANT_ID` (from API app Overview)
- [ ] `API_CLIENT_ID` (from API app Overview)
- [ ] `FRONTEND_CLIENT_ID` (from Frontend app Overview)
- [ ] `SQL_CONNECTION_STRING` (from Database Connection Strings)

## 🔌 Exact Mapping

### Frontend: `voice-up-athletics/.env.local`

```env
# Where each value comes from:

NEXT_PUBLIC_ENTRA_TENANT_ID=_______________
# ↑ From: API App → Overview → Directory (tenant) ID

NEXT_PUBLIC_ENTRA_CLIENT_ID=_______________
# ↑ From: Frontend App → Overview → Application (client) ID

NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback
# ↑ Fixed value (must match what you set in Frontend App → Authentication)

NEXT_PUBLIC_API_URL=https://localhost:7001
# ↑ Fixed value (local backend URL)

NEXT_PUBLIC_API_CLIENT_ID=_______________
# ↑ From: API App → Overview → Application (client) ID

NEXT_PUBLIC_APP_URL=http://localhost:3000
# ↑ Fixed value (local frontend URL)
```

### Backend: `Backend/VoiceUpAthletics.API/appsettings.Development.json`

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    // ↑ Fixed value (Microsoft's auth endpoint)

    "TenantId": "_______________",
    // ↑ From: API App → Overview → Directory (tenant) ID

    "ClientId": "_______________",
    // ↑ From: API App → Overview → Application (client) ID

    "Audience": "api://_______________"
    // ↑ Same as ClientId above, just with "api://" prefix
  },

  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:voiceup-dev-sql.database.windows.net,1433;Initial Catalog=VoiceUpAthletics-Dev;User ID=sqladmin;Password=YourPassword;..."
    // ↑ From: SQL Database → Connection strings → ADO.NET
    // ⚠️ Replace {your_password} with actual password
  }
}
```

## 🔄 Cross-Reference Table

| Azure Value | Frontend .env.local | Backend appsettings.Development.json |
|-------------|-------------------|-------------------------------------|
| **Tenant ID** | `NEXT_PUBLIC_ENTRA_TENANT_ID` | `AzureAd.TenantId` |
| **API Client ID** | `NEXT_PUBLIC_API_CLIENT_ID` | `AzureAd.ClientId` and `AzureAd.Audience` |
| **Frontend Client ID** | `NEXT_PUBLIC_ENTRA_CLIENT_ID` | ❌ Not used |
| **SQL Connection** | ❌ Not used | `ConnectionStrings.DefaultConnection` |

## 🎨 Visual Flow

```
┌──────────────────────────────────────────────────────────────────┐
│ AUTHENTICATION FLOW                                               │
└──────────────────────────────────────────────────────────────────┘

1. User clicks Login
   │
   ├─ Frontend uses NEXT_PUBLIC_ENTRA_CLIENT_ID
   │  to initiate login with Microsoft
   │
2. Microsoft redirects back to /callback
   │
3. Frontend gets access token
   │
   ├─ Token has scope: api://{API_CLIENT_ID}/access_as_user
   │
4. Frontend calls Backend with token
   │
   ├─ Backend validates token using its own API_CLIENT_ID
   │
5. Backend queries database
   │
   └─ Uses SQL_CONNECTION_STRING

✅ All values must match exactly for this flow to work!
```

## ⚙️ Configuration Files to Create

```
VUA-APP/
├── voice-up-athletics/
│   └── .env.local          ← CREATE THIS (copy from .env.example)
│
└── Backend/
    └── VoiceUpAthletics.API/
        └── appsettings.Development.json  ← UPDATE THIS (already exists)
```

## 🚫 Common Mistakes

❌ **Using Frontend Client ID in backend**
```json
// WRONG
"AzureAd": {
  "ClientId": "frontend-client-id"  // ❌ This breaks auth
}

// CORRECT
"AzureAd": {
  "ClientId": "api-client-id"  // ✅ Use API app client ID
}
```

❌ **Forgetting `api://` prefix for Audience**
```json
// WRONG
"Audience": "abcd-1234-efgh-5678"  // ❌ Won't validate tokens

// CORRECT
"Audience": "api://abcd-1234-efgh-5678"  // ✅ Includes prefix
```

❌ **Using wrong connection string format**
```json
// WRONG
"DefaultConnection": "Server=voiceup-dev-sql;Database=..."  // ❌ Missing .database.windows.net

// CORRECT
"DefaultConnection": "Server=tcp:voiceup-dev-sql.database.windows.net,1433;..."  // ✅ Full server name
```

## 📝 Example with Fake Values

Here's what it looks like with example values (yours will be different):

### Frontend .env.local
```env
NEXT_PUBLIC_ENTRA_TENANT_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
NEXT_PUBLIC_ENTRA_CLIENT_ID=11111111-2222-3333-4444-555555555555
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_API_URL=https://localhost:7001
NEXT_PUBLIC_API_CLIENT_ID=99999999-8888-7777-6666-555555555555
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend appsettings.Development.json
```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "ClientId": "99999999-8888-7777-6666-555555555555",
    "Audience": "api://99999999-8888-7777-6666-555555555555"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:voiceup-dev-sql.database.windows.net,1433;Initial Catalog=VoiceUpAthletics-Dev;User ID=sqladmin;Password=MySecurePass123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}
```

## ✅ Validation Checklist

Before starting the app:

- [ ] Frontend .env.local exists and has all 6 variables
- [ ] All frontend values are UUIDs (except URLs)
- [ ] Backend appsettings.Development.json has correct TenantId
- [ ] Backend ClientId matches API app registration (not frontend app)
- [ ] Backend Audience includes "api://" prefix
- [ ] SQL connection string includes password
- [ ] SQL connection string server ends with ".database.windows.net"

## 🆘 Quick Test

Run this to verify variables are loaded:

```bash
# Frontend
cd voice-up-athletics
npm run dev

# Open browser console at http://localhost:3000
# Run: console.log(process.env)
# You should see NEXT_PUBLIC_* variables

# Backend
cd Backend/VoiceUpAthletics.API
dotnet run

# Should start without errors
# If it says "Missing AzureAd:TenantId", config is wrong
```

---

**Still confused?** The full step-by-step guide is in [AZURE-SETUP-GUIDE.md](AZURE-SETUP-GUIDE.md)
