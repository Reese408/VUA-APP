'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/use-auth';
import { updateProfileAction } from '@/app/actions/auth';
import { PageHeader } from '@/components/shared';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    sport: user?.sport || '',
    teamName: user?.teamName || '',
    phoneNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const result = await updateProfileAction(formData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences"
      />

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

        <div className="space-y-4 mb-6">
          <div>
            <Label>Email</Label>
            <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
          </div>
          <div>
            <Label>Anonymous Alias</Label>
            <p className="text-sm text-muted-foreground mt-1">{user?.anonymousAlias}</p>
            <p className="text-xs text-muted-foreground mt-1">
              This is how you appear in reports and messages
            </p>
          </div>
          <div>
            <Label>Roles</Label>
            <div className="flex gap-2 mt-1">
              {user?.roles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
              Profile updated successfully!
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="sport">Sport</Label>
            <Input
              id="sport"
              value={formData.sport}
              onChange={(e) =>
                setFormData({ ...formData, sport: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              value={formData.teamName}
              onChange={(e) =>
                setFormData({ ...formData, teamName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="(123) 456-7890"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Privacy & Security</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your reports and messages are completely anonymous. Only your anonymous
          alias is visible to staff members.
        </p>
        <Button variant="outline">
          Learn More About Privacy
        </Button>
      </Card>
    </div>
  );
}
