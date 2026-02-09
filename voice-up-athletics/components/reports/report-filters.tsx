'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface ReportFiltersProps {
  onFiltersChange: (filters: {
    status?: string;
    category?: string;
    severity?: string;
  }) => void;
}

export function ReportFilters({ onFiltersChange }: ReportFiltersProps) {
  const [status, setStatus] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');

  const applyFilters = () => {
    onFiltersChange({
      status: status || undefined,
      category: category || undefined,
      severity: severity || undefined,
    });
  };

  const clearFilters = () => {
    setStatus('');
    setCategory('');
    setSeverity('');
    onFiltersChange({});
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4" />
        <h3 className="font-semibold">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="UnderReview">Under Review</SelectItem>
              <SelectItem value="InProgress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AcademicPressure">Academic Pressure</SelectItem>
              <SelectItem value="Discrimination">Discrimination</SelectItem>
              <SelectItem value="FinancialConcerns">Financial Concerns</SelectItem>
              <SelectItem value="Harassment">Harassment</SelectItem>
              <SelectItem value="HealthSafety">Health & Safety</SelectItem>
              <SelectItem value="MentalHealth">Mental Health</SelectItem>
              <SelectItem value="SubstanceAbuse">Substance Abuse</SelectItem>
              <SelectItem value="TeamConflict">Team Conflict</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Severity</label>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger>
              <SelectValue placeholder="All severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={applyFilters} size="sm">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" size="sm">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>
    </Card>
  );
}
