<script>
	import { onMount } from 'svelte';

	let isLoggedIn = false;
	let username = 'user';
	let password = 'pass';

	onMount(async () => {
		const response = await fetch('http://localhost:3000/dashboard', {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});

		if (response.ok) {
			isLoggedIn = true;
		}
	});

	async function login() {
		const response = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include',
		});

		if (response.ok) {
			isLoggedIn = true;
		} else {
			alert('Login failed');
		}
	}

	async function logout() {
		const response = await fetch('http://localhost:3000/logout', {
			method: 'POST',
			credentials: 'include',
		});

		if (response.ok) {
			isLoggedIn = false;
		} else {
			alert('Logout failed');
		}
	}
</script>

{#if isLoggedIn}
	<h1>Dashboard</h1>
	<button on:click={logout}>Logout</button>
	<p>Welcome to the dashboard!</p>
{:else}
	<h1>Login</h1>
	<form on:submit|preventDefault={login}>
		<label for="username">Username:</label>
		<input type="text" id="username" bind:value={username} required />
		<br />
		<label for="password">Password:</label>
		<input type="password" id="password" bind:value={password} required />
		<br />
		<button type="submit">Login</button>
	</form>
{/if}
