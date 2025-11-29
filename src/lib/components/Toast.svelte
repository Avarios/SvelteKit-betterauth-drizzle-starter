<script lang="ts">
	import { X, CircleCheck, CircleAlert, MessageCircleWarning, Info } from 'lucide-svelte';
	import { useToast } from '$lib/toast.svelte';

	const icons = {
		success: CircleCheck,
		error: CircleAlert,
		warning: MessageCircleWarning,
		info: Info
	};

	let { toasts, removeToast } = useToast();

	const colors = {
		success: 'bg-green-50 border-green-200 text-green-800',
		error: 'bg-red-50 border-red-200 text-red-800',
		warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
		info: 'bg-blue-50 border-blue-200 text-blue-800'
	};
</script>

<div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
	{#if toasts}
		{#each toasts as item, i}
			<div
				class="flex items-center p-4 border rounded-lg shadow-lg max-w-sm {colors[item.type]}"
				id={`toast_${i}`}
			>
				<svelte:component this={icons[item.type]} class="h-5 w-5 mr-3 shrink-0" />
				<p class="text-sm font-medium flex-1">{item.message}</p>
				<button
					onclick={() => {
						removeToast(item.id);
					}}
					class="ml-3 shrink-0"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		{/each}
	{/if}
</div>
