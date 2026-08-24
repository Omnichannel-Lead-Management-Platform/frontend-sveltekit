<script lang="ts">
    import { leadServiceClient } from '../../api/leadServiceClient';
    import { onMount } from 'svelte';

    let { lead } = $props();

    let stages: any[] = $state([]);
    let notes: any[] = $state([]);
    let loadingNotes = $state(false);
    let newNoteBody = $state('');
    let isUpdatingStage = $state(false);

    // Fetch pipeline stages on mount so the dropdown is populated
    onMount(async () => {
        try {
            stages = await leadServiceClient.getPipelineStages();
        } catch (e) {
            console.error("Failed to load pipeline stages", e);
        }
    });

    // Reactively fetch notes when lead changes
    $effect(() => {
        if (lead) {
            fetchNotes(lead.id);
        }
    });

    async function fetchNotes(leadId: string) {
        loadingNotes = true;
        try {
            notes = await leadServiceClient.getInternalNotes(leadId);
        } catch (e) {
            console.error("Failed to load notes", e);
            notes = [];
        } finally {
            loadingNotes = false;
        }
    }

    async function handleStageChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const newStage = select.value;
        if (!lead || newStage === lead.current_state_key) return;

        isUpdatingStage = true;
        try {
            await leadServiceClient.updateLeadStage(lead.id, newStage);
            lead.current_state_key = newStage; // optimistic update
        } catch (e) {
            console.error("Failed to update stage", e);
            // Revert dropdown if failed
            select.value = lead.current_state_key;
        } finally {
            isUpdatingStage = false;
        }
    }

    async function addNote() {
        if (!newNoteBody.trim() || !lead) return;

        const body = newNoteBody;
        newNoteBody = '';

        // Optimistic UI update
        const tempNote = { id: Date.now().toString(), body: body, author: 'You', created_at: new Date().toISOString() };
        notes = [...notes, tempNote];

        try {
            const savedNote = await leadServiceClient.addInternalNote(lead.id, body);
            // Replace temp note with actual saved note if you want
            notes = notes.map(n => n.id === tempNote.id ? savedNote : n);
        } catch (e) {
            console.error("Failed to save note", e);
            // Revert optimistic update
            notes = notes.filter(n => n.id !== tempNote.id);
            newNoteBody = body; // put text back in input
        }
    }
</script>

<div class="flex flex-col w-80 bg-white border-l border-gray-200 h-screen overflow-y-auto p-4">
    {#if !lead}
        <div class="text-center text-gray-400 mt-10">Select a lead for details</div>
    {:else}
        <!-- Lead Info Section -->
        <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Lead Status</h3>
            <div class="relative">
                <select 
                    class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 appearance-none disabled:opacity-50"
                    value={lead.current_state_key}
                    on:change={handleStageChange}
                    disabled={isUpdatingStage}
                >
                    {#if stages.length === 0}
                        <option value={lead.current_state_key}>{lead.current_state_key}</option>
                    {:else}
                        {#each stages as stage}
                            <option value={stage.key}>{stage.label}</option>
                        {/each}
                    {/if}
                </select>
                {#if isUpdatingStage}
                    <div class="absolute right-3 top-3 text-blue-500 text-xs">Saving...</div>
                {/if}
            </div>
        </div>

        <!-- Notes Section -->
        <div class="flex-1 flex flex-col">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Internal Notes</h3>
            
            <div class="flex-1 overflow-y-auto space-y-3 mb-4">
                {#if loadingNotes}
                    <div class="text-gray-400 text-sm">Loading notes...</div>
                {:else if notes.length === 0}
                    <div class="text-gray-400 text-sm italic">No internal notes yet.</div>
                {:else}
                    {#each notes as note}
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-3 shadow-sm">
                            <p class="text-sm text-gray-800 whitespace-pre-wrap">{note.body}</p>
                            <div class="flex justify-between mt-2 text-[10px] text-gray-500 font-medium">
                                <span>{note.author || 'Agent'}</span>
                                <span>{new Date(note.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>

            <!-- Add Note Input -->
            <form on:submit|preventDefault={addNote}>
                <textarea 
                    bind:value={newNoteBody} 
                    placeholder="Type a private note..." 
                    class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500 resize-none h-20"
                ></textarea>
                <button 
                    type="submit" 
                    disabled={!newNoteBody.trim()}
                    class="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold rounded py-2 text-sm transition-colors disabled:opacity-50"
                >
                    Add Note
                </button>
            </form>
        </div>
    {/if}
</div>
