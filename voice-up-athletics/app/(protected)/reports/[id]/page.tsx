'use client';

import { use } from 'react';
import { useReport } from '@/lib/hooks/use-reports';
import { useAuth } from '@/lib/hooks/use-auth';
import { PageHeader, LoadingSpinner, ErrorMessage } from '@/components/shared';
import { ReportStatusBadge } from '@/components/reports';
import { MessageThread } from '@/components/messages';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { updateReportStatusAction, assignReportAction } from '@/app/actions/reports';
import { ReportStatus } from '@/lib/types/reports';
import { useState } from 'react';

export default function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const reportId = parseInt(id);
  const { report, isLoading, isError, error, mutate } = useReport(reportId);
  const { isStaff } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading report..." />;
  }

  if (isError || !report) {
    return <ErrorMessage message={error || 'Report not found'} />;
  }

  const handleStatusUpdate = async (newStatus: ReportStatus) => {
    setIsUpdating(true);
    try {
      const result = await updateReportStatusAction(reportId, {
        status: newStatus,
        notes: `Status updated to ${newStatus}`,
      });
      if (result.success) {
        mutate();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title={`Report #${report.id}`}
        description={`Submitted ${format(new Date(report.createdAt), 'MMMM d, yyyy')}`}
      />

      {/* Report Details */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <ReportStatusBadge status={report.status} />
                <Badge variant="outline">{report.severityDisplay}</Badge>
                <Badge variant="outline">{report.categoryDisplay}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Reporter: {report.submittedByAlias}
              </p>
              {report.assignedToName && (
                <p className="text-sm text-muted-foreground">
                  Assigned to: {report.assignedToName}
                </p>
              )}
            </div>

            {isStaff() && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusUpdate('InReview')}
                  disabled={isUpdating}
                >
                  Review
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusUpdate('UnderInvestigation')}
                  disabled={isUpdating}
                >
                  Investigate
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate('Resolved')}
                  disabled={isUpdating}
                >
                  Resolve
                </Button>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {report.description}
            </p>
          </div>

          {report.incidentLocation && (
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-muted-foreground">{report.incidentLocation}</p>
            </div>
          )}

          {report.incidentDate && (
            <div>
              <h3 className="font-semibold mb-1">Incident Date</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(report.incidentDate), 'MMMM d, yyyy')}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Messages */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <MessageThread reportId={reportId} />
      </div>
    </div>
  );
}
