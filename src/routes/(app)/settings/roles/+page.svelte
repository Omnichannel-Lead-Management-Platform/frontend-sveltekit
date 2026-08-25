<script lang="ts">
	import { onMount } from 'svelte';
	import { getRoles, getPermissions, createRole } from '$lib/api/auth.js';
	import Alert from '$lib/components/Alert.svelte';

	let roles = $state([]);
	let availablePermissions = $state([]);
	let loading = $state(true);
	let error = $state('');

	let newRoleName = $state('');
	let selectedPermissions = $state(new Set());
	let creating = $state(false);
	let createError = $state('');
	let createSuccess = $state('');

	onMount(async () => {
		await Promise.all([loadRoles(), loadPermissions()]);
		loading = false;
	});

	async function loadRoles() {
		try {
			const res = await getRoles();
			if (res.status === 'success') {
				roles = res.data || [];
			}
		} catch (err) {
			error = err?.message || 'Failed to load roles';
		}
	}

	async function loadPermissions() {
		try {
			const res = await getPermissions();
			if (res.status === 'success') {
				availablePermissions = res.data || [];
			}
		} catch (err) {
			error = err?.message || 'Failed to load permissions';
		}
	}

	function togglePermission(permName: string) {
		const newSet = new Set(selectedPermissions);
		if (newSet.has(permName)) {
			newSet.delete(permName);
		} else {
			newSet.add(permName);
		}
		selectedPermissions = newSet;
	}

	async function handleCreateRole(e: Event) {
		e.preventDefault();
		if (!newRoleName) return;

		creating = true;
		createError = '';
		createSuccess = '';

		try {
			const permsArray = Array.from(selectedPermissions);
			await createRole(newRoleName, permsArray);
			createSuccess = `Role "${newRoleName}" created successfully!`;
			newRoleName = '';
			selectedPermissions = new Set();
			await loadRoles();
		} catch (err) {
			createError = err?.message || 'Failed to create role';
		} finally {
			creating = false;
		}
	}
</script>

<svelte:head>
	<title>Roles & Permissions - Omnichannel</title>
</svelte:head>

<div class="max-w-5xl mx-auto p-6 md:p-8">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-slate-900">Roles</h1>
		<p class="text-slate-500 mt-1">Manage workspace roles and their specific permissions.</p>
	</div>

	{#if loading}
		<div class="p-8 text-center text-slate-500">Loading roles...</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			
			<!-- Roles List -->
			<div class="lg:col-span-1 space-y-4">
				<h2 class="text-lg font-semibold text-slate-900 mb-4">Existing Roles</h2>
				
				{#if error}
					<Alert type="error" message={error} />
				{/if}

				{#each roles as role}
					<div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
						<div class="flex justify-between items-start">
							<div class="font-medium text-slate-900">{role.name}</div>
							{#if role.is_system}
								<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">System</span>
							{/if}
						</div>
						{#if role.description && role.description.Valid}
							<div class="text-xs text-slate-500">{role.description.String}</div>
						{/if}
						<div class="mt-2 pt-2 border-t border-slate-100">
							<div class="text-[10px] font-mono text-slate-400 break-all">{role.id}</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Create Role Form -->
			<div class="lg:col-span-2">
				<div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
					<div class="px-6 py-5 border-b border-slate-200">
						<h2 class="text-lg font-semibold text-slate-900">Create Custom Role</h2>
					</div>
					
					<div class="p-6">
						{#if createError}
							<div class="mb-4"><Alert type="error" message={createError} /></div>
						{/if}
						{#if createSuccess}
							<div class="mb-4"><Alert type="success" message={createSuccess} /></div>
						{/if}

						<form onsubmit={handleCreateRole}>
							<div class="mb-6">
								<label for="roleName" class="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
								<input 
									type="text" 
									id="roleName" 
									bind:value={newRoleName} 
									placeholder="e.g. Marketing Manager" 
									required
									class="w-full md:w-1/2 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								>
							</div>

							<div class="mb-8">
								<label class="block text-sm font-medium text-slate-700 mb-3">Assign Permissions</label>
								
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{#each availablePermissions as perm}
										<label class="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
											<div class="flex items-center h-5">
												<input 
													type="checkbox" 
													class="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
													checked={selectedPermissions.has(perm.name)}
													onchange={() => togglePermission(perm.name)}
												>
											</div>
											<div class="flex flex-col">
												<span class="text-sm font-medium text-slate-900">{perm.name}</span>
												{#if perm.description && perm.description.Valid}
													<span class="text-xs text-slate-500 mt-0.5">{perm.description.String}</span>
												{/if}
											</div>
										</label>
									{/each}
								</div>
							</div>

							<button 
								type="submit" 
								disabled={creating || !newRoleName || selectedPermissions.size === 0}
								class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{creating ? 'Creating...' : 'Create Role'}
							</button>
						</form>
					</div>
				</div>
			</div>

		</div>
	{/if}
</div>
