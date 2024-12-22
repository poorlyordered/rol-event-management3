import type { StaffRole } from '$lib/types';

export interface Permission {
    name: string;
    description: string;
}

export interface ResourcePermission extends Permission {
    resource: string;
    actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface FeaturePermission extends Permission {
    feature: string;
    allowed: boolean;
}

export type PermissionSet = {
    resources: Record<string, ResourcePermission>;
    features: Record<string, FeaturePermission>;
}
