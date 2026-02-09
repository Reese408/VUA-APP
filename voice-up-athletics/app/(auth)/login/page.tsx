'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { LoginButton } from '@/components/auth';
import { Card } from '@/components/ui/card';
import { Shield, Lock, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Voice Up Athletics</h1>
          <p className="text-muted-foreground">
            Sign in with your university account to continue
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <Lock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Secure & Anonymous</p>
              <p className="text-xs text-muted-foreground">
                Your identity is protected. Only your anonymous alias is visible.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <UserCheck className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Verified Access</p>
              <p className="text-xs text-muted-foreground">
                Sign in with your university Microsoft account.
              </p>
            </div>
          </div>
        </div>

        <LoginButton />

        <p className="text-xs text-center text-muted-foreground mt-6">
          By signing in, you agree to our{' '}
          <a href="/legal/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/legal/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </Card>
    </div>
  );
}
