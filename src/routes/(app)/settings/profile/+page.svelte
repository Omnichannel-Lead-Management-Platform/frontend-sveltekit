<script lang="ts">
	import { onMount } from 'svelte';
	import { getMe } from '$lib/api/auth.js';
	import Alert from '$lib/components/Alert.svelte';

	let loading = $state(true);
	let error = $state('');
	let profile = $state(null);

	onMount(async () => {
		try {
			const res = await getMe();
			if (res.status === 'success') {
				profile = res.data;
			} else {
				error = 'Failed to load profile data.';
			}
		} catch (err) {
			error = err?.message || 'Could not connect to server.';
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>My Profile - Omnichannel</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-6 md:p-8">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-slate-900">My Profile</h1>
		<p class="text-slate-500 mt-1">View your personal account details.</p>
	</div>

	{#if error}
		<Alert type="error" message={error} />
	{/if}

	{#if loading}
		<div class="p-8 text-center text-slate-500">Loading profile...</div>
	{:else if profile}
		<div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
			<div class="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
				<h2 class="text-lg font-semibold text-slate-900">Account Details</h2>
			</div>
			
			<div class="p-6">
				<div class="space-y-6">
					
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="text-sm font-medium text-slate-500 md:pt-1">Full Name</div>
						<div class="md:col-span-2">
							<div class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium">
								{profile.name || 'Not provided'}
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="text-sm font-medium text-slate-500 md:pt-1">Email Address</div>
						<div class="md:col-span-2">
							<div class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium flex items-center justify-between">
								<span>{profile.email}</span>
								{#if profile.emailVerified}
									<span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
										<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
										Verified
									</span>
								{/if}
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="text-sm font-medium text-slate-500 md:pt-1">Role ID</div>
						<div class="md:col-span-2">
							<div class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-mono break-all">
								{profile.role_id || 'None'}
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="text-sm font-medium text-slate-500 md:pt-1">Workspace ID</div>
						<div class="md:col-span-2">
							<div class="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-mono break-all">
								{profile.workspace_id || 'None'}
							</div>
						</div>
					</div>
					
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
						<div class="text-sm font-medium text-slate-500 md:pt-1">Assigned Permissions</div>
						<div class="md:col-span-2">
							{#if profile.permissions && profile.permissions.length > 0}
								<div class="flex flex-wrap gap-2">
									{#each profile.permissions as perm}
										<span class="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-medium">
											{perm}
										</span>
									{/each}
								</div>
							{:else}
								<div class="text-slate-500 text-sm italic">No permissions assigned</div>
							{/if}
						</div>
					</div>

				</div>
			</div>
		</div>
	{/if}
</div>
