<script lang="ts">
	import { onMount } from 'svelte';
	import { apiRequest } from '$lib/api/auth';
	import Alert from '$lib/components/Alert.svelte';

	let users = $state([]);
	let loading = $state(true);
	let error = $state('');
	
	let inviteEmail = $state('');
	let inviteRole = $state('agent');
	let inviting = $state(false);
	let inviteSuccess = $state('');
	let inviteError = $state('');

	async function loadUsers() {
		try {
			loading = true;
			const res = await apiRequest('/api/auth/users', 'GET');
			users = res.data || [];
		} catch (err) {
			error = err.message || 'Failed to load team members';
		} finally {
			loading = false;
		}
	}

	async function updateRole(userId: string, newRole: string) {
		try {
			await apiRequest(`/api/auth/users/${userId}/role`, 'PUT', { role: newRole });
			// update local state
			users = users.map((u) => u.id === userId ? { ...u, role: newRole } : u);
		} catch (err) {
			error = err.message || 'Failed to update user role';
		}
	}

	async function handleInvite(e: Event) {
		e.preventDefault();
		inviting = true;
		inviteSuccess = '';
		inviteError = '';

		try {
			const res = await apiRequest('/api/auth/invite', 'POST', {
				email: inviteEmail,
				role: inviteRole
			});
			inviteSuccess = `Invitation sent to ${inviteEmail}. Token: ${res.data?.token}`;
			inviteEmail = '';
		} catch (err) {
			inviteError = err.message || 'Failed to send invite';
		} finally {
			inviting = false;
		}
	}

	onMount(() => {
		loadUsers();
	});
</script>

<svelte:head>
	<title>Users & Permissions - Omnichannel</title>
</svelte:head>

<div class="p-6 md:p-10 max-w-5xl mx-auto w-full">
	
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Users & Permissions</h1>
		<p class="text-sm text-slate-500 mt-1">Manage who has access to this workspace and what they can do.</p>
	</div>

	{#if error}
		<Alert type="error" message={error} />
	{/if}

	<!-- Invite Section -->
	<div class="wf-card p-6 mb-8 bg-white border border-slate-200 rounded-xl shadow-sm">
		<h2 class="text-lg font-medium text-slate-900 mb-4">Invite Member</h2>
		
		{#if inviteError}
			<Alert type="error" message={inviteError} />
		{/if}
		{#if inviteSuccess}
			<Alert type="success" message={inviteSuccess} />
		{/if}

		<form onsubmit={handleInvite} class="flex flex-col sm:flex-row gap-4 items-end">
			<div class="flex-1 w-full">
				<label for="invite-email" class="block text-xs font-medium text-slate-700 mb-1.5">Email Address</label>
				<input
					type="email"
					id="invite-email"
					bind:value={inviteEmail}
					placeholder="colleague@example.com"
					required
					disabled={inviting}
					class="wf-input py-2 px-3 text-sm placeholder:text-slate-400 w-full"
				/>
			</div>
			
			<div class="w-full sm:w-48">
				<label for="invite-role" class="block text-xs font-medium text-slate-700 mb-1.5">Role</label>
				<div class="relative">
					<select
						id="invite-role"
						bind:value={inviteRole}
						disabled={inviting}
						class="wf-input py-2 px-3 text-sm appearance-none w-full bg-white"
					>
						<option value="agent">Agent</option>
						<option value="admin">Admin</option>
					</select>
					<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
					</div>
				</div>
			</div>

			<button
				type="submit"
				disabled={inviting}
				class="wf-button-primary py-2 px-5 text-sm h-[38px] whitespace-nowrap"
			>
				{inviting ? 'Sending...' : 'Send Invite'}
			</button>
		</form>
	</div>

	<!-- Team List -->
	<div class="wf-card bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
		<div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
			<h2 class="text-sm font-semibold text-slate-800">Team Members</h2>
		</div>

		{#if loading}
			<div class="p-8 text-center text-slate-400 text-sm">
				<svg class="animate-spin h-6 w-6 mx-auto mb-2 text-blue-600" viewBox="0 0 24 24" fill="none">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Loading team members...
			</div>
		{:else if users.length === 0}
			<div class="p-8 text-center text-slate-500 text-sm">
				No team members found.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-slate-100">
							<th class="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">User</th>
							<th class="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Role</th>
							<th class="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Joined</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100">
						{#each users as user}
							<tr class="hover:bg-slate-50/50 transition-colors">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
											{user.name ? user.name.charAt(0).toUpperCase() : 'U'}
										</div>
										<div>
											<div class="text-sm font-medium text-slate-900">{user.name}</div>
											<div class="text-xs text-slate-500">{user.email}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="relative w-32">
										<select
											value={user.role}
											onchange={(e) => updateRole(user.id, e.target.value)}
											class="wf-input py-1.5 px-3 text-xs appearance-none w-full bg-white font-medium border-slate-200 hover:border-slate-300 focus:border-blue-500 cursor-pointer"
										>
											<option value="admin">Admin</option>
											<option value="agent">Agent</option>
										</select>
										<div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
											<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 text-sm text-slate-500">
									{new Date(user.createdAt).toLocaleDateString()}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>

</div>
