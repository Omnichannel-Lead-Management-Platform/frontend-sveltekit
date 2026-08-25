<script>
	import '../../../app.css';
	import { page } from '$app/stores';
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	
	let { children } = $props();

	let currentPath = $derived($page.url.pathname);
	
	// Helper function for active link styles
	function getLinkClass(path, exact = false) {
		const isActive = exact ? currentPath === path : currentPath.startsWith(path);
		return isActive 
			? "flex items-center gap-3 px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg"
			: "flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors";
	}
</script>

<div class="h-full w-full bg-slate-50 flex flex-col md:flex-row font-sans">
	
	<!-- Sidebar -->
	<aside class="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 h-full">
		<div class="p-6">
			<BrandLogo size="sm" />
		</div>
		
		<nav class="px-4 space-y-1">
			<div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2 mt-4">Settings</div>
			
			<a href="/settings" class={getLinkClass('/settings', true)}>
				<svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
					<circle cx="12" cy="12" r="3"/>
				</svg>
				General
			</a>

			<a href="/settings/team" class={getLinkClass('/settings/team')}>
				<svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
					<path d="M16 3.13a4 4 0 0 1 0 7.75" />
				</svg>
				Users & Permissions
			</a>
			<a href="/settings/roles" class={getLinkClass('/settings/roles')}>
				<svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
				</svg>
				Roles
			</a>
			
			<div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2 mt-6">Personal</div>
			
			<a href="/settings/profile" class={getLinkClass('/settings/profile')}>
				<svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</svg>
				My Profile
			</a>
		</nav>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>
