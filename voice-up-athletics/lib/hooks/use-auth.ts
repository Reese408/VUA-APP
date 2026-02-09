'use client';

import { useMsal } from '@azure/msal-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { loginRequest } from '@/lib/auth/msal-config';
import {
  setAccessTokenAction,
  clearAccessTokenAction,
  getCurrentUserAction,
} from '@/app/actions/auth';
import { ROLES } from '@/lib/constants/roles';

export function useAuth() {
  const { instance, accounts } = useMsal();
  const { user, isAuthenticated, isLoading, setUser, setAccessToken, logout: clearStore } = useAuthStore();

  /**
   * Login with MSAL and sync token to server
   */
  const login = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      
      if (response.accessToken) {
        // Store token in server-side httpOnly cookie
        await setAccessTokenAction(response.accessToken);
        
        // Store token in client-side Zustand (for immediate use)
        setAccessToken(response.accessToken);
        
        // Fetch user data from backend
        const userResult = await getCurrentUserAction();
        
        if (userResult.success && userResult.data) {
          setUser(userResult.data);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Logout from MSAL and clear all tokens
   */
  const logout = async () => {
    try {
      // Clear server-side cookie
      await clearAccessTokenAction();
      
      // Clear client-side store
      clearStore();
      
      // Logout from MSAL
      await instance.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  /**
   * Silently acquire a new token
   */
  const acquireToken = async () => {
    try {
      if (accounts.length === 0) return null;

      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      if (response.accessToken) {
        // Update token in cookie
        await setAccessTokenAction(response.accessToken);
        
        // Update token in store
        setAccessToken(response.accessToken);
        
        return response.accessToken;
      }

      return null;
    } catch (error) {
      console.error('Token acquisition error:', error);
      
      // If silent token acquisition fails, try interactive
      try {
        const response = await instance.acquireTokenPopup(loginRequest);
        
        if (response.accessToken) {
          await setAccessTokenAction(response.accessToken);
          setAccessToken(response.accessToken);
          return response.accessToken;
        }
      } catch (interactiveError) {
        console.error('Interactive token acquisition failed:', interactiveError);
      }
      
      return null;
    }
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: string) => {
    return user?.roles.includes(role) ?? false;
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles: string[]) => {
    return roles.some(role => user?.roles.includes(role)) ?? false;
  };

  /**
   * Check if user is staff (ComplianceStaff, Admin, or SuperAdmin)
   */
  const isStaff = () => {
    return hasAnyRole([
      ROLES.COMPLIANCE_STAFF,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN,
    ]);
  };

  /**
   * Check if user is admin (Admin or SuperAdmin)
   */
  const isAdmin = () => {
    return hasAnyRole([ROLES.ADMIN, ROLES.SUPER_ADMIN]);
  };

  /**
   * Check if user is super admin
   */
  const isSuperAdmin = () => {
    return hasRole(ROLES.SUPER_ADMIN);
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    
    // Actions
    login,
    logout,
    acquireToken,
    
    // Role checks
    hasRole,
    hasAnyRole,
    isStaff,
    isAdmin,
    isSuperAdmin,
  };
}
