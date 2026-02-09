'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { PageHeader, LoadingSpinner } from '@/components/shared';
import { StatsCard } from '@/components/admin';
import { Users, FileText, AlertCircle, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin()) {
      router.push('/dashboard');
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading admin panel..." />;
  }

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={0}
          icon={Users}
          description="Active users"
        />
        <StatsCard
          title="Total Reports"
          value={0}
          icon={FileText}
          description="All time"
        />
        <StatsCard
          title="Pending Review"
          value={0}
          icon={AlertCircle}
          description="Awaiting action"
        />
        <StatsCard
          title="Resolution Rate"
          value="0%"
          icon={TrendingUp}
          description="Last 30 days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-muted transition-colors">
              Manage Users
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-muted transition-colors">
              View Analytics
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-muted transition-colors">
              System Settings
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">
            No recent activity to display
          </p>
        </div>
      </div>
    </div>
  );
}
