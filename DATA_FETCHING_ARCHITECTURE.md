# Data Fetching Architecture

## Overview

This application follows Next.js 14 best practices with a clear separation of concerns for data fetching and mutations.

---

## Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT SIDE                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SWR Hook (useProjects, useProject)                        │
│  ├─ Initial Data: From Server Component (SSR)             │
│  ├─ Client Fetching: API Routes (/api/projects)           │
│  ├─ Caching: Automatic with SWR                            │
│  └─ Realtime: Supabase subscriptions                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
                            ├─ GET Requests
                            │
┌─────────────────────────────────────────────────────────────┐
│                     API ROUTES                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  /api/projects (GET)          - List all projects          │
│  /api/projects/[id] (GET)     - Get single project         │
│                                                             │
│  ✅ Used by: SWR for client-side fetching                  │
│  ✅ Benefits: Caching, revalidation, optimistic updates    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├─ Supabase Queries
                            │
┌─────────────────────────────────────────────────────────────┐
│                  SERVER COMPONENTS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  page.tsx (Server Component)                               │
│  ├─ Direct Supabase calls                                  │
│  ├─ Initial data for SSR                                   │
│  └─ Passed as props to Client Components                   │
│                                                             │
│  ✅ Benefits: SEO, faster initial load, no waterfalls      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  SERVER ACTIONS                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  "use server" functions                                    │
│  ├─ CREATE: Add comment, rate project                      │
│  ├─ UPDATE: Edit comment, update status                    │
│  ├─ DELETE: Delete comment                                 │
│  └─ NEVER for GET operations                               │
│                                                             │
│  ✅ Benefits: Type-safe, progressive enhancement           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               SUPABASE REALTIME                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Subscriptions in SWR hooks                                │
│  ├─ INSERT: Optimistic add to cache                        │
│  ├─ UPDATE: Optimistic update in cache                     │
│  ├─ DELETE: Optimistic remove from cache                   │
│  └─ Related tables: Trigger revalidation                   │
│                                                             │
│  ✅ Benefits: Live updates without polling                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Best Practices Implemented

### ✅ 1. Server Components for Initial Data

**File**: `src/app/(public)/projects/page.tsx`

```tsx
// Server Component - Runs on server, no client-side JS
export default async function ProjectsListPage() {
  const supabase = await createClient();

  // Direct Supabase call for initial data (SSR)
  const { data: projects } = await supabase.from("projects").select("...");

  // Pass to client component
  return <ProjectsPage initialProjects={projects || []} />;
}
```

**Benefits**:

- ✅ SEO-friendly (crawlers see content)
- ✅ Faster initial page load
- ✅ No loading spinners on first visit
- ✅ Works without JavaScript

---

### ✅ 2. API Routes for Client-Side GET Requests

**File**: `src/app/api/projects/route.ts`

```tsx
// API Route - Used by SWR for client-side fetching
export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("...");
  return NextResponse.json({ data });
}
```

**File**: `src/hooks/useProjects.ts`

```tsx
// SWR Hook - Fetches from API route, not directly from Supabase
export function useProjects(initialData?: Project[]) {
  const { data, mutate } = useSWR("/api/projects", {
    fallbackData: initialData, // Use SSR data initially
  });
  // ...
}
```

**Benefits**:

- ✅ Client-side caching with SWR
- ✅ Automatic revalidation
- ✅ Optimistic updates
- ✅ Request deduplication
- ✅ Error retry logic

---

### ✅ 3. Server Actions for Mutations Only

**File**: `src/app/(public)/projects/server/commentActions.ts`

```tsx
"use server"; // Server Action

// ✅ CORRECT: Use for CREATE
export async function addComment(projectId: string, content: string) {
  const validated = CommentSchema.parse({ projectId, content });
  const user = await requireAuth();

  await supabase.from("comments").insert({...});
  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}

// ✅ CORRECT: Use for UPDATE
export async function editComment(commentId: string, content: string) {
  // ...
}

// ✅ CORRECT: Use for DELETE
export async function deleteComment(commentId: string) {
  // ...
}

// ❌ WRONG: Don't use for GET
// export async function getComments() { ... } // Use API route instead!
```

**Benefits**:

- ✅ Type-safe mutations
- ✅ Progressive enhancement
- ✅ No client-side JavaScript required
- ✅ Automatic CSRF protection
- ✅ Works with forms

---

### ✅ 4. SWR + Realtime for Live Updates

**File**: `src/hooks/useProjects.ts`

```tsx
export function useProjects(initialData?: Project[]) {
  // SWR handles caching and fetching
  const { data, mutate } = useSWR("/api/projects", {
    fallbackData: initialData,
  });

  // Realtime handles live updates
  useEffect(() => {
    const channel = supabase
      .channel("projects")
      .on("postgres_changes", { event: "*", table: "projects" }, (payload) => {
        // Optimistic update to SWR cache
        mutate(
          (current) => {
            // Update cache without refetching
          },
          { revalidate: false }
        );
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [mutate]);

  return { projects: data };
}
```

**Benefits**:

