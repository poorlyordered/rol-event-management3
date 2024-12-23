import type { StaffRole, OrgRole } from '$lib/types/index.js';

export type PermissionSet = {
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
