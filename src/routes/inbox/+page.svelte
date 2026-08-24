<script lang="ts">
    import Sidebar from '$lib/components/inbox/Sidebar.svelte';
    import ChatArea from '$lib/components/inbox/ChatArea.svelte';
    import LeadDetails from '$lib/components/inbox/LeadDetails.svelte';

    let activeLead: any = $state(null);

    function handleSelectLead(event: CustomEvent) {
        activeLead = event.detail.lead;
    }
</script>

<div class="flex h-screen w-full overflow-hidden bg-gray-100 font-sans">
    <!-- Left Pane: List of Leads -->
    <Sidebar on:select={handleSelectLead} />

    <!-- Middle Pane: Chat Conversation -->
    <ChatArea lead={activeLead} />

    <!-- Right Pane: Pipeline Stage & Internal Notes -->
    <LeadDetails lead={activeLead} />
</div>
