"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableRow, TableCell } from "@/components/ui/table";
import TableUI from "@/components/shared/TableUI";
import { Eye, Search, CheckCircle2, XCircle, Trash2Icon } from "lucide-react";
import { Project } from "@/types";
import { useState } from "react";
import { useProjectActions } from "../../hooks/adminProjectHooks";
import AlertProjectDialog from "../dialogs/projects/AlertDialog";

interface ProjectsManagementTabProps {
  projects: Project[];
}

const ProjectsManagementTab = ({ projects }: ProjectsManagementTabProps) => {
  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  // Delete Dialog State
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updatingProject, setUpdatingProject] = useState<Project | null>(null);

  // Reject Dialog State
  const onRejectDialogOpen = (project: Project) => {
    setUpdatingProject(project);
    setUpdateDialogOpen(true);
  };

  // Delete Dialog State
  const onDeleteDialogOpen = (project: Project) => {
    setDeletingProject(project);
    setDeleteDialogOpen(true);
  };

  const { handleUpdateProjectStatus } = useProjectActions({
    onSuccess: () => {
      // Close dialogs
      setUpdateDialogOpen(false);
      setDeletingProject(null);
      setDeletingProject(null);
    },
  });

  const tableHeads = [
    "Project",
    "Proposer",
    "Sector",
    "Target",
    "Status",
    "Actions",
  ];

  const renderRow = (project: Project, index: number) => (
    <TableRow key={project.id} className="hover:bg-muted/30 my-2">
      {/* Desktop View */}
      <TableCell className="hidden lg:table-cell">
        <div className="font-medium">{project.title}</div>
        <div className="text-sm text-muted-foreground line-clamp-1">
          {project.description.slice(0, 60)}...
        </div>
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        {project.proposer.full_name}
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        <Badge variant="outline">{project.sector.title}</Badge>
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        ₱{project.target_funds.toLocaleString()}
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        <Badge
          className={
            project.status === "pending"
              ? "bg-warning/10 text-warning"
              : project.status === "approved"
              ? "bg-success/10 text-success"
              : project.status === "rejected"
              ? "bg-destructive/10 text-destructive"
              : "bg-primary/10 text-primary"
          }
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </TableCell>

      <TableCell className="hidden lg:table-cell text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => (window.location.href = `/projects/${project.id}`)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {project.status === "pending" ? (
            <>
              <Button
                size="sm"
                className="bg-success hover:bg-success/90"
                onClick={() => handleUpdateProjectStatus(project.id, true)}
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRejectDialogOpen(project)}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </>
          ) : project.status === "approved" ? null : (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDeleteDialogOpen(project)}
            >
              <Trash2Icon className="w-4 h-4 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </TableCell>

      {/* 📱 Mobile View */}
      <TableCell colSpan={1000} className="p-0 lg:hidden block m-2 h-full ">
        <div className="flex flex-col rounded-lg border p-4 shadow-sm h-full w-full ">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="font-semibold text-base whitespace-normal">
              {project.title}
            </div>
            <Badge
              className={
                project.status === "pending"
                  ? "bg-warning/10 text-warning"
                  : project.status === "approved"
                  ? "bg-success/10 text-success"
                  : project.status === "rejected"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 wrap-break-word whitespace-normal line-clamp-2">
            {project.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Proposer</p>
              <p className="font-medium">{project.proposer.full_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sector</p>
              <p className="font-medium">{project.sector.title}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Target Funds</p>
              <p className="font-medium">
                ₱{project.target_funds.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{project.status}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t mt-auto">
            <Button
              variant="outline"
              className="flex-1 rounded-sm"
              onClick={() => (window.location.href = `/projects/${project.id}`)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {project.status === "pending" ? (
              <>
                <Button
                  size="sm"
                  className="bg-success hover:bg-success/90 flex-1"
                  onClick={() => handleUpdateProjectStatus(project.id, true)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => onRejectDialogOpen(project)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            ) : project.status === "approved" ? null : (
              <Button
                size="sm"
                variant="destructive"
                className="flex-1"
                onClick={() => onDeleteDialogOpen(project)}
              >
                <Trash2Icon className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Project Management</h2>

      <Card className="glass-card p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by title or proposer..."
                // value={searchQuery}
                // onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select
          // value={projectFilter} onValueChange={onFilterChange}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Table */}
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <TableUI
              items={projects}
              tableHeads={tableHeads}
              tableRow={renderRow}
            />
          </div>
        )}
      </Card>

      {/* Reject Project Dialog */}
      <AlertProjectDialog
        project={updatingProject}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        toDelete={false}
      />

      {/* Delete Project Dialog */}
      <AlertProjectDialog
        project={deletingProject}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        toDelete={true}
      />
    </div>
  );
};

export default ProjectsManagementTab;
