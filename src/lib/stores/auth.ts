import { writable } from 'svelte/store';

export type UserProfile = {
	id: string;
	email: string;
	name: string;
	role_id: string;
	permissions: string[];
	workspace_id: string;
};

export const authStore = writable<{
	isAuthenticated: boolean;
	user: UserProfile | null;
}>({
	isAuthenticated: false,
	user: null
});
