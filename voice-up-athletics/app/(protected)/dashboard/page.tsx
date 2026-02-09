'use client';

import { useAuth } from '@/lib/hooks/use-auth';
import { useMyReports } from '@/lib/hooks/use-reports';
import { PageHeader, LoadingSpinner, EmptyState } from '@/components/shared';
import { StatsCard } from '@/components/admin';
import { ReportCard } from '@/components/reports';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FileText, MessageSquare, AlertCircle, Plus } from 'lucide-react';

export default function DashboardPage() {
  const { user, isStaff } = useAuth();
  const { reports, isLoading } = useMyReports({ pageSize: 5 });
  const router = useRouter();

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />;
  }

  const activeReports = reports.filter(r => 
    ['Submitted', 'UnderReview', 'InProgress'].includes(r.status)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.anonymousAlias || 'Athlete'}`}
        description={isStaff() ? 'Manage reports and support athletes' : 'Submit and track your reports'}
        action={
          !isStaff() && (
            <Button onClick={() => router.push('/reports/new')}>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          )
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Reports"
          value={reports.length}
          icon={FileText}
          description="All time"
        />
        <StatsCard
          title="Active Reports"
          value={activeReports.length}
          icon={AlertCircle}
          description="Currently being reviewed"
        />
        <StatsCard
          title="Messages"
          value={0}
          icon={MessageSquare}
          description="Unread messages"
        />
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Reports</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/reports')}
          >
            View All
          </Button>
        </div>

        {reports.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No reports yet"
            description="Get started by submitting your first anonymous report"
            action={{
              label: 'Submit Report',
              onClick: () => router.push('/reports/new'),
            }}
          />
        ) : (
          <div className="space-y-4">
            {reports.slice(0, 5).map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
