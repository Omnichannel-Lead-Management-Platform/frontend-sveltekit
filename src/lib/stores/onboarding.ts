import { writable } from 'svelte/store';

// This store captures all data across the onboarding steps.
export const onboardingStore = writable({
    businessName: '',
    businessType: 'Agency',
    timezone: '(GMT+00:00) UTC',
    channels: [], // connected channels
    aiMode: 'auto_answer',
    knowledgeBaseRawText: ''
});
