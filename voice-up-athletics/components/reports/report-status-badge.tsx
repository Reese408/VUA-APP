'use client';

import { Badge } from '@/components/ui/badge';

interface ReportStatusBadgeProps {
  status: string;
}

const statusConfig = {
  Submitted: { label: 'Submitted', className: 'bg-blue-500 text-white' },
  UnderReview: { label: 'Under Review', className: 'bg-yellow-500 text-white' },
  InProgress: { label: 'In Progress', className: 'bg-purple-500 text-white' },
  Resolved: { label: 'Resolved', className: 'bg-green-500 text-white' },
  Closed: { label: 'Closed', className: 'bg-gray-500 text-white' },
};

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: 'bg-gray-500 text-white',
  };

  return <Badge className={config.className}>{config.label}</Badge>;
}
