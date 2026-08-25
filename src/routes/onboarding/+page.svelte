<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { apiRequest } from '$lib/api/auth';

	const STEP_KEYS = [
		'business_basics',
		'channel_connect',
		'pipeline_setup',
		'reply_mode',
		'preferences',
		'review_finish'
	];

	const STEP_KEY_TO_NUM: Record<string, number> = {
		business_basics: 1,
		channel_connect: 2,
		pipeline_setup: 3,
		reply_mode: 4,
		preferences: 5,
		review_finish: 6
	};

	onMount(() => {
		// Bypass non-existent API checks and start onboarding UI
		goto('/onboarding/1');
	});
</script>

<div style="padding: 40px; text-align: center; max-width: 480px; margin: 0 auto; color: #64748B; font-size: 14px;">
	Loading your workspace setup...
</div>
