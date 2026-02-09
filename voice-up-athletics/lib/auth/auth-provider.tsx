'use client';

import { MsalProvider, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, tokenRequest } from './msal-config';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import {
  setAccessTokenAction,
  getCurrentUserAction,
} from '@/app/actions/auth';

const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL
await msalInstance.initialize();

function AuthStateSync({ children }: { children: React.ReactNode }) {
  const { accounts, inProgress, instance } = useMsal();
  const { setUser, setAccessToken, setLoading } = useAuthStore();

  useEffect(() => {
    const syncAuthState = async () => {
      if (inProgress === 'none' && accounts.length > 0) {
        try {
          setLoading(true);

          // Get access token silently
          const account = accounts[0];
          const tokenResponse = await instance.acquireTokenSilent({
            ...tokenRequest,
            account,
          });

          // Store token in httpOnly cookie via server action
          await setAccessTokenAction(tokenResponse.accessToken);

          // Also store in client state for immediate use
          setAccessToken(tokenResponse.accessToken);

          // Fetch user from backend via server action
          const response = await getCurrentUserAction();

          if (response.success && response.data) {
            setUser(response.data);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Auth sync failed:', error);
          setUser(null);
          setAccessToken(null);
        } finally {
          setLoading(false);
        }
      } else if (inProgress === 'none') {
        setLoading(false);
        setUser(null);
        setAccessToken(null);
      }
    };

    syncAuthState();
  }, [accounts, inProgress, instance, setUser, setAccessToken, setLoading]);

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthStateSync>{children}</AuthStateSync>
    </MsalProvider>
  );
}
