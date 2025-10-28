"use client";

import useSWR from "swr";
import { createClientUseClient } from "@/lib/supabase/supabaseClient";
import { Project } from "@/types";
import { CACHE_KEYS } from "@/lib/swr-config";
import { useEffect } from "react";

/**
 * Hook to fetch all projects with SWR caching + Supabase realtime
 * Uses API route for client-side fetching
 */
export function useProjects(initialData?: Project[]) {
  const {
    data: projects,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Project[]>(CACHE_KEYS.PROJECTS, {
    fallbackData: initialData,
    revalidateOnMount: !initialData, // Only revalidate if no initial data
    revalidateOnFocus: false, // Realtime handles updates
  });

  // Setup Supabase realtime subscription
  useEffect(() => {
    const supabase = createClientUseClient();

    const channel = supabase
      .channel("realtime:projects")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        // async (payload: any) => {
        () => {
          mutate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mutate]);

  return {
    projects: projects || [],
    isLoading,
    isValidating,
    error,
    mutate,
  };
}

/**
 * Hook to fetch single project with SWR caching + Supabase realtime
 * Uses API route for client-side fetching
 */
export function useProject(
  projectId: string | null,
  initialData?: Project | null
) {
  const {
    data: project,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Project | null>(projectId ? CACHE_KEYS.PROJECT(projectId) : null, {
    fallbackData: initialData,
    revalidateOnMount: !initialData, // Only revalidate if no initial data
    revalidateOnFocus: false, // Realtime handles updates
  });

  // Setup Supabase realtime subscription for this specific project
  useEffect(() => {
    if (!projectId) return;

    const supabase = createClientUseClient();

    const channel = supabase
      .channel(`funds`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "funds",
          filter: `project=eq.${projectId}`,
        },
        async (payload: any) => {
          console.log("Project updated:", payload.eventType);
          const updatedData = payload.new as Partial<Project>;

          // Optimistic update
          mutate(
            // (currentProject) => {
            //   if (!currentProject) return undefined;
            //   return { ...currentProject, ...updatedData };
            // },
            // { revalidate: false }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, mutate]);

  return {
    project: project || null,
    isLoading,
    isValidating,
    error,
    mutate,
  };
}
