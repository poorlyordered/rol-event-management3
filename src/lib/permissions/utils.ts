import type { StaffRole } from '$lib/types/index.js';
import { roleHierarchy, rolePermissions } from './config.js';

/**
 * Check if a role has access to a specific resource and action
 */
export function hasResourcePermission(
    role: StaffRole,
    resource: string,
    action: string
): boolean {
    const permissions = rolePermissions[role];
    if (!permissions) return false;

    const resourcePermissions = permissions.resources[resource];
    if (!resourcePermissions) return false;

    return resourcePermissions.actions.includes(action);
}

/**
 * Check if a role has access to a specific feature
 */
export function hasFeaturePermission(
    role: StaffRole,
    feature: string
): boolean {
    const permissions = rolePermissions[role];
    if (!permissions) return false;

    const featurePermission = permissions.features[feature];
    if (!featurePermission) return false;

    return featurePermission.allowed;
}

/**
 * Check if a role inherits from another role
 */
export function inheritsRole(
    role: StaffRole,
    targetRole: StaffRole
): boolean {
    if (role === targetRole) return true;

    const inheritedRoles = roleHierarchy[role] || [];
    return inheritedRoles.includes(targetRole) || 
           inheritedRoles.some(r => inheritsRole(r, targetRole));
}

/**
 * Get all permissions for a role, including inherited permissions
 */
export function getAllPermissions(role: StaffRole) {
    const directPermissions = rolePermissions[role];
    const inheritedRoles = roleHierarchy[role] || [];

    const allPermissions = {
        resources: { ...directPermissions.resources },
        features: { ...directPermissions.features }
    };

    inheritedRoles.forEach(inheritedRole => {
        const inheritedPermissions = rolePermissions[inheritedRole];
        
        // Merge resource permissions
        Object.entries(inheritedPermissions.resources).forEach(([resource, permissions]) => {
            if (!allPermissions.resources[resource]) {
                allPermissions.resources[resource] = permissions;
            } else {
                allPermissions.resources[resource] = {
                    ...permissions,
                    actions: [...new Set([
                        ...allPermissions.resources[resource].actions,
                        ...permissions.actions
                    ])]
                };
            }
        });

        // Merge feature permissions
        Object.entries(inheritedPermissions.features).forEach(([feature, permission]) => {
            if (!allPermissions.features[feature] || permission.allowed) {
                allPermissions.features[feature] = permission;
            }
        });
    });

    return allPermissions;
}

/**
 * Check if a role has access to any of the specified actions on a resource
 */
export function hasAnyResourcePermission(
    role: StaffRole,
    resource: string,
    actions: string[]
): boolean {
    return actions.some(action => hasResourcePermission(role, resource, action));
}

/**
 * Check if a role has access to all of the specified actions on a resource
 */
export function hasAllResourcePermissions(
    role: StaffRole,
    resource: string,
    actions: string[]
): boolean {
    return actions.every(action => hasResourcePermission(role, resource, action));
}
