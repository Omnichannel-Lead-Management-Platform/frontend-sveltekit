<script lang="ts">
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	import { page } from '$app/stores';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-slate-50 flex font-sans">
	
	<!-- Sidebar -->
	<aside class="relative w-56 flex flex-col justify-between p-4 bg-transparent shrink-0 overflow-hidden min-h-screen">
		<!-- Bottom Hero Illustration (anchored to bottom, full width, fading to background at top and bottom) -->
		<div class="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none z-0 overflow-hidden">
			<img
				src="/images/dashboard-sidebar-hero.webp"
				alt=""
				class="w-full h-auto object-cover object-bottom"
				style="mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 78%, transparent 100%);"
			/>
		</div>

		<div class="relative z-10 flex-1">
			<!-- What Funnel logo -->
			<a href="/" class="block px-2 pt-1 pb-6 w-full text-left" aria-label="Go to dashboard">
				<BrandLogo size="sm" />
			</a>

			<!-- Nav links -->
			<nav class="space-y-1">
				
				<!-- Inbox -->
				<a
					href="/inbox"
					class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 {$page.url.pathname.startsWith('/inbox') ? 'bg-blue-50/80 text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'}"
				>
					<svg class="w-5 h-5 {$page.url.pathname.startsWith('/inbox') ? 'text-blue-600' : 'text-slate-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
					</svg>
					<span>Inbox</span>
				</a>

				<!-- Leads -->
				<a
					href="/leads"
					class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 {$page.url.pathname.startsWith('/leads') ? 'bg-blue-50/80 text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'}"
				>
					<svg class="w-5 h-5 {$page.url.pathname.startsWith('/leads') ? 'text-blue-600' : 'text-slate-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span>Leads</span>
				</a>

				<!-- Automation -->
				<a
					href="/automation"
					class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 {$page.url.pathname.startsWith('/automation') ? 'bg-blue-50/80 text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'}"
				>
					<svg class="w-5 h-5 {$page.url.pathname.startsWith('/automation') ? 'text-blue-600' : 'text-slate-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					<span>Automation</span>
				</a>

				<!-- Knowledge -->
				<a
					href="/knowledge"
					class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 {$page.url.pathname.startsWith('/knowledge') ? 'bg-blue-50/80 text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'}"
				>
					<svg class="w-5 h-5 {$page.url.pathname.startsWith('/knowledge') ? 'text-blue-600' : 'text-slate-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
					</svg>
					<span>Knowledge</span>
				</a>

				<!-- Contacts -->
				<a
					href="/contacts"
					class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 {$page.url.pathname.startsWith('/contacts') ? 'bg-blue-50/80 text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'}"
				>
					<svg class="w-5 h-5 {$page.url.pathname.startsWith('/contacts') ? 'text-blue-600' : 'text-slate-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
					<span>Contacts</span>
				</a>

				<!-- Simulate (Dev) -->
				<a
					href="/simulate"
					class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 {$page.url.pathname.startsWith('/simulate') ? 'bg-purple-50/80 text-purple-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'}"
				>
					<div class="flex items-center gap-3">
						<svg class="w-5 h-5 {$page.url.pathname.startsWith('/simulate') ? 'text-purple-600' : 'text-slate-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
						</svg>
						<span>Simulate</span>
					</div>
					<span class="px-1.5 py-0.5 rounded text-[10px] font-medium {$page.url.pathname.startsWith('/simulate') ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'}">DEV</span>
				</a>

				<!-- Settings -->
				<a
					href="/settings"
					class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 {$page.url.pathname.startsWith('/settings') ? 'bg-blue-50/80 text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'}"
				>
					<svg class="w-5 h-5 {$page.url.pathname.startsWith('/settings') ? 'text-blue-600' : 'text-slate-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<span>Settings</span>
				</a>
			</nav>
		</div>
	</aside>

	<!-- Main Content Wrapper -->
	<main class="flex-1 bg-white border-l border-slate-200/80 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 flex flex-col min-w-0">
		{@render children()}
	</main>
</div>
