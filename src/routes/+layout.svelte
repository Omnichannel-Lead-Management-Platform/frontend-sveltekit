<script lang="ts">
	import { onMount } from 'svelte';
	import { getMe } from '$lib/api/auth.js';
	import { authStore } from '$lib/stores/auth';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
	
	let loadingAuth = $state(true);

	onMount(async () => {
		const token = localStorage.getItem('auth_token');
		if (token) {
			try {
				const res = await getMe();
				if (res && res.data) {
					authStore.set({
						isAuthenticated: true,
						user: res.data
					});
				}
			} catch (err) {
				console.error("Failed to authenticate user", err);
				localStorage.removeItem('auth_token');
			}
		}
		loadingAuth = false;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
