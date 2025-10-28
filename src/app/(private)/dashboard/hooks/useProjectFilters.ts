import { useState, useMemo } from "react";
import { Project } from "@/data/dummyData";

export const useProjectFilters = (projects: Project[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSector =
        selectedSector === "all" || project.sector === selectedSector;
      const matchesStatus =
        selectedStatus === "all" || project.status === selectedStatus;

      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [projects, searchQuery, selectedSector, selectedStatus]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSector("all");
    setSelectedStatus("all");
  };

  return {
    searchQuery,
    selectedSector,
    selectedStatus,
    filteredProjects,
    setSearchQuery,
    setSelectedSector,
    setSelectedStatus,
    clearFilters,
  };
};
