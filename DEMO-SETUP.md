# Voice Up Athletics - Demo Setup Guide

This guide will help you set up and run the Voice Up Athletics application for a team demo.

## Prerequisites

- Node.js 18+ and npm
- .NET 10 SDK
- Azure SQL Database (or SQL Server LocalDB for demo)
- Microsoft Entra ID (Azure AD) tenant with app registrations

## Quick Start (5-Minute Demo Setup)

### 1. Backend Setup

```bash
cd Backend/VoiceUpAthletics.API

# Update appsettings.Development.json with your values:
# - AzureAd:TenantId
# - AzureAd:ClientId (API app registration)
# - ConnectionStrings:DefaultConnection

# Run database migrations
dotnet ef database update --project ../VoiceUpAthletics.Infrastructure

# Start the backend
dotnet run
```

Backend will run at `https://localhost:7001`

### 2. Frontend Setup

```bash
cd voice-up-athletics

# Create .env.local file with your values
cp .env.example .env.local

# Install dependencies (if not already done)
npm install

# Start the frontend
npm run dev
```

Frontend will run at `http://localhost:3000`

## Environment Configuration

### Frontend (.env.local)

```env
# Microsoft Entra ID (Azure AD)
NEXT_PUBLIC_ENTRA_TENANT_ID=your-entra-tenant-id
NEXT_PUBLIC_ENTRA_CLIENT_ID=your-frontend-app-client-id
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback

# API Configuration
NEXT_PUBLIC_API_URL=https://localhost:7001
NEXT_PUBLIC_API_CLIENT_ID=your-api-app-client-id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (appsettings.Development.json)

```json
{
  "AzureAd": {
    "TenantId": "your-entra-tenant-id",
    "ClientId": "your-api-app-registration-client-id"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=VoiceUpAthletics;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

## Demo Flow

### 1. Landing Page
- Navigate to `http://localhost:3000`
- Showcase the marketing pages:
  - Features (`/product/features`)
  - For Universities (`/product/for-universities`)
  - Mental Health Resources (`/resources/mental-health`)

### 2. Authentication
- Click "Login" button
- Sign in with Microsoft Entra ID
- Complete profile on first login (sport, team, academic year)

### 3. Athlete Experience
- **Dashboard**: View personal reports and stats
- **Submit Report**: Create new anonymous report
  - Select category (Mental Health, Compliance, Harassment, etc.)
  - Set severity level
  - Describe incident with location and date
  - Submit anonymously
- **Messages**: View and respond to staff messages
- **Settings**: Update profile information

### 4. Staff Experience
- **Dashboard**: View all reports with stats
- **Report Management**:
  - Filter by status, category, severity
  - Assign reports to staff members
  - Update report status
  - Add internal notes
- **Messaging**: Communicate with athletes anonymously
- **Admin Panel**: Manage users and system settings

## Key Features to Showcase

### 1. Anonymous Reporting
- Athletes submit reports without revealing identity
- System generates anonymous aliases (e.g., "Anonymous Eagle #1234")
- Staff can communicate while maintaining anonymity

### 2. Role-Based Access Control
- **Athletes**: Submit reports, view own reports, message staff
- **Compliance Staff**: View/manage all reports, investigate
- **Admin**: Full system access, user management, system settings

### 3. Modern Tech Stack
- **Frontend**: Next.js 16 App Router, TypeScript, Tailwind CSS
- **Backend**: ASP.NET Core 10, Entity Framework Core
- **Auth**: Microsoft Entra ID (Azure AD) with MSAL
- **State Management**: Zustand + SWR for optimal data fetching
- **Security**: HttpOnly cookies, RBAC, HTTPS

### 4. Real-Time Communication
- Message threads between athletes and staff
- Auto-polling for new messages (30-second intervals)
- Internal notes visible only to staff

### 5. Comprehensive Reporting
- 10 report categories covering NCAA compliance concerns
- Severity levels: Low, Medium, High, Critical
- Status tracking: New → In Review → Under Investigation → Resolved
- Flagging and escalation system

## Demo Data Setup (Optional)

To create demo data for a more compelling presentation:

```bash
cd Backend/VoiceUpAthletics.API

# Run the demo data seeder (if available)
dotnet run --seed-demo-data
```

This will create:
- Sample athletes, staff, and admin users
- Example reports in various states
- Message threads demonstrating staff-athlete communication

## Troubleshooting

### Build Errors
```bash
cd voice-up-athletics
npm run build
```

All TypeScript errors have been resolved. Build should complete successfully.

### Backend Not Starting
- Ensure .NET 10 SDK is installed: `dotnet --version`
- Check database connection string
- Verify Entra ID configuration

### Authentication Issues
- Verify Entra ID app registrations are configured correctly
- Check redirect URIs match between Entra ID and .env.local
- Ensure API scopes are properly exposed and granted

### CORS Errors
- Verify frontend URL is in backend's `Cors:AllowedOrigins`
- Check that API URL in frontend matches backend URL

## Production Deployment Checklist

- [ ] Set up Azure SQL Database
- [ ] Configure Entra ID app registrations for production
- [ ] Deploy backend to Azure App Service
- [ ] Deploy frontend to Azure Static Web Apps
- [ ] Configure custom domain and SSL
- [ ] Set up Application Insights for monitoring
- [ ] Configure Serilog for structured logging
- [ ] Enable rate limiting and security headers
- [ ] Set up automated backups
- [ ] Configure CI/CD pipelines

## Additional Documentation

- [Frontend Architecture](voice-up-athletics/FRONTEND-ARCHITECTURE.md)
- [Backend Implementation](Backend/IMPLEMENTATIONS.md)
- [Component Structure](voice-up-athletics/COMPONENT-STRUCTURE.md)
- [Implementation Status](voice-up-athletics/IMPLEMENTATION-STATUS.md)

## Support

For issues or questions, please contact the development team or refer to the project documentation.
