<script>
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	// This is a simple placeholder for the Dashboard overview.
	// You can expand this with the Inbox and unified view later.
</script>

<svelte:head>
	<title>Dashboard - Omnichannel</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
	
	<!-- Sidebar Dashboard -->
	<aside class="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 min-h-screen">
		<div class="p-6">
			<BrandLogo size="sm" />
		</div>
		
		<nav class="px-4 space-y-1 mt-4">
			
			<a href="/" class="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg">
				<svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
				Overview
			</a>

			<a href="/inbox" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
				<svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
				Inbox
			</a>
			
			<a href="/settings" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
				<svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
				Settings
			</a>
		</nav>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 p-6 md:p-10">
		<h1 class="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
		<p class="text-slate-500 mt-2">Welcome to your workspace.</p>
	</main>
</div>
