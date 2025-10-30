"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableRow, TableCell } from "@/components/ui/table";
import TableUI from "@/components/shared/TableUI";
import { BellRing, Eye, UserX } from "lucide-react";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import RestrictUserDialog from "../dialogs/user/RestrictUserDialog";
import { useState } from "react";

interface UsersManagementTabProps {
  users: User[];
}

const UsersManagementTab = ({ users }: UsersManagementTabProps) => {
  const filteredUsers = users.filter((u) => u.role !== "admin");
  // Restrict Dialog State
  const [isRestrictDialogOpen, setIsRestrictDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Open Restrict Dialog
  const openRestrictDialog = (user: User) => {
    setSelectedUser(user);
    setIsRestrictDialogOpen(true);
  };

  const tableHeads = [
    "Name",
    "Email",
    "Projects",
    "Donations",
    "Status",
    "Actions",
  ];

  const renderRow = (user: User, index: number) => (
    <TableRow key={user.id} className="hover:bg-muted/30 my-2">
      {/* 💻 Desktop View */}
      <TableCell className="hidden lg:table-cell">
        <div className="font-medium">{user.full_name}</div>
      </TableCell>

      <TableCell className="hidden lg:table-cell">{user.email}</TableCell>

      <TableCell className="hidden lg:table-cell">
        {user.projectsCount}
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        {user.fundsDonated}
      </TableCell>

      <TableCell className="hidden lg:table-cell">{user.status}</TableCell>

      <TableCell className="hidden lg:table-cell text-right">
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" variant="ghost">
            <BellRing className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={user.status === "restricted" ? "primary" : "destructive"}
            className="max-w-3xs flex items-center w-full"
            onClick={() => openRestrictDialog(user)}
          >
            {user.status === "restricted" ? (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Unrestrict
              </>
            ) : (
              <>
                <UserX className="w-4 h-4 mr-1" />
                Restrict
              </>
            )}
          </Button>
        </div>
      </TableCell>

      {/* 📱 Mobile View */}
      <TableCell colSpan={1000} className="p-0 lg:hidden block m-2 h-full">
        <div className="flex flex-col rounded-lg border p-4 shadow-sm h-full w-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 justify-between">
                <h1 className="font-semibold text-base">{user.full_name}</h1>
                {/* stats */}
                <Badge
                  variant={
                    user.status === "restricted" ? "destructive" : "primary"
                  }
                  className=""
                >
                  {user.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="mb-3">
              <p className="text-xs text-muted-foreground">
                Projects Contributed
              </p>
              <p className="font-medium text-lg">{user.projectsCount}10</p>
            </div>

            <div className="mb-3">
              <p className="text-xs text-muted-foreground">Total Donations</p>
              <p className="font-medium text-lg">{user.fundsDonated}200K</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t mt-auto">
            <Button variant="outline" className="flex-1">
              <BellRing className="h-4 w-4 mr-1" />
              Notify
            </Button>
            <Button
              size="sm"
              variant={user.status === "restricted" ? "primary" : "destructive"}
              className="flex-1"
              onClick={() => openRestrictDialog(user)}
            >
              {user.status === "restricted" ? (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Unrestrict
                </>
              ) : (
                <>
                  <UserX className="w-4 h-4 mr-1" />
                  Restrict
                </>
              )}
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>

      <Card className="glass-card p-6">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No users found</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <TableUI
              items={filteredUsers}
              tableHeads={tableHeads}
              tableRow={renderRow}
            />
          </div>
        )}
      </Card>

      <RestrictUserDialog
        user={selectedUser}
        open={isRestrictDialogOpen}
        onOpenChange={setIsRestrictDialogOpen}
      />
    </div>
  );
};

export default UsersManagementTab;
