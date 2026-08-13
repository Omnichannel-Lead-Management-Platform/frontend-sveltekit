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
			throw new Error(errorData?.error || 'Login failed. Please check your credentials.');
		}

		return await response.json();
	} catch (error) {
		console.error('Login Error:', error);
		throw error;
	}
}

export async function register(email, password, name, companyName) {
	try {
		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
				email, 
				password, 
				name, 
				company_name: companyName 
			}),
			credentials: 'include'
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(errorData?.error || 'Registration failed. Please try again.');
		}

		return await response.json();
	} catch (error) {
		console.error('Registration Error:', error);
		throw error;
	}
}
