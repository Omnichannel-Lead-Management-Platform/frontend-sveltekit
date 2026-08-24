<script lang="ts">
    import { leadServiceClient } from '../../api/leadServiceClient';

    let { lead } = $props();

    let messages: any[] = $state([]);
    let loading = $state(false);
    let newMessage = $state('');

    // Reactively fetch messages when the lead prop changes
    $effect(() => {
        if (lead) {
            fetchMessages(lead.id);
        }
    });

    async function fetchMessages(leadId: string) {
        loading = true;
        try {
            messages = await leadServiceClient.getMessages(leadId);
        } catch (error) {
            console.error("Failed to load messages", error);
            messages = [];
        } finally {
            loading = false;
        }
    }

    function sendMessage() {
        if (!newMessage.trim()) return;
        
        // Optimistic UI update
        messages = [...messages, { 
            id: Date.now().toString(), 
            body: newMessage, 
            direction: 'outbound', 
            created_at: new Date().toISOString() 
        }];
        
        // TODO: Call your Messaging Gateway API to actually send the message
        console.log("Sending message to gateway...", newMessage);
        
        newMessage = '';
    }
</script>

<div class="flex flex-col flex-1 bg-gray-50 h-screen">
    {#if !lead}
        <div class="flex-1 flex items-center justify-center text-gray-400">
            Select a lead to view the conversation.
        </div>
    {:else}
        <!-- Header -->
        <div class="p-4 border-b border-gray-200 bg-white flex justify-between items-center shadow-sm z-10">
            <h3 class="text-lg font-semibold">{lead.first_name} {lead.last_name}</h3>
        </div>

        <!-- Message List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
            {#if loading}
                <div class="text-center text-gray-500">Loading messages...</div>
            {:else if messages.length === 0}
                <div class="text-center text-gray-500 mt-10">No messages found. Start the conversation!</div>
            {:else}
                {#each messages as msg}
                    <div class="flex {msg.direction === 'outbound' ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-[70%] rounded-2xl px-4 py-2 {msg.direction === 'outbound' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}">
                            <p class="text-sm">{msg.body}</p>
                            <span class="text-[10px] opacity-70 mt-1 block {msg.direction === 'outbound' ? 'text-right' : 'text-left'}">
                                {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-gray-200">
            <form on:submit|preventDefault={sendMessage} class="flex gap-2">
                <input 
                    type="text" 
                    bind:value={newMessage} 
                    placeholder="Type a reply..." 
                    class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 transition-colors disabled:opacity-50"
                    disabled={!newMessage.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    {/if}
</div>
