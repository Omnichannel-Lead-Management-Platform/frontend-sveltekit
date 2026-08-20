<script>
	import { register } from '$lib/api/auth.js';
	import Alert from '$lib/components/Alert.svelte';
	
	let name = $state('');
	let companyName = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

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
			const res = await register(email, password, confirmPassword, name, companyName);
			successMessage = res.message || "Successfully signed up to the system and logged in!";
			
			// Wait 2 seconds so the user can read the success notification
			setTimeout(() => {
				// Since Authboss automatically logs the user in upon registration,
				// we redirect to the dashboard instead of the login page.
				window.location.href = '/'; 
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

<div class="page-container animate-enter">
	<div class="glass-panel login-card">
		<div class="login-header">
			<h1 class="heading-gradient">Create Account</h1>
			<p>Join the Omnichannel platform today</p>
		</div>

		<form onsubmit={handleRegister} class="login-form">
			<div class="input-group">
				<label for="name">Full Name</label>
				<input 
					type="text" 
					id="name" 
					bind:value={name} 
					class="input-premium" 
					placeholder="John Doe"
					required 
				/>
			</div>

			<div class="input-group">
				<label for="companyName">Company Name</label>
				<input 
					type="text" 
					id="companyName" 
					bind:value={companyName} 
					class="input-premium" 
					placeholder="Acme Corp"
					required 
				/>
			</div>

			<div class="input-group">
				<label for="email">Email Address</label>
				<input 
					type="email" 
					id="email" 
					bind:value={email} 
					class="input-premium" 
					placeholder="you@example.com"
					required 
				/>
			</div>

			<div class="input-group">
				<label for="password">Password</label>
				<input 
					type="password" 
					id="password" 
					bind:value={password} 
					class="input-premium" 
					placeholder="••••••••"
					required 
				/>
				<p class="password-help">Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one symbol.</p>
			</div>

			<div class="input-group">
				<label for="confirmPassword">Confirm Password</label>
				<input 
					type="password" 
					id="confirmPassword" 
					bind:value={confirmPassword} 
					class="input-premium" 
					placeholder="••••••••"
					required 
				/>
			</div>

			<Alert type="error" message={errorMessage} />
			<Alert type="success" message={successMessage} submessage="Redirecting to your dashboard..." />

			<button type="submit" class="btn-premium" disabled={isLoading}>
				{#if isLoading}
					<span class="spinner"></span> Creating Account...
				{:else}
					Sign Up
				{/if}
			</button>
		</form>

		<div class="login-footer">
			<p>Already have an account? <a href="/login">Sign in</a></p>
		</div>
	</div>
</div>

<style>
	/* Inheriting layout styles directly similar to login */
	.page-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 20px;
	}

	.login-card {
		width: 100%;
		max-width: 440px;
		padding: 48px;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.login-header {
		text-align: center;
	}

	.login-header h1 {
		font-size: 2.25rem;
		margin-bottom: 8px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.login-header p {
		color: var(--text-secondary);
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.input-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.login-footer {
		text-align: center;
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: 8px;
	}

	.login-footer a {
		color: var(--accent-primary);
		text-decoration: none;
		font-weight: 500;
		transition: var(--transition-smooth);
	}

	.login-footer a:hover {
		color: var(--accent-secondary);
	}

	.spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: white;
		animation: spin 1s ease-in-out infinite;
		margin-right: 8px;
		vertical-align: middle;
	}

	.password-help {
		font-size: 0.75rem;
		color: var(--text-secondary);
		opacity: 0.8;
		margin-top: 4px;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
