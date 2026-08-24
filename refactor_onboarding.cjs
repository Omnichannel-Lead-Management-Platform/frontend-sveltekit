const fs = require('fs');
const path = 'c:/Users/sasmi/OneDrive/Documents/Ominichannel/frontend-sveltekit/src/routes/onboarding/[step]/+page.svelte';
let content = fs.readFileSync(path, 'utf8');

// Replace handleContinue
content = content.replace(/async function handleContinue\(\) \{[\s\S]*?catch \(err: any\) \{[\s\S]*?\}\s*\}/, `async function handleContinue() {
		error = '';
		submitting = true;

		try {
			if (stepNum === 1) {
				onboardingStore.update(s => ({ ...s, businessName: s1BusinessName, businessType: s1BusinessType, timezone: s1Timezone }));
				goToStep(2);
			} else if (stepNum === 2) {
				onboardingStore.update(s => ({ ...s, channels: channels.filter(c => c.connected).map(c => c.id) }));
				goToStep(3);
			} else if (stepNum === 3) {
				goToStep(4);
			} else if (stepNum === 4) {
				onboardingStore.update(s => ({ ...s, aiMode: s4AiMode }));
				goToStep(5);
			} else if (stepNum === 5) {
				goToStep(6);
			} else if (stepNum === 6) {
                let data;
                const unsub = onboardingStore.subscribe(val => { data = val; });
				unsub();
                
				await updateWorkspace(data.businessName || 'My Workspace', {
                    business_type: data.businessType,
                    timezone: data.timezone,
                    channels: data.channels,
                    ai_mode: data.aiMode
                });
				
				goto('/settings');
			}
		} catch (err) {
			error = err?.message || 'Something went wrong';
		} finally {
			submitting = false;
		}
	}`);

// Replace onMount
content = content.replace(/onMount\(async \(\) => \{[\s\S]*?finally \{\s*loading = false;\s*\}\s*\}\);/, `onMount(() => {
		setTimeout(() => { loading = false; }, 200);
	});`);

// Replace skipWaitingToDashboard
content = content.replace(/async function skipWaitingToDashboard\(\) \{[\s\S]*?\}\s*\}/, `async function skipWaitingToDashboard() {
		goto('/settings');
	}`);

// Replace startCompilingKB
content = content.replace(/async function startCompilingKB\(\) \{[\s\S]*?finally \{\s*s5Compiling = false;\s*\}\s*\}/, `async function startCompilingKB() {
        s5Compiling = true;
		s5Status = 'processing';
		s5Error = '';
        setTimeout(() => {
            s5Concepts = [
                { title: 'Business Knowledge Overview', category: 'General', tags: ['knowledge'], body_markdown: s5RawText.trim() }
            ];
            s5Status = 'results';
            s5Compiling = false;
        }, 800);
	}`);

fs.writeFileSync(path, content);
console.log('Script block updated successfully.');
