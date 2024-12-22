import type { StaffRole } from '$lib/types';
import { roleHierarchy, rolePermissions } from './config';
import type { PermissionSet } from './types';

/**
 * Check if a user role can manage another role
 */
export function canManageRole(userRole: StaffRole, targetRole: StaffRole): boolean {
    return roleHierarchy[userRole]?.includes(targetRole) ?? false;
}

/**
 * Check if a user has permission to perform an action on a resource
 */
export function hasResourcePermission(
    userRole: StaffRole,
    resource: string,
    action: 'create' | 'read' | 'update' | 'delete'
): boolean {
    const permissions = rolePermissions[userRole];
    return permissions.resources[resource]?.actions.includes(action) ?? false;
}

/**
 * Check if a user has permission to use a feature
 */
export function hasFeaturePermission(userRole: StaffRole, feature: string): boolean {
    const permissions = rolePermissions[userRole];
    return permissions.features[feature]?.allowed ?? false;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: StaffRole): PermissionSet {
    return rolePermissions[role];
}

/**
 * Get all roles that a user can manage
 */
export function getManageableRoles(userRole: StaffRole): StaffRole[] {
    return roleHierarchy[userRole] || [];
}

/**
 * Check if a user has any permissions for a resource
 */
export function hasAnyResourcePermission(userRole: StaffRole, resource: string): boolean {
    const permissions = rolePermissions[userRole];
    return permissions.resources[resource]?.actions.length > 0 ?? false;
}

/**
 * Get all resources a user has access to
 */
export function getAccessibleResources(userRole: StaffRole): string[] {
    const permissions = rolePermissions[userRole];
    return Object.keys(permissions.resources).filter(resource => 
        permissions.resources[resource].actions.length > 0
    );
}
