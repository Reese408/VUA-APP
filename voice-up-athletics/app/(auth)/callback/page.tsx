'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/shared';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // MSAL handles the callback automatically
    // Redirect to dashboard after a short delay
    const timeout = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" text="Completing sign in..." />
      </div>
    </div>
  );
}
