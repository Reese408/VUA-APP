'use client';

import { useMyReports } from '@/lib/hooks/use-reports';
import { PageHeader, LoadingSpinner, EmptyState } from '@/components/shared';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { MessageSquare, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function MessagesPage() {
  const { reports, isLoading } = useMyReports();
  const router = useRouter();

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading messages..." />;
  }

  if (reports.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Messages"
          description="View conversations on your reports"
        />
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Messages will appear here when staff responds to your reports"
          action={{
            label: 'Submit Report',
            onClick: () => router.push('/reports/new'),
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="View conversations on your reports"
      />

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/reports/${report.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Report #{report.id}</h3>
                  <Badge variant="outline">{report.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {format(new Date(report.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
