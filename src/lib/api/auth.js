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
			body: JSON.stringify({ email, password }),
			credentials: 'include' // Ensures cookies are saved/sent
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(errorData?.message || 'Login failed. Please check your credentials.');
		}

		return await response.json();
	} catch (error) {
		console.error('Login Error:', error);
		throw error;
	}
}

export async function register(email, password, confirmPassword, name, companyName) {
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
				company_name: companyName 
			}),
			credentials: 'include'
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(errorData?.message || 'Registration failed. Please try again.');
		}

		return await response.json();
	} catch (error) {
		console.error('Registration Error:', error);
		throw error;
	}
}

export async function apiRequest(endpoint, method = 'GET', body = null) {
	try {
		const options = {
			method,
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		};
		if (body) {
			options.body = JSON.stringify(body);
		}
		const res = await fetch(endpoint, options);
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
