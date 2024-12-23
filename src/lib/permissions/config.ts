import type { StaffRole, OrgRole } from '$lib/types/index.js';
import { StaffRole as StaffRoleEnum } from '$lib/types/index.js';
import type { PermissionSet } from './types.js';

const basePermissions: PermissionSet = {
    resources: {
        rol_staff: {
            name: 'ROL Staff Management',
            description: 'Manage ROL platform staff members',
            resource: 'rol_staff',
            actions: ['read']
        },
        tournaments: {
            name: 'Tournament Management',
            description: 'Manage tournaments and their settings',
            resource: 'tournaments',
            actions: ['read']
        },
        leagues: {
            name: 'League Management',
            description: 'Manage leagues and their settings',
            resource: 'leagues',
            actions: ['read']
        },
        teams: {
            name: 'Team Management',
            description: 'View teams and their rosters',
            resource: 'teams',
            actions: ['read']
        },
        esports_orgs: {
            name: 'Esports Organizations',
            description: 'View esports organizations',
            resource: 'esports_orgs',
            actions: ['read']
        }
    },
    features: {
        viewAnalytics: {
            name: 'View Analytics',
            description: 'Access to ROL platform analytics',
            feature: 'analytics',
            allowed: false
        },
        manageSettings: {
            name: 'Manage Settings',
            description: 'Access to ROL platform settings',
            feature: 'settings',
            allowed: false
        }
    }
};

// ROL staff hierarchy
export const roleHierarchy: Record<StaffRole, StaffRole[]> = {
    [StaffRoleEnum.Owner]: [
        StaffRoleEnum.PlatformAdmin,
        StaffRoleEnum.CustomerService,
        StaffRoleEnum.TournamentDirector,
        StaffRoleEnum.TournamentCoordinator,
        StaffRoleEnum.LeagueDirector,
        StaffRoleEnum.LeagueCoordinator
    ],
    [StaffRoleEnum.PlatformAdmin]: [
        StaffRoleEnum.CustomerService,
        StaffRoleEnum.TournamentDirector,
        StaffRoleEnum.TournamentCoordinator,
        StaffRoleEnum.LeagueDirector,
        StaffRoleEnum.LeagueCoordinator
    ],
    [StaffRoleEnum.TournamentDirector]: [StaffRoleEnum.TournamentCoordinator],
    [StaffRoleEnum.LeagueDirector]: [StaffRoleEnum.LeagueCoordinator],
    [StaffRoleEnum.CustomerService]: [],
    [StaffRoleEnum.TournamentCoordinator]: [],
    [StaffRoleEnum.LeagueCoordinator]: []
};

// Define permissions for ROL staff roles
export const rolePermissions: Record<StaffRole, PermissionSet> = {
    [StaffRoleEnum.Owner]: {
        resources: {
            ...basePermissions.resources,
            rol_staff: { ...basePermissions.resources.rol_staff, actions: ['create', 'read', 'update', 'delete'] },
            tournaments: { ...basePermissions.resources.tournaments, actions: ['create', 'read', 'update', 'delete'] },
            leagues: { ...basePermissions.resources.leagues, actions: ['create', 'read', 'update', 'delete'] },
            teams: { ...basePermissions.resources.teams, actions: ['read', 'update', 'delete'] },
            esports_orgs: { ...basePermissions.resources.esports_orgs, actions: ['read', 'update', 'delete'] }
        },
        features: {
            ...basePermissions.features,
            viewAnalytics: { ...basePermissions.features.viewAnalytics, allowed: true },
            manageSettings: { ...basePermissions.features.manageSettings, allowed: true }
        }
    },
    [StaffRoleEnum.PlatformAdmin]: {
        resources: {
            ...basePermissions.resources,
            rol_staff: { ...basePermissions.resources.rol_staff, actions: ['create', 'read', 'update'] },
            tournaments: { ...basePermissions.resources.tournaments, actions: ['create', 'read', 'update', 'delete'] },
            leagues: { ...basePermissions.resources.leagues, actions: ['create', 'read', 'update', 'delete'] },
            teams: { ...basePermissions.resources.teams, actions: ['read', 'update'] },
            esports_orgs: { ...basePermissions.resources.esports_orgs, actions: ['read'] }
        },
        features: {
            ...basePermissions.features,
            viewAnalytics: { ...basePermissions.features.viewAnalytics, allowed: true },
            manageSettings: { ...basePermissions.features.manageSettings, allowed: true }
        }
    },
    [StaffRoleEnum.TournamentDirector]: {
        resources: {
            ...basePermissions.resources,
            tournaments: { ...basePermissions.resources.tournaments, actions: ['create', 'read', 'update'] }
        },
        features: {
            ...basePermissions.features,
            viewAnalytics: { ...basePermissions.features.viewAnalytics, allowed: true }
        }
    },
    [StaffRoleEnum.LeagueDirector]: {
        resources: {
            ...basePermissions.resources,
            leagues: { ...basePermissions.resources.leagues, actions: ['create', 'read', 'update'] }
        },
        features: {
            ...basePermissions.features,
            viewAnalytics: { ...basePermissions.features.viewAnalytics, allowed: true }
        }
    },
    [StaffRoleEnum.CustomerService]: {
        resources: {
            ...basePermissions.resources,
            teams: { ...basePermissions.resources.teams, actions: ['read'] },
            tournaments: { ...basePermissions.resources.tournaments, actions: ['read'] },
            leagues: { ...basePermissions.resources.leagues, actions: ['read'] },
            esports_orgs: { ...basePermissions.resources.esports_orgs, actions: ['read'] }
        },
        features: {
            ...basePermissions.features
        }
    },
    [StaffRoleEnum.TournamentCoordinator]: {
        resources: {
            ...basePermissions.resources,
            tournaments: { ...basePermissions.resources.tournaments, actions: ['read', 'update'] }
        },
        features: {
            ...basePermissions.features
        }
    },
    [StaffRoleEnum.LeagueCoordinator]: {
        resources: {
            ...basePermissions.resources,
            leagues: { ...basePermissions.resources.leagues, actions: ['read', 'update'] }
        },
        features: {
            ...basePermissions.features
        }
    }
};

// Separate permissions for esports organization roles
export const orgPermissions: Record<OrgRole, PermissionSet> = {
    org_owner: {
        resources: {
            ...basePermissions.resources,
            teams: { ...basePermissions.resources.teams, actions: ['create', 'read', 'update', 'delete'] }
        },
        features: {
            ...basePermissions.features,
            viewAnalytics: { ...basePermissions.features.viewAnalytics, allowed: true }
        }
    },
    org_manager: {
        resources: {
            ...basePermissions.resources,
            teams: { ...basePermissions.resources.teams, actions: ['create', 'read', 'update'] }
        },
        features: {
            ...basePermissions.features,
            viewAnalytics: { ...basePermissions.features.viewAnalytics, allowed: true }
        }
    },
    org_staff: {
        resources: {
            ...basePermissions.resources,
            teams: { ...basePermissions.resources.teams, actions: ['read'] }
        },
        features: {
            ...basePermissions.features
        }
    }
};
