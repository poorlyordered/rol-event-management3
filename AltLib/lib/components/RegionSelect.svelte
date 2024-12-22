<script lang="ts">
    import type { RiotRegion } from '$lib/types';

    export let value: RiotRegion | undefined = undefined;
    export let required = false;
    export let disabled = false;
    export let placeholder = 'Select Region';

    const regions: { value: RiotRegion; label: string }[] = [
        { value: 'NA', label: 'North America' },
        { value: 'EUW', label: 'Europe West' },
        { value: 'EUN', label: 'Europe Nordic & East' },
        { value: 'KR', label: 'Korea' },
        { value: 'BR', label: 'Brazil' },
        { value: 'LAN', label: 'Latin America North' },
        { value: 'LAS', label: 'Latin America South' },
        { value: 'OCE', label: 'Oceania' },
        { value: 'TR', label: 'Turkey' },
        { value: 'JP', label: 'Japan' },
        { value: 'PH', label: 'Philippines' },
        { value: 'SG', label: 'Singapore' },
        { value: 'TH', label: 'Thailand' },
        { value: 'TW', label: 'Taiwan' },
        { value: 'VN', label: 'Vietnam' },
        { value: 'RU', label: 'Russia' }
    ];
</script>

<select
    bind:value
    {required}
    {disabled}
    class="select-region"
>
    <option value="">{placeholder}</option>
    {#each regions as region}
        <option value={region.value}>{region.label}</option>
    {/each}
</select>

<style>
    .select-region {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        background-color: white;
        font-size: 1rem;
    }

    .select-region:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
    }

    .select-region:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
</style>
