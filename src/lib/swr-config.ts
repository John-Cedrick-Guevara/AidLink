import { SWRConfiguration } from "swr";

/**
 * Fetcher for API routes
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  const json = await res.json();
  return json.data;
};

/**
 * Global SWR configuration
 * https://swr.vercel.app/docs/global-configuration
 */
export const swrConfig: SWRConfiguration = {
  fetcher,

  // Revalidate on focus by default
  revalidateOnFocus: true,

  // Revalidate on reconnect
  revalidateOnReconnect: true,

  // Dedupe requests within 5 seconds
  dedupingInterval: 5000,

  // Keep data fresh for 5 minutes
  focusThrottleInterval: 5000,

  // Retry on error (with exponential backoff)
  errorRetryCount: 3,
  errorRetryInterval: 5000,

  // Show previous data while revalidating
  keepPreviousData: true,

  // Fallback to cache while revalidating
  revalidateIfStale: true,

  // Suspense mode disabled (use loading states instead)
  suspense: false,

  // Error handler
  onError: (error, key) => {
    console.error(`SWR Error [${key}]:`, error);
  },
};

/**
 * Cache keys for consistent cache management
 */
export const CACHE_KEYS = {
  // Projects
  PROJECTS: "/api/projects",
  PROJECT: (id: string) => `/api/projects/${id}`,
} as const;
