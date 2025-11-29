<script lang="ts">
	let {
		issues
	}: {
		issues: string[] | undefined;
	} = $props();
</script>

{#if issues}
	{#each issues as issue}
		<p class="mt-1 text-sm text-red-600">{issue}</p>
	{/each}
{/if}
