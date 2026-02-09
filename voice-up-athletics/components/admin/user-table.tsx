'use client';

import { UserProfileDto } from '@/lib/types/Users';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserTableProps {
  users: UserProfileDto[];
  onEditUser?: (user: UserProfileDto) => void;
  onDeactivateUser?: (userId: number) => void;
}

export function UserTable({ users, onEditUser, onDeactivateUser }: UserTableProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">User</th>
              <th className="text-left p-4 text-sm font-medium">Email</th>
              <th className="text-left p-4 text-sm font-medium">Role</th>
              <th className="text-left p-4 text-sm font-medium">Sport</th>
              <th className="text-left p-4 text-sm font-medium">Status</th>
              <th className="text-right p-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="border-t hover:bg-muted/30">
                <td className="p-4">
                  <div>
                    <p className="font-medium">{user.anonymousAlias}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: {user.userId}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-sm">{user.email}</td>
                <td className="p-4">
                  <Badge variant="outline">{user.role}</Badge>
                </td>
                <td className="p-4 text-sm">{user.sport || 'N/A'}</td>
                <td className="p-4">
                  <Badge
                    variant={user.isActive ? 'default' : 'destructive'}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditUser?.(user)}>
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeactivateUser?.(user.userId)}
                        className="text-red-600"
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
