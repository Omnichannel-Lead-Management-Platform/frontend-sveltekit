import { apiRequest } from './auth.js';

/**
 * Fetches the current workspace
 */
export async function getWorkspace() {
    return await apiRequest('/api/auth/workspace', 'GET');
}

/**
 * Updates the workspace name and settings
 */
export async function updateWorkspace(name, settings) {
    return await apiRequest('/api/auth/workspace', 'PUT', {
        name,
        settings
    });
}
