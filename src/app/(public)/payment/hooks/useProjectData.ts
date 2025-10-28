import { useState, useEffect } from "react";
import { Project } from "@/types";

export const useProjectData = (projectId: string | null) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${projectId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }

        const data = await response.json();
        setProject(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch project"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return { project, loading, error };
};
