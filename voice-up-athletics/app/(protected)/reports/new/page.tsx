'use client';

import { PageHeader } from '@/components/shared';
import { ReportForm } from '@/components/reports';

export default function NewReportPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Submit Anonymous Report"
        description="Your report is completely confidential. Your identity will never be revealed."
      />

      <ReportForm />
    </div>
  );
}
