<script>
    let { type = 'error', message = '', submessage = '' } = $props();
</script>

{#if message}
    <div class="alert alert-{type} animate-enter">
        <div class="alert-icon">
            {#if type === 'error'}
                <!-- Error Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {:else}
                <!-- Success Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            {/if}
        </div>
        <div class="alert-content">
            <p class="alert-message">{message}</p>
            {#if submessage}
                <p class="alert-submessage">{submessage}</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .alert {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 8px;
        text-align: left;
        margin-bottom: 8px;
    }

    .alert-error {
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
    }

    .alert-success {
        background-color: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        color: #16a34a;
    }

    .alert-icon {
        flex-shrink: 0;
        margin-top: 2px;
    }

    .alert-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .alert-message {
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.4;
        margin: 0;
    }

    .alert-submessage {
        font-size: 0.8rem;
        opacity: 0.8;
        margin: 0;
    }

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
