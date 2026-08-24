<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { leadServiceClient } from '../../api/leadServiceClient';
    import { onMount } from 'svelte';

    const dispatch = createEventDispatcher();
    
    let leads: any[] = $state([]);
    let loading = $state(true);
    let selectedLeadId: string | null = $state(null);

    onMount(async () => {
        try {
            leads = await leadServiceClient.getLeads();
        } catch (error) {
            console.error("Failed to load leads", error);
        } finally {
            loading = false;
        }
    });

    function selectLead(lead: any) {
        selectedLeadId = lead.id;
        dispatch('select', { lead });
    }
</script>

<div class="flex flex-col w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
    <div class="p-4 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">Unified Inbox</h2>
    </div>

    {#if loading}
        <div class="p-4 text-gray-500 text-center">Loading leads...</div>
    {:else if leads.length === 0}
        <div class="p-4 text-gray-500 text-center">No active leads found.</div>
    {:else}
        <ul class="divide-y divide-gray-100">
            {#each leads as lead}
                <li>
                    <button 
                        class="w-full text-left p-4 hover:bg-blue-50 transition-colors {selectedLeadId === lead.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}"
                        on:click={() => selectLead(lead)}
                    >
                        <div class="flex justify-between items-baseline mb-1">
                            <h3 class="font-semibold text-gray-900 truncate">{lead.first_name} {lead.last_name}</h3>
                            <span class="text-xs text-gray-500 whitespace-nowrap ml-2">
                                {new Date(lead.last_activity_at || lead.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div class="flex items-center gap-2 mt-2">
                            <span class="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">{lead.current_state_key}</span>
                        </div>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
