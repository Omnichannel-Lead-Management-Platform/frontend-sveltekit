<script lang="ts">
	import { onMount } from 'svelte';
	import { apiRequest } from '$lib/api/auth';
	import Alert from '$lib/components/Alert.svelte';

	let loading = $state(true);
	let saving = $state(false);
	let error = $state('');
	let success = $state('');

	// Form fields
	let workspaceName = $state('');
	let defaultTimeZone = $state('UTC');
	let language = $state('English');
	let dateFormat = $state('DD MMM YYYY');
	let timeFormat = $state('12');
	let workspaceType = $state('full');

	async function loadSettings() {
		try {
			loading = true;
			const res = await apiRequest('/api/auth/workspace', 'GET');
			workspaceName = res.data?.name || '';
			const settings = res.data?.settings || {};
			defaultTimeZone = settings.timezone || 'UTC';
			workspaceType = settings.business_type === 'Chatbot Only' ? 'chatbot' : 'full';
		} catch (err: any) {
			error = err.message || 'Failed to load workspace settings';
		} finally {
			loading = false;
		}
	}

	async function saveSettings(e: Event) {
		e.preventDefault();
		saving = true;
		error = '';
		success = '';
		
		try {
			await apiRequest('/api/auth/workspace', 'PUT', {
				name: workspaceName,
				settings: {
					timezone: defaultTimeZone,
					business_type: workspaceType === 'chatbot' ? 'Chatbot Only' : 'Agency'
				}
			});
			success = 'Settings saved successfully.';
		} catch (err: any) {
			error = err.message || 'Failed to save settings.';
		} finally {
			saving = false;
		}
	}

	onMount(() => {
		loadSettings();
	});
</script>

<svelte:head>
	<title>General Settings - Omnichannel</title>
</svelte:head>

