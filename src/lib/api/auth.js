/**
 * Helper functions for Go Authboss Backend Authentication
 */

export async function login(email, password) {
	try {
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(errorData?.message || 'Login failed. Please check your credentials.');
		}

		const resData = await response.json();
		// Save the token from the response
		if (resData.data && resData.data.token) {
			localStorage.setItem('auth_token', resData.data.token);
		}
		
		// Wait! Let's also check if X-Access-Token header is present in case it's there
		const headerToken = response.headers.get('X-Access-Token');
		if (headerToken) {
			localStorage.setItem('auth_token', headerToken);
		}

		return resData;
	} catch (error) {
		console.error('Login Error:', error);
		throw error;
	}
}

export async function register(email, password, confirmPassword, name, companyName, inviteToken = null) {
	try {
		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
				email, 
				password,
				confirm_password: confirmPassword, 
				name, 
				company_name: companyName,
				invite_token: inviteToken
			})
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(errorData?.message || 'Registration failed. Please try again.');
		}

		const resData = await response.json();
		
		if (resData.data && resData.data.token) {
			localStorage.setItem('auth_token', resData.data.token);
		}
		const headerToken = response.headers.get('X-Access-Token');
		if (headerToken) {
			localStorage.setItem('auth_token', headerToken);
		}

		// Automatically log the user in to get a fresh session and token!
		return await login(email, password);
	} catch (error) {
		console.error('Registration Error:', error);
		throw error;
	}
}

export function logout() {
	localStorage.removeItem('auth_token');
	// In a real app, you might also want to hit POST /api/auth/logout to invalidate the token on the server
	window.location.href = '/login';
}

export async function apiRequest(endpoint, method = 'GET', body = null) {
	try {
		const options = {
			method,
			headers: { 'Content-Type': 'application/json' }
		};
		
		// Attach token from localStorage
		const token = localStorage.getItem('auth_token');
		if (token) {
			options.headers['Authorization'] = `Bearer ${token}`;
		}

		if (body) {
			options.body = JSON.stringify(body);
		}
		const res = await fetch(endpoint, options);
		
		if (res.status === 401) {
			logout();
			throw new Error("Unauthorized");
		}
		
		if (!res.ok) {
			let err;
			try { err = await res.json(); } catch(e) {}
			throw new Error(err?.message || `API request failed with status ${res.status}`);
		}
		return await res.json();
	} catch (err) {
		throw err;
	}
}

// === NEW ENDPOINT WRAPPERS ===

export async function getMe() {
	return apiRequest('/api/auth/me', 'GET');
}

export async function generateInvite() {
	return apiRequest('/api/auth/invite', 'POST');
}

export async function listUsers() {
	return apiRequest('/api/auth/users', 'GET');
}

export async function updateUserRole(userId, roleId) {
	return apiRequest(`/api/auth/users/${userId}/role`, 'PUT', { role_id: roleId });
}

export async function getRoles() {
	return apiRequest('/api/auth/roles', 'GET');
}

export async function getPermissions() {
	return apiRequest('/api/auth/permissions', 'GET');
}

export async function getRolePermissions(roleId) {
	return apiRequest(`/api/auth/roles/${roleId}/permissions`, 'GET');
}

export async function createRole(name, permissions) {
	return apiRequest('/api/auth/roles', 'POST', { name, permissions });
}

export async function updateRolePermissions(roleId, permissions) {
	return apiRequest(`/api/auth/roles/${roleId}/permissions`, 'PUT', { permissions });
}

export async function deleteRole(roleId) {
	return apiRequest(`/api/auth/roles/${roleId}`, 'DELETE');
}
