"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ProjectFiltersProps {
  searchQuery: string;
  selectedSector: string;
  selectedStatus: string;
  sectors: string[];
  filteredCount: number;
  onSearchChange: (value: string) => void;
  onSectorChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
}

const ProjectFilters = () =>
  // {
  //   searchQuery,
  //   selectedSector,
  //   selectedStatus,
  //   sectors,
  //   filteredCount,
  //   onSearchChange,
  //   onSectorChange,
  //   onStatusChange,
  //   onClearFilters,
  // }: ProjectFiltersProps
  {
    const hasActiveFilters =
      // searchQuery || selectedSector !== "all" || selectedStatus !==
      "all";

    return (
      <Card className="glass-card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search projects by title, description, or tags..."
                // value={searchQuery}
                // onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select
          
          // value={selectedSector} onValueChange={onSectorChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {[].map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
          // value={selectedStatus} onValueChange={onStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
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

        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <span>Found {} projects</span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              // onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </Card>
    );
  };

export default ProjectFilters;
