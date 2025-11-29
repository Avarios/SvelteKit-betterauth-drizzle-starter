<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="grow">
	<div class="container">
		<Button primary href={'/authentication/login'}>To Login</Button>
		or
		<Button href={'/authentication/register'}>To Register</Button>
	</div>
</div>
