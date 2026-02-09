'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/lib/constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requireProfileComplete?: boolean;
}

export function ProtectedRoute({
  children,
  requiredRoles,
  requireProfileComplete = false,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, hasAnyRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (requireProfileComplete && user && !user.isProfileComplete) {
      router.push(ROUTES.COMPLETE_PROFILE);
      return;
    }

    if (requiredRoles && !hasAnyRole(requiredRoles)) {
      router.push(ROUTES.DASHBOARD);
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    user,
    requiredRoles,
    requireProfileComplete,
    router,
    hasAnyRole,
  ]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireProfileComplete && user && !user.isProfileComplete) {
    return null;
  }

  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return null;
  }

  return <>{children}</>;
}
