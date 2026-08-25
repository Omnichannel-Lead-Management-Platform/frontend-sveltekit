<script lang="ts">
	import { onMount } from 'svelte';
	import { listUsers, generateInvite, updateUserRole, getRoles } from '$lib/api/auth.js';
	import Alert from '$lib/components/Alert.svelte';

	let users = $state([]);
	let roles = $state([]);
	let loading = $state(true);
	let error = $state('');

	let inviteLink = $state('');
	let inviteLoading = $state(false);
	let inviteError = $state('');

	onMount(async () => {
		await Promise.all([loadUsers(), loadRoles()]);
		loading = false;
	});

	async function loadUsers() {
		error = '';
		try {
			const res = await listUsers();
			if (res.status === 'success') {
				users = res.data || [];
			}
		} catch (err) {
			error = err?.message || 'Failed to load users';
		}
	}

	async function loadRoles() {
		try {
			const res = await getRoles();
			if (res.status === 'success') {
				roles = res.data || [];
			}
		} catch (err) {
			console.error("Failed to load roles:", err);
		}
	}

	async function handleGenerateInvite(e: Event) {
		e.preventDefault();
		inviteLoading = true;
		inviteError = '';
		inviteLink = '';

		try {
			const res = await generateInvite();
			if (res.status === 'success') {
				inviteLink = res.data.invite_link;
			}
		} catch (err) {
			inviteError = err?.message || 'Failed to generate invite';
		} finally {
			inviteLoading = false;
		}
	}

	async function handleUpdateRole(userId: string, newRoleId: string) {
		try {
			await updateUserRole(userId, newRoleId);
			// Show success somehow or just let it be silent
		} catch (err) {
			error = err?.message || 'Failed to update user role';
		}
	}
</script>

<svelte:head>
	<title>Users & Permissions - Omnichannel</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-6 md:p-8">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-slate-900">Users & Permissions</h1>
		<p class="text-slate-500 mt-1">Manage your team members and their roles within this workspace.</p>
	</div>

	<!-- Invite Section -->
	<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
		<div class="px-6 py-5 border-b border-slate-200">
			<h2 class="text-lg font-semibold text-slate-900">Invite new member</h2>
		</div>
		<div class="p-6 bg-slate-50">
			<form onsubmit={handleGenerateInvite} class="flex flex-col sm:flex-row gap-4">
				<button 
					type="submit" 
					disabled={inviteLoading}
					class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
				>
					{inviteLoading ? 'Generating...' : 'Generate Invite Link'}
				</button>
			</form>

			{#if inviteError}
				<div class="mt-4 text-sm text-red-600 font-medium">
					{inviteError}
				</div>
			{/if}

			{#if inviteLink}
				<div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
					<p class="text-sm text-green-800 font-medium mb-2">Invite generated successfully!</p>
					<p class="text-xs text-green-700 mb-3">Send this link to the user to join your workspace:</p>
					<div class="flex gap-2">
						<input type="text" readonly value={inviteLink} class="flex-1 px-3 py-2 text-sm bg-white border border-green-300 rounded-md outline-none" />
						<button class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors" onclick={() => navigator.clipboard.writeText(inviteLink)}>
							Copy
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Users List -->
	<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
		<div class="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
			<h2 class="text-lg font-semibold text-slate-900">Team Members</h2>
		</div>

		{#if loading}
			<div class="p-8 text-center text-slate-500">Loading users...</div>
		{:else if error}
			<div class="p-8">
				<Alert type="error" message={error} />
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm text-slate-600">
					<thead class="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
						<tr>
							<th class="px-6 py-4">User</th>
							<th class="px-6 py-4">Role</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-200">
						{#each users as user}
							<tr class="hover:bg-slate-50 transition-colors">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
											{user.name ? user.name.charAt(0).toUpperCase() : 'U'}
										</div>
										<div>
											<div class="font-medium text-slate-900">{user.name || 'Unnamed User'}</div>
											<div class="text-slate-500 text-xs">{user.email}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="relative w-48">
										<select 
											value={user.role_id} 
											onchange={(e) => handleUpdateRole(user.id, (e.target as HTMLSelectElement).value)}
											class="w-full appearance-none px-3 py-2 bg-white border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
										>
											{#each roles as role}
												<option value={role.id}>{role.name}</option>
											{/each}
										</select>
										<div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-500">
											<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
										</div>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