- ✅ Instant UI updates
- ✅ No polling required
- ✅ Bandwidth efficient
- ✅ Works with SWR cache

---

## Data Flow Examples

### Example 1: Loading Projects Page

```
1. User visits /projects
   ↓
2. Server Component runs (SSR)
   ├─ Direct Supabase call
   ├─ Fetches initial projects
   └─ Returns HTML with data
   ↓
3. Client Component hydrates
   ├─ SWR receives initialData (no flash)
   ├─ Starts realtime subscription
   └─ User sees projects immediately
   ↓
4. User navigates away and back
   ├─ SWR returns cached data (instant)
   └─ Revalidates in background
```

### Example 2: Adding a Comment

```
1. User submits comment
   ↓
2. Client calls Server Action
   ├─ Validates input (Zod)
   ├─ Checks auth (requireAuth)
   ├─ Inserts to database
   └─ Revalidates cache
   ↓
3. Realtime subscription fires
   ├─ Detects INSERT event
   ├─ Optimistically updates SWR cache
   └─ UI updates instantly
   ↓
4. SWR revalidates
   └─ Ensures cache is in sync
```

### Example 3: Another User Updates Project

```
1. User A is viewing project
   ├─ SWR has cached data
   └─ Realtime subscription active
   ↓
2. User B updates project status
   ├─ Server Action runs
   └─ Database updated
   ↓
3. User A's subscription fires
   ├─ Receives UPDATE event
   ├─ SWR cache updated optimistically
   └─ UI reflects changes (no refresh needed)
```

---

## File Structure

```
src/
├── app/
│   ├── api/                          # API Routes (GET only)
│   │   └── projects/
│   │       ├── route.ts              # GET /api/projects
│   │       └── [id]/route.ts         # GET /api/projects/:id
│   │
│   ├── (public)/projects/
│   │   ├── page.tsx                  # Server Component (SSR)
│   │   ├── components/
│   │   │   ├── ProjectsPage.tsx      # Client Component (uses SWR)
│   │   │   └── ProjectPreview.tsx    # Client Component (uses SWR)
│   │   └── server/
│   │       ├── projectActions.ts     # ❌ Remove GET functions
│   │       ├── commentActions.ts     # ✅ Mutations only
│   │       └── ratingAction.ts       # ✅ Mutations only
│   │
│   └── layout.tsx                    # Wraps app with SWRProvider
│
├── hooks/
│   └── useProjects.ts                # SWR + Realtime hooks
│
├── lib/
│   ├── swr-config.ts                 # SWR configuration
│   ├── auth.ts                       # Auth helpers
│   └── validations.ts                # Zod schemas
│
└── components/
    └── providers/
        └── SWRProvider.tsx           # Global SWR config
```

---

## Benefits of This Architecture

| Aspect                   | Benefit                                              |
| ------------------------ | ---------------------------------------------------- |
| **Performance**          | Fast initial load (SSR) + instant navigation (cache) |
| **SEO**                  | Server-rendered content for search engines           |
| **UX**                   | No loading spinners, optimistic updates              |
| **Developer Experience** | Clear separation, type-safe, easy to test            |
| **Scalability**          | Efficient caching reduces database load              |
| **Real-time**            | Live updates without polling                         |
| **Offline**              | SWR cache works offline                              |

---

## Migration Checklist

- [x] Create API routes for GET operations
- [x] Create SWR hooks with realtime
- [x] Add SWRProvider to root layout
- [x] Update ProjectsPage to use SWR hook
- [x] Update ProjectPreview to use SWR hook
- [x] Keep Server Actions for mutations only
- [x] Server Components pass initial data
- [ ] Remove GET functions from Server Actions
- [ ] Add more API routes as needed

---

## Testing the Architecture

### Test SSR (Server-Side Rendering)

```bash
# Disable JavaScript in browser
# Visit /projects
# ✅ Should see projects (HTML rendered on server)
```

### Test SWR Caching

```bash
# Visit /projects
# Navigate to /projects/[id]
# Go back to /projects
# ✅ Should see cached data instantly (no loading)
```

### Test Realtime Updates

```bash
# Open /projects in two browser tabs
# In tab 1: Create a new project
# ✅ Tab 2 should show new project instantly
```

### Test Optimistic Updates

```bash
# Add a comment on a project
# ✅ Should appear instantly (before server confirmation)
```

---

## Future Enhancements

1. **Add more API routes**: Dashboard stats, user profile, etc.
2. **Implement pagination**: Cursor-based with SWR infinite
3. **Add request caching**: Use Next.js 14 `fetch` cache
4. **Optimize bundle**: Code splitting, lazy loading
5. **Add prefetching**: `router.prefetch()` for links

---

## Key Takeaways

1. **Server Components** → Initial data (SSR, SEO)
2. **API Routes** → Client-side GET (caching, revalidation)
3. **Server Actions** → Mutations only (type-safe, secure)
4. **SWR** → Caching layer (performance, UX)
5. **Realtime** → Live updates (instant, efficient)

This architecture gives you the best of all worlds: fast initial loads, instant navigation, live updates, and great SEO. 🚀
