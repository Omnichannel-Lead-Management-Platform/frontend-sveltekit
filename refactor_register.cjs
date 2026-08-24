const fs = require('fs');
const path = 'c:/Users/sasmi/OneDrive/Documents/Ominichannel/frontend-sveltekit/src/routes/register/+page.svelte';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
content = content.replace(
	/import \{ register \} from '\$lib\/api\/auth\.js';/,
	`import { register } from '$lib/api/auth.js';\n\timport { goto } from '$app/navigation';\n\timport { onboardingStore } from '$lib/stores/onboarding';`
);

// 2. Add workspaceType state
content = content.replace(
	/let showConfirmPassword = \$state\(false\);/,
	`let showConfirmPassword = $state(false);\n\tlet workspaceType = $state('full');`
);

// 3. Update handleRegister redirect
content = content.replace(
	/window\.location\.href = '\/';/,
	`onboardingStore.update(s => ({ ...s, businessName: companyName || name, businessType: 'Agency', timezone: 'UTC' }));\n\t\t\t\tgoto('/onboarding/1');`
);

content = content.replace(
	/successMessage = res\.message \|\| "Successfully signed up to the system and logged in!";/,
	`successMessage = "Account created! Moving to onboarding...";`
);

// 4. Inject Workspace Type UI right before the submit button
const workspaceUI = `
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

						<!-- Submit Button -->`;

content = content.replace(/<!-- Submit Button -->/, workspaceUI);

fs.writeFileSync(path, content);
console.log('Register page updated successfully.');
