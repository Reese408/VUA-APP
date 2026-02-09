'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
}

export function LogoutButton({ variant = 'ghost' }: LogoutButtonProps) {
  const { logout, isLoading } = useAuth();

  return (
    <Button onClick={logout} disabled={isLoading} variant={variant}>
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </Button>
  );
}
