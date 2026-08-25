<script>
	import { register } from '$lib/api/auth.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onboardingStore } from '$lib/stores/onboarding';
	import Alert from '$lib/components/Alert.svelte';
	import BrandLogo from '$lib/components/BrandLogo.svelte';
	import heroImage from '$lib/assets/sign-in-hero.webp'; // Reusing the hero image for signup as in reference

	let name = $state('');
	let companyName = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let workspaceType = $state('full');
	let inviteToken = $derived($page.url.searchParams.get('invite_token'));

	async function handleRegister(e) {
		e.preventDefault();
		errorMessage = '';
		successMessage = '';

		if (password !== confirmPassword) {
			errorMessage = "Passwords do not match.";
			return;
		}

		if (password.length < 8) {
			errorMessage = "Password must be at least 8 characters long.";
			return;
		}

		isLoading = true;
		
		try {
			const res = await register(email, password, confirmPassword, name, companyName, inviteToken);
			successMessage = "Account created! Moving to onboarding...";
			
			// Wait 2 seconds so the user can read the success notification
			setTimeout(() => {
				if (inviteToken) {
					// User joined via invite, skip onboarding
					goto('/login');
				} else {
					onboardingStore.update(s => ({ ...s, businessName: companyName || name, businessType: 'Agency', timezone: 'UTC' }));
					goto('/onboarding/1'); 
				}
			}, 2000);
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign Up - Omnichannel</title>
</svelte:head>

<div class="wf-page flex items-center justify-center p-4 selection:bg-blue-100 selection:text-blue-900 sm:p-8 lg:p-12">
	<div class="w-full max-w-[1360px] mx-auto relative">
		
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
			
			<!-- Left Column: Brand, Headline, 3D Hero Image -->
			<div class="lg:col-span-7 flex flex-col justify-between h-full relative">
				
				<!-- Top Content -->
				<div class="pt-6 sm:pt-10 lg:pt-12">
					<!-- Top Bar: Brand Logo & Decorative Dots -->
					<div class="flex items-center justify-between">
						<BrandLogo size="lg" />

						<!-- Decorative 4x3 Dot Matrix -->
						<div class="hidden sm:grid grid-cols-4 gap-2 w-fit opacity-40 pr-4">
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
							<div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
						</div>
					</div>

					<!-- Hero Headline and Subhead -->
					<div class="mt-6 sm:mt-8">
						<h1 class="text-3xl sm:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight leading-[1.15]">
							Join the platform.<br />
							<span class="text-blue-600">Start building.</span> Right now.
						</h1>
						<p class="text-slate-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl mt-3.5">
							Create your account to unlock the full potential of Omnichannel.
						</p>
					</div>
				</div>

				<!-- 3D Hero Illustration -->
				<div class="relative w-full flex items-center justify-center mt-2 lg:mt-0 pointer-events-none">
					<img
						src={heroImage}
						alt="Omnichannel Platform in 3D"
						class="w-full max-h-[520px] lg:max-h-[580px] object-contain"
						loading="eager"
					/>
					
					<!-- Decorative 2x2 Green Dots -->
					<div class="absolute bottom-4 left-2 grid grid-cols-2 gap-1.5 opacity-60">
						<div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
						<div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
						<div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
						<div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
					</div>
				</div>
			</div>

			<!-- Right Column: Sign Up Card -->
			<div class="lg:col-span-5 flex justify-center lg:justify-end items-center">
				<div class="wf-card w-full max-w-[440px] p-7 sm:p-9">
					
					<!-- Form Header -->
					<div>
						<h2 class="text-2xl font-medium text-slate-900 tracking-tight">Create Account</h2>
						<p class="text-slate-500 text-sm mt-1">Join the Omnichannel platform today</p>
					</div>

					<Alert type="error" message={errorMessage} />
					<Alert type="success" message={successMessage} submessage="Redirecting to your dashboard..." />

					<!-- Signup Form -->
					<form onsubmit={handleRegister} class="mt-6 space-y-4">
						
						<!-- Full Name Input -->
						<div>
							<label for="name-input" class="block text-xs font-medium text-slate-700 mb-1.5">Full Name</label>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
										<circle cx="12" cy="7" r="4" />
									</svg>
								</div>
								<input
									type="text"
									id="name-input"
									bind:value={name}
									placeholder="John Doe"
									required
									disabled={isLoading}
									class="wf-input py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400"
								/>
							</div>
						</div>

						<!-- Business Name Input -->
						<div>
							<label for="company-name-input" class="block text-xs font-medium text-slate-700 mb-1.5">Company Name</label>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
										<path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
									</svg>
								</div>
								<input
									type="text"
									id="company-name-input"
									bind:value={companyName}
									placeholder="Acme Corp"
									required
									disabled={isLoading}
									class="wf-input py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400"
								/>
							</div>
						</div>

						<!-- Email Input -->
						<div>
							<label for="signup-email-input" class="block text-xs font-medium text-slate-700 mb-1.5">Email Address</label>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<rect width="20" height="16" x="2" y="4" rx="2" />
										<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
									</svg>
								</div>
								<input
									type="email"
									id="signup-email-input"
									bind:value={email}
									placeholder="you@email.com"
									required
									disabled={isLoading}
									class="wf-input py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400"
								/>
							</div>
						</div>

						<!-- Password Input -->
						<div>
							<label for="signup-password-input" class="block text-xs font-medium text-slate-700 mb-1.5">Password</label>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
										<path d="M7 11V7a5 5 0 0 1 10 0v4" />
									</svg>
								</div>
								<input
									type={showPassword ? 'text' : 'password'}
									id="signup-password-input"
									bind:value={password}
									placeholder="At least 8 characters"
									required
									disabled={isLoading}
									class="wf-input py-2.5 pl-10 pr-11 text-sm placeholder:text-slate-400"
								/>
								<button
									type="button"
									onclick={() => (showPassword = !showPassword)}
									class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
									aria-label={showPassword ? 'Hide password' : 'Show password'}
								>
									{#if showPassword}
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
											<line x1="1" y1="1" x2="23" y2="23" />
										</svg>
									{:else}
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									{/if}
								</button>
							</div>
							<p class="text-[11px] text-slate-500 opacity-80 mt-1.5 ml-1">Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one symbol.</p>
						</div>

						<!-- Confirm Password Input -->
						<div>
							<label for="confirm-password-input" class="block text-xs font-medium text-slate-700 mb-1.5">Confirm Password</label>
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="M20 6L9 17l-5-5" />
									</svg>
								</div>
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									id="confirm-password-input"
									bind:value={confirmPassword}
									placeholder="Confirm your password"
									required
									disabled={isLoading}
									class="wf-input py-2.5 pl-10 pr-11 text-sm placeholder:text-slate-400"
								/>
								<button
									type="button"
									onclick={() => (showConfirmPassword = !showConfirmPassword)}
									class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
									aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
								>
									{#if showConfirmPassword}
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
											<line x1="1" y1="1" x2="23" y2="23" />
										</svg>
									{:else}
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									{/if}
								</button>
							</div>
						</div>

						
						<!-- Workspace Type Selection -->
						<div class="pt-2">
							<label class="block text-xs font-medium text-slate-700 mb-2">Workspace Type</label>
							<div class="grid grid-cols-2 gap-3">
								<!-- Full Workspace Option -->
								<label class="relative cursor-pointer">
									<input type="radio" bind:group={workspaceType} value="full" class="peer sr-only" name="workspaceType" />
									<div class="p-3 border rounded-xl flex items-start gap-2.5 transition-all duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-50/50 peer-checked:ring-1 peer-checked:ring-blue-600 border-slate-200 hover:border-slate-300 bg-white">
										<div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
											<svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
										</div>
										<div class="flex-1 mt-0.5">
											<div class="text-xs font-semibold text-slate-900">Full Workspace</div>
											<div class="text-[10px] text-slate-500 mt-0.5 leading-tight">Inbox & leads</div>
										</div>
									</div>
								</label>

								<!-- Chatbot Only Option -->
								<label class="relative cursor-pointer">
									<input type="radio" bind:group={workspaceType} value="chatbot" class="peer sr-only" name="workspaceType" />
									<div class="p-3 border rounded-xl flex items-start gap-2.5 transition-all duration-200 peer-checked:border-slate-800 peer-checked:bg-slate-50 peer-checked:ring-1 peer-checked:ring-slate-800 border-slate-200 hover:border-slate-300 bg-white">
										<div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
											<svg class="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
										</div>
										<div class="flex-1 mt-0.5">
											<div class="text-xs font-semibold text-slate-900">Chatbot Only</div>
											<div class="text-[10px] text-slate-500 mt-0.5 leading-tight">Automations</div>
										</div>
									</div>
								</label>
							</div>
						</div>

						<!-- Submit Button -->
						<button
							type="submit"
							disabled={isLoading}
							class="wf-button-primary mt-4 w-full py-3 text-sm hover:shadow-sm"
						>
							{#if isLoading}
								<svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span>Creating Account...</span>
							{:else}
								<span>Sign Up</span>
							{/if}
						</button>
					</form>

					<!-- Bottom Sign In Link -->
					<div class="mt-8 text-center text-xs sm:text-sm text-slate-500">
						Already have an account? <a href="/login" class="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors">Sign in</a>
					</div>

				</div>
			</div>

		</div>
	</div>
</div>