<div class="p-6 md:p-10 max-w-6xl mx-auto w-full">
	
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
		<p class="text-sm text-slate-500 mt-1">Manage your workspace and preferences.</p>
	</div>

	<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
		
		<!-- Left / Main Settings Column -->
		<div class="xl:col-span-2 space-y-8">
			
			<div class="wf-card p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
				<h2 class="text-lg font-medium text-slate-900 mb-6">General</h2>

				{#if error}
					<div class="mb-4"><Alert type="error" message={error} /></div>
				{/if}
				{#if success}
					<div class="mb-4"><Alert type="success" message={success} /></div>
				{/if}

				{#if loading}
					<div class="py-12 text-center text-slate-400">Loading settings...</div>
				{:else}
					<form onsubmit={saveSettings} class="space-y-6">
						
						<!-- Workspace Name -->
						<div>
							<label class="block text-sm font-medium text-slate-700 mb-2">Workspace name</label>
							<input type="text" bind:value={workspaceName} class="wf-input py-2.5 px-3 text-sm w-full" />
						</div>

						<!-- Time zone -->
						<div>
							<label class="block text-sm font-medium text-slate-700 mb-2">Default time zone</label>
							<div class="relative">
								<select bind:value={defaultTimeZone} class="wf-input py-2.5 px-3 text-sm appearance-none w-full bg-white">
									<option value="UTC">UTC</option>
									<option value="EST">EST</option>
									<option value="PST">PST</option>
								</select>
								<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
								</div>
							</div>
						</div>

						<!-- Language -->
						<div>
							<label class="block text-sm font-medium text-slate-700 mb-2">Language</label>
							<div class="relative">
								<select bind:value={language} class="wf-input py-2.5 px-3 text-sm appearance-none w-full bg-white">
									<option value="English">English</option>
								</select>
								<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
								</div>
							</div>
						</div>

						<!-- Date format -->
						<div>
							<label class="block text-sm font-medium text-slate-700 mb-2">Date format</label>
							<div class="relative">
								<select bind:value={dateFormat} class="wf-input py-2.5 px-3 text-sm appearance-none w-full bg-white">
									<option value="DD MMM YYYY">DD MMM YYYY (e.g. 20 May 2024)</option>
								</select>
								<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
								</div>
							</div>
						</div>

						<!-- Time format -->
						<div>
							<label class="block text-sm font-medium text-slate-700 mb-2">Time format</label>
							<div class="flex items-center gap-6">
								<label class="flex items-center gap-2 cursor-pointer">
									<input type="radio" bind:group={timeFormat} value="12" class="text-blue-600 focus:ring-blue-600" />
									<span class="text-sm text-slate-700">12 hour (1:30 PM)</span>
								</label>
								<label class="flex items-center gap-2 cursor-pointer">
									<input type="radio" bind:group={timeFormat} value="24" class="text-blue-600 focus:ring-blue-600" />
									<span class="text-sm text-slate-700">24 hour (13:30)</span>
								</label>
							</div>
						</div>

						<!-- Workspace type -->
						<div>
							<label class="block text-sm font-medium text-slate-700 mb-2">Workspace type</label>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<label class="relative cursor-pointer">
									<input type="radio" bind:group={workspaceType} value="full" class="peer sr-only" />
									<div class="p-4 border rounded-xl flex items-start gap-3 transition-all duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-50/30 peer-checked:ring-1 peer-checked:ring-blue-600 border-slate-200 bg-white">
										<div class="mt-0.5"><input type="radio" checked={workspaceType === 'full'} class="pointer-events-none text-blue-600 focus:ring-blue-600" /></div>
										<div>
											<div class="text-sm font-medium text-slate-900">Full workspace</div>
											<div class="text-xs text-slate-500 mt-0.5">Inbox and lead tracking</div>
										</div>
									</div>
								</label>
								
								<label class="relative cursor-pointer">
									<input type="radio" bind:group={workspaceType} value="chatbot" class="peer sr-only" />
									<div class="p-4 border rounded-xl flex items-start gap-3 transition-all duration-200 peer-checked:border-slate-800 peer-checked:bg-slate-50 peer-checked:ring-1 peer-checked:ring-slate-800 border-slate-200 bg-white">
										<div class="mt-0.5"><input type="radio" checked={workspaceType === 'chatbot'} class="pointer-events-none text-slate-800 focus:ring-slate-800" /></div>
										<div>
											<div class="text-sm font-medium text-slate-900">Chatbot only</div>
											<div class="text-xs text-slate-500 mt-0.5">Automated replies only</div>
										</div>
									</div>
								</label>
							</div>
						</div>

						<div class="pt-4 flex justify-end">
							<button type="submit" disabled={saving} class="wf-button-primary px-6 py-2.5 text-sm">
								{saving ? 'Saving...' : 'Save changes'}
							</button>
						</div>

					</form>
				{/if}
			</div>
			
		</div>

		<!-- Right Column: Stats & Danger Zone -->
		<div class="space-y-6">
			
			<!-- Plan Info -->
			<div class="wf-card p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
				<div class="flex items-start justify-between mb-4">
					<div>
						<h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Workspace plan</h3>
						<div class="text-lg font-medium text-slate-900 mt-1">Pro Plan</div>
					</div>
					<button class="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Manage</button>
				</div>
				<ul class="space-y-2 mt-4">
					<li class="flex items-center gap-2 text-sm text-slate-600"><svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> AI Auto-reply</li>
					<li class="flex items-center gap-2 text-sm text-slate-600"><svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Unlimited channels</li>
					<li class="flex items-center gap-2 text-sm text-slate-600"><svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Team members: 10</li>
					<li class="flex items-center gap-2 text-sm text-slate-600"><svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Advanced automation</li>
				</ul>
			</div>

			<!-- Storage Info -->
			<div class="wf-card p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
				<h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Storage</h3>
				<div class="text-sm font-medium text-slate-800 mb-3">4.2 GB of 20 GB used</div>
				<div class="w-full bg-slate-100 rounded-full h-2 mb-1">
					<div class="bg-blue-600 h-2 rounded-full" style="width: 21%"></div>
				</div>
				<div class="text-[11px] text-slate-400 text-right">21%</div>
			</div>

			<!-- Danger Zone -->
			<div class="wf-card p-6 bg-red-50/50 border border-red-100 rounded-xl shadow-sm">
				<h3 class="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3">Danger zone</h3>
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm font-medium text-slate-900">Delete workspace</div>
						<div class="text-xs text-slate-500 mt-0.5">This action cannot be undone.</div>
					</div>
					<button class="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 bg-white px-4 py-2 rounded-lg transition-colors">Delete</button>
				</div>
			</div>

		</div>
	</div>

</div>
