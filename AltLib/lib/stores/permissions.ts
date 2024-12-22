import { writable, derived } from 'svelte/store';
import type { StaffRole } from '$lib/types';
import { getRolePermissions } from '$lib/permissions/utils';
import type { PermissionSet } from '$lib/permissions/types';

function createPermissionStore() {
    const { subscribe, set } = writable<PermissionSet | null>(null);
    
    return {
        subscribe,
        setRole: (role: StaffRole) => {
            const permissions = getRolePermissions(role);
            set(permissions);
        },
        reset: () => set(null)
    };
}

export const permissions = createPermissionStore();

// Derived stores for specific permission checks
export const canManageStaff = derived(
    permissions,
    $permissions => $permissions?.resources.staff?.actions.includes('create') ?? false
);

export const canManageTournaments = derived(
    permissions,
    $permissions => $permissions?.resources.tournaments?.actions.includes('create') ?? false
);

export const canManageLeagues = derived(
    permissions,
    $permissions => $permissions?.resources.leagues?.actions.includes('create') ?? false
);

export const canViewAnalytics = derived(
    permissions,
    $permissions => $permissions?.features.viewAnalytics?.allowed ?? false
);

export const canManageSettings = derived(
    permissions,
    $permissions => $permissions?.features.manageSettings?.allowed ?? false
);
