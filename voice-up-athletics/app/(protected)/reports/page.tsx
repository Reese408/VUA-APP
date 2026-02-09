'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/use-auth';
import { useReports, useMyReports } from '@/lib/hooks/use-reports';
import { PageHeader, LoadingSpinner, EmptyState, Pagination } from '@/components/shared';
import { ReportCard, ReportFilters } from '@/components/reports';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, FileText } from 'lucide-react';

export default function ReportsPage() {
  const { isStaff } = useAuth();
  const router = useRouter();
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);

  // Staff see all reports, athletes see only their own
  const staffReports = useReports({ ...filters, pageNumber: page });
  const athleteReports = useMyReports({ ...filters, pageNumber: page });

  const { reports, isLoading, totalPages } = isStaff() ? staffReports : athleteReports;

  return (
    <div className="space-y-6">
      <PageHeader
        title={isStaff() ? 'All Reports' : 'My Reports'}
        description={isStaff() ? 'View and manage all submitted reports' : 'View and track your submitted reports'}
        action={
          !isStaff() && (
            <Button onClick={() => router.push('/reports/new')}>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          )
        }
      />

      {isStaff() && <ReportFilters onFiltersChange={setFilters} />}

      {isLoading ? (
        <LoadingSpinner size="lg" text="Loading reports..." />
      ) : reports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={filters.status || filters.category ? 'No reports match your filters' : 'No reports yet'}
          description={filters.status || filters.category 
            ? 'Try adjusting your filters to see more results'
            : 'Get started by submitting your first anonymous report'}
          action={
            !isStaff() ? {
              label: 'Submit Report',
              onClick: () => router.push('/reports/new'),
            } : undefined
          }
        />
      ) : (
        <>
          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
