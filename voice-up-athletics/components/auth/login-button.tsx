'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export function LoginButton() {
  const { login, isLoading } = useAuth();

  return (
    <Button onClick={login} disabled={isLoading}>
      <LogIn className="mr-2 h-4 w-4" />
      {isLoading ? 'Signing in...' : 'Sign In'}
    </Button>
  );
}
