'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createReportAction } from '@/app/actions/reports';
import { CreateReportDto, ReportCategory, ReportSeverity } from '@/lib/types/reports';
import { AlertCircle } from 'lucide-react';

export function ReportForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateReportDto>({
    title: '',
    category: 'Other',
    severity: 'Medium',
    description: '',
    incidentLocation: '',
    incidentDate: new Date().toISOString().split('T')[0],
    involvedParties: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createReportAction(formData);

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message || 'Failed to submit report');
      }
    } catch (err) {
      setError('An error occurred while submitting the report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value as ReportCategory })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MentalHealth">Mental Health</SelectItem>
              <SelectItem value="ComplianceViolation">Compliance Violation</SelectItem>
              <SelectItem value="Harassment">Harassment</SelectItem>
              <SelectItem value="Discrimination">Discrimination</SelectItem>
              <SelectItem value="SexualMisconduct">Sexual Misconduct</SelectItem>
              <SelectItem value="SubstanceAbuse">Substance Abuse</SelectItem>
              <SelectItem value="AcademicMisconduct">Academic Misconduct</SelectItem>
              <SelectItem value="InjuryConcerns">Injury Concerns</SelectItem>
              <SelectItem value="CoachingMisconduct">Coaching Misconduct</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="severity">Severity *</Label>
          <Select
            value={formData.severity}
            onValueChange={(value) =>
              setFormData({ ...formData, severity: value as ReportSeverity })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="Brief title for the report"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Please describe what happened..."
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="incidentLocation">Location (Optional)</Label>
          <Input
            id="incidentLocation"
            placeholder="Where did this occur?"
            value={formData.incidentLocation}
            onChange={(e) =>
              setFormData({ ...formData, incidentLocation: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="involvedParties">Involved Parties (Optional)</Label>
          <Input
            id="involvedParties"
            placeholder="Who was involved? (Anonymous)"
            value={formData.involvedParties}
            onChange={(e) =>
              setFormData({ ...formData, involvedParties: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="incidentDate">Incident Date *</Label>
          <Input
            id="incidentDate"
            type="date"
            value={formData.incidentDate}
            onChange={(e) =>
              setFormData({ ...formData, incidentDate: e.target.value })
            }
            required
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Your report is completely anonymous. Your identity will never be revealed.
        </p>
      </form>
    </Card>
  );
}
