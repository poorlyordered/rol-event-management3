# Alternative Authentication & Permissions System

This document outlines the alternative authentication and permissions system implementation found in the AltLib directory.

## System Overview

The system implements a sophisticated Role-Based Access Control (RBAC) with hierarchical permissions, organization-specific access control, and fine-grained resource management.

## Directory Structure

```
AltLib/lib/
├── config.ts
├── database.types.ts
├── supabase.ts
├── types.ts
├── components/
│   ├── RegionSelect.svelte
│   └── RoleGuard.svelte
├── permissions/
│   ├── config.ts
│   ├── types.ts
│   └── utils.ts
├── stores/
│   ├── permissions.ts
│   ├── session.ts
│   └── staff.ts
└── supabase/
    ├── client.ts
    ├── helpers.ts
    └── types/
```

## Role System

### Staff Roles Hierarchy

```typescript
const roleHierarchy = {
    owner: [
        'platform_admin',
        'customer_service',
        'tournament_director',
        'tournament_coordinator',
        'league_director',
        'league_coordinator'
    ],
    platform_admin: [
        'customer_service',
        'tournament_director',
        'tournament_coordinator',
        'league_director',
        'league_coordinator'
    ],
    tournament_director: ['tournament_coordinator'],
    league_director: ['league_coordinator'],
    customer_service: [],
    tournament_coordinator: [],
    league_coordinator: []
};
```

### Organization Roles

- org_owner
- org_manager
- org_staff

## Permissions System

### Resource Types

1. ROL Staff Management
2. Tournament Management
3. League Management
4. Team Management
5. Esports Organizations

### Feature Flags

1. Analytics Access
2. Settings Management

### Permission Structure

```typescript
type PermissionSet = {
    resources: {
        [key: string]: {
            name: string;
            description: string;
            resource: string;
            actions: string[];
        }
    },
    features: {
        [key: string]: {
            name: string;
            description: string;
            feature: string;
            allowed: boolean;
        }
    }
}
```

## Components

### RoleGuard Component

A reusable component for protecting content based on user roles:

```svelte
<script lang="ts">
    export let roles: StaffRole[] = [];
    export let organizationId: string | undefined = undefined;
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

Usage example:
```svelte
<RoleGuard roles={['owner', 'platform_admin']}>
    <AdminPanel />
</RoleGuard>
```

## State Management

### Session Store

```typescript
import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

export const user = writable<User | null>(null);
```

### Staff Store

Manages staff member data and provides role-checking utilities:

```typescript
export const staffMember = writable<StaffMember | null>(null);

// Helper functions
export const isOwner = derived(staffMember, ($staffMember) => 
    $staffMember?.role === 'owner'
);

export const isPlatformAdmin = derived(staffMember, ($staffMember) => 
    ['owner', 'platform_admin'].includes($staffMember?.role ?? '')
);
```

## Role-Based Permissions

### Owner Permissions
- Full CRUD access to all resources
- Access to all features
- Can manage staff members

### Platform Admin Permissions
- Create, Read, Update access to staff
- Full CRUD access to tournaments and leagues
- Limited access to teams and organizations
- Access to analytics and settings

### Role-Specific Directors
- Tournament Director: Manage tournaments
- League Director: Manage leagues
- Limited to their specific domains

### Coordinators
- Read and Update access to their respective areas
- No Create or Delete permissions
- No access to advanced features

### Customer Service
- Read-only access to most resources
- No access to advanced features

## Implementation Details

### Session Initialization
```typescript
user.subscribe(async (userData) => {
    if (userData) {
        const { data, error } = await supabase
            .from('staff_members')
            .select('*')
            .eq('user_id', userData.id)
            .single();
        
        if (data && !error) {
            staffMember.set(data);
        }
    }
});
```

### Access Control
The system implements multiple layers of access control:
1. Route-level protection
2. Component-level guards
3. Resource-level permissions
4. Feature flags
5. Organization-specific access

## Best Practices

1. **Type Safety**
   - Comprehensive TypeScript definitions
   - Strong typing for all permissions and roles

2. **Reactive Updates**
   - Svelte stores for reactive state management
   - Automatic permission updates on role changes

3. **Separation of Concerns**
   - Clear separation of authentication and authorization
   - Modular permission configuration
   - Reusable components and utilities

4. **Security**
   - Hierarchical role validation
   - Fine-grained permission control
   - Organization-level access restrictions

## Usage Guidelines

1. **Protecting Routes**
   ```typescript
   import { RoleGuard } from '$lib/components/RoleGuard.svelte';
   ```

2. **Checking Permissions**
   ```typescript
   import { hasRole, isOwner, isPlatformAdmin } from '$lib/stores/staff';
   ```

3. **Organization-Specific Access**
   ```typescript
   <RoleGuard roles={['org_manager']} organizationId={orgId}>
     <OrgContent />
   </RoleGuard>
   ```

4. **Feature Flags**
   ```typescript
   {#if $staffMember?.features.viewAnalytics.allowed}
     <AnalyticsPanel />
   {/if}
   ```
