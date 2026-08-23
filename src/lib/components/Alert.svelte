<script>
    let { type = 'error', message = '', submessage = '' } = $props();
</script>

{#if message}
    <div class="flex items-start gap-2.5 p-3.5 mt-5 animate-enter {type === 'error' ? 'wf-alert-error' : 'wf-alert-success'}">
        <div class="shrink-0 mt-0.5">
            {#if type === 'error'}
                <!-- Error Icon SVG -->
                <svg class="w-4 h-4 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            {:else}
                <!-- Success Icon SVG -->
                <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
            {/if}
        </div>
        <div class="flex flex-col gap-1 text-xs sm:text-sm leading-relaxed">
            <p class="font-medium">{message}</p>
            {#if submessage}
                <p class="opacity-90 text-xs">{submessage}</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .animate-enter {
        animation: slideIn 0.3s ease-out forwards;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
