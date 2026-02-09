'use client';

import { ReportListItemDto } from '@/lib/types/reports';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { AlertCircle, Clock } from 'lucide-react';

interface ReportCardProps {
  report: ReportListItemDto;
}

const statusColors = {
  Submitted: 'bg-blue-500',
  UnderReview: 'bg-yellow-500',
  InProgress: 'bg-purple-500',
  Resolved: 'bg-green-500',
  Closed: 'bg-gray-500',
};

const severityColors = {
  Low: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-orange-100 text-orange-800',
  Critical: 'bg-red-100 text-red-800',
};

export function ReportCard({ report }: ReportCardProps) {
  const router = useRouter();

  return (
    <Card
      className="p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/reports/${report.id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Report #{report.id} - {report.title}</h3>
            <Badge
              variant="outline"
              className={severityColors[report.severity as keyof typeof severityColors]}
            >
              {report.severityDisplay}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {report.categoryDisplay}
            {report.isFlagged && (
              <span className="ml-2 text-red-600">• Flagged</span>
            )}
            {report.isEscalated && (
              <span className="ml-2 text-orange-600">• Escalated</span>
            )}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {format(new Date(report.createdAt), 'MMM d, yyyy')}
            </div>
            {report.assignedToName && (
              <div>Assigned to: {report.assignedToName}</div>
            )}
            {report.unreadMessageCount > 0 && (
              <div className="text-primary font-medium">
                {report.unreadMessageCount} unread
              </div>
            )}
          </div>
        </div>

        <div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
              statusColors[report.status as keyof typeof statusColors]
            }`}
          >
            {report.statusDisplay}
          </span>
        </div>
      </div>
    </Card>
  );
}
