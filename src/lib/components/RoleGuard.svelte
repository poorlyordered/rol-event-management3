<script lang="ts">
    import { staffMember } from '$lib/stores/staff.js';
    import type { StaffRole } from '$lib/types/index.js';
    import { StaffRole as StaffRoleEnum } from '$lib/types/index.js';
    import { inheritsRole } from '$lib/permissions/utils.js';

    export let roles: StaffRole[] = [];
    export let organizationId: string | undefined = undefined;

    $: hasAccess = $staffMember && (
        // Owner and Platform Admin have access to everything
        [StaffRoleEnum.Owner, StaffRoleEnum.PlatformAdmin].includes($staffMember.role) ||
        // Check if user has one of the required roles
        (roles.some(role => inheritsRole($staffMember.role, role)) && 
            // If organizationId is specified, check if user belongs to that org
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

<style>
    .unauthorized {
        padding: 1rem;
        text-align: center;
        color: var(--color-text-secondary);
        background-color: #f5f5f5;
        border-radius: 4px;
    }
</style>
