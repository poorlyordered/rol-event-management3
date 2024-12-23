# Authentication Documentation

This document outlines the authentication implementation in the project using Supabase and SvelteKit, including role-based access control.

## Overview

The project uses Supabase for authentication, implementing a secure server-side authentication guard with protected routes, proper session management, and role-based access control. The implementation follows best practices for both server and client-side handling.

## Dependencies

```json
{
  "@supabase/auth-helpers-sveltekit": "^0.13.0",
  "@supabase/ssr": "^0.5.2",
  "@supabase/supabase-js": "^2.47.10"
}
```

## Implementation Components

### 1. Supabase Client Setup (`src/lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
```

### 2. Server-Side Hooks (`src/hooks.server.ts`)

The server-side implementation consists of two main handlers:

#### Supabase Handler
- Creates a server-specific Supabase client for each request
- Manages cookie handling with proper path settings
- Implements secure session validation
- Fetches staff member data for role-based access control

```typescript
const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(/*...*/)
  event.locals.safeGetSession = async () => {
    // Session validation and staff member data fetching
    const { session, user } = // ...
    if (user) {
      const { data: staffMember } = await event.locals.supabase
        .from('staff_members')
        .select('*')
        .eq('user_id', user.id)
        .single()
      event.locals.staffMember = staffMember
    }
    return { session, user }
  }
}
```

#### Auth Guard
- Protects routes based on authentication state and roles
- Handles redirects for unauthorized access
- Validates JWT tokens
- Implements role-based route protection

```typescript
const authGuard: Handle = async ({ event, resolve }) => {
  // Basic auth checks
  if (!event.locals.session && requiresAuth) {
    redirect(303, '/auth')
  }

  // Role-based route protection
  const routePatterns = [
    {
      pattern: /^\/admin\/.*/,
      roles: [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin]
    },
    {
      pattern: /^\/tournaments\/.*/,
      roles: [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin, 
              StaffRoleEnum.TournamentDirector, StaffRoleEnum.TournamentCoordinator]
    }
    // ... other protected routes
  ]

  // Organization-specific access control
  const orgRouteMatch = event.url.pathname.match(/^\/organizations\/([^/]+)/)
  if (orgRouteMatch) {
    const orgId = orgRouteMatch[1]
    const hasOrgAccess = // ... org access check
    if (!hasOrgAccess) {
      redirect(303, '/unauthorized')
    }
  }
}
```

### 3. Role-Based Access Control

#### Staff Roles (`src/lib/types/enums.ts`)
```typescript
export enum StaffRole {
    Owner = 'owner',
    PlatformAdmin = 'platform_admin',
    CustomerService = 'customer_service',
    TournamentDirector = 'tournament_director',
    TournamentCoordinator = 'tournament_coordinator',
    LeagueDirector = 'league_director',
    LeagueCoordinator = 'league_coordinator'
}
```

#### Permission Configuration (`src/lib/permissions/config.ts`)
```typescript
export const roleHierarchy: Record<StaffRole, StaffRole[]> = {
    [StaffRoleEnum.Owner]: [
        StaffRoleEnum.PlatformAdmin,
        StaffRoleEnum.CustomerService,
        // ... other roles
    ],
    // ... role hierarchy
}

export const rolePermissions: Record<StaffRole, PermissionSet> = {
    [StaffRoleEnum.Owner]: {
        resources: {
            rol_staff: { actions: ['create', 'read', 'update', 'delete'] },
            // ... other resources
        },
        features: {
            viewAnalytics: { allowed: true },
            // ... other features
        }
    },
    // ... permissions for other roles
}
```

#### Permission Utilities (`src/lib/permissions/utils.ts`)
```typescript
export function hasResourcePermission(
    role: StaffRole,
    resource: string,
    action: string
): boolean {
    // Check if role has permission for resource action
}

export function inheritsRole(
    role: StaffRole,
    targetRole: StaffRole
): boolean {
    // Check role inheritance
}
```

### 4. UI Components

#### RoleGuard Component (`src/lib/components/RoleGuard.svelte`)
```svelte
<script lang="ts">
    export let roles: StaffRole[] = [];
    export let organizationId: string | undefined = undefined;

    $: hasAccess = $staffMember && (
        [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin].includes($staffMember.role) ||
        (roles.some(role => inheritsRole($staffMember.role, role)) && 
            (!organizationId || $staffMember.organization_id === organizationId))
    );
</script>

{#if hasAccess}
    <slot />
{:else}
    <slot name="fallback">
        <div class="unauthorized">
            You don't have permission to view this content.
        </div>
    </slot>
{/if}
```

### 5. State Management

#### Session Store (`src/lib/stores/session.ts`)
```typescript
export const user = writable<User | null>(null);

export async function initializeSession(supabase: any) {
    // Initialize and sync user state
}
```

#### Staff Store (`src/lib/stores/staff.ts`)
```typescript
export const staffMember = writable<StaffMember | null>(null);

// Helper functions for role checking
export const isOwner = derived(staffMember, ($staffMember) => 
    $staffMember?.role === StaffRoleEnum.Owner
);

export const isPlatformAdmin = derived(staffMember, ($staffMember) => 
    $staffMember && inheritsRole($staffMember.role, StaffRoleEnum.PlatformAdmin)
);
```

## Protected Routes

The following routes are protected based on roles:

1. `/admin/*` - Owner and Platform Admin only
2. `/tournaments/*` - Tournament staff and above
3. `/leagues/*` - League staff and above
4. `/staff/*` - Owner and Platform Admin only
5. `/organizations/:id/*` - Organization-specific access

## Usage Examples

### 1. Protecting a Component
```svelte
<RoleGuard roles={[StaffRoleEnum.TournamentDirector]}>
    <TournamentManagement />
</RoleGuard>
```

### 2. Checking Permissions in Components
```svelte
<script>
    import { isOwner, isPlatformAdmin } from '$lib/stores/staff';
</script>

{#if $isOwner || $isPlatformAdmin}
    <AdminPanel />
{/if}
```

### 3. Organization-Specific Access
```svelte
<RoleGuard roles={[StaffRoleEnum.TournamentDirector]} organizationId={orgId}>
    <OrgContent />
</RoleGuard>
```

## Environment Variables

Required environment variables:
```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Security Features

1. **JWT Validation**
   - Server-side validation of JWT tokens
   - Safe session retrieval with `safeGetSession()`

2. **Protected Routes**
   - Role-based access control
   - Organization-specific protection
   - Automatic redirects for unauthorized access

3. **Cookie Security**
   - Explicit path settings
   - Secure cookie management
   - Cross-platform compatibility

4. **Session Management**
   - Proper invalidation
   - Dependency tracking for auth state changes
   - Type-safe implementation

5. **Role-Based Security**
   - Hierarchical role system
   - Fine-grained permission control
   - Resource and feature-level access control

## Best Practices

1. **Separation of Concerns**
   - Clear distinction between server and client code
   - Modular implementation with hooks and layouts
   - Separate permission configuration from implementation

2. **Type Safety**
   - Full TypeScript implementation
   - Proper type definitions for all components
   - Type-safe role and permission handling

3. **Error Handling**
   - Proper validation of auth states
   - Secure fallbacks for failed authentications
   - Role-based access validation

4. **Performance**
   - Efficient session management
   - Proper caching of auth states
   - Optimized permission checks
