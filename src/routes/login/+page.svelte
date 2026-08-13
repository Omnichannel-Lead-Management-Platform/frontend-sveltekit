<script>
	import { login } from '$lib/api/auth.js';
	
	let email = '';
	let password = '';
	let isLoading = false;
	let errorMessage = '';

	async function handleLogin(e) {
		e.preventDefault();
		isLoading = true;
		errorMessage = '';
		
		try {
			await login(email, password);
			// Redirect or update store on success
			window.location.href = '/dashboard'; 
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign In - Omnichannel</title>
</svelte:head>

<div class="page-container animate-enter">
	<div class="glass-panel login-card">
		<div class="login-header">
			<h1 class="heading-gradient">Welcome Back</h1>
			<p>Sign in to your Omnichannel account</p>
		</div>

		<form on:submit={handleLogin} class="login-form">
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
			</div>

			{#if errorMessage}
				<p class="text-error animate-enter">{errorMessage}</p>
			{/if}

			<button type="submit" class="btn-premium" disabled={isLoading}>
				{#if isLoading}
					<span class="spinner"></span> Logging in...
				{:else}
					Sign In
				{/if}
			</button>
		</form>

		<div class="login-footer">
			<p>Don't have an account? <a href="/register">Sign up now</a></p>
		</div>
	</div>
</div>

<style>
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

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
