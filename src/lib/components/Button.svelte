<script lang="ts">
	let { onClick = undefined, children = undefined, href = undefined, disabled = false, centered = false, primary = false, highContrast = false } = $props();
	
	let classProps = {
		primary: {
			base: "px-8 py-4 rounded-xl font-semibold text-white shadow-lg relative border-blue-200 border-2",
			enabled: "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:rounded-xl",
			disabled: "bg-gray-400 cursor-not-allowed", 
			gradient: "absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl",
			group: "group",
			childWrapper: "relative z-10"
		},
		secondary: {
			base: "px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-200",
			enabled: highContrast 
				? "bg-transparent text-white border-white hover:bg-white hover:text-indigo-600 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
				: "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm hover:shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
			disabled: "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed",
			group: "",
			childWrapper: "",
			gradient: ""
		},
		centered: "mx-auto block"
	};
	
	const currentStyle = primary ? classProps.primary : classProps.secondary;
</script>

{#if href && !disabled}
	<a
		{href}
		class="{currentStyle.base} {currentStyle.enabled} {primary ? currentStyle.group : ''} {centered ? classProps.centered : ''}"
	>
		{#if primary}
			<span class={currentStyle.childWrapper}>{@render children?.()}</span>
			<div class={currentStyle.gradient}></div>
		{:else}
			{@render children?.()}
		{/if}
	</a>
{:else if href && disabled}
	<span
		class="{currentStyle.base} {currentStyle.disabled} {centered ? classProps.centered : ''}"
	>
		{#if primary}
			<span class={currentStyle.childWrapper}>{@render children?.()}</span>
		{:else}
			{@render children?.()}
		{/if}
	</span>
{:else}
	<button
		class="{currentStyle.base} {primary ? currentStyle.group : ''} {disabled ? currentStyle.disabled : currentStyle.enabled} {centered ? classProps.centered : ''}"
		{disabled}
		onclick={onClick}
	>
		{#if primary}
			<span class={currentStyle.childWrapper}>{@render children?.()}</span>
			{#if !disabled}
				<div class={currentStyle.gradient}></div>
			{/if}
		{:else}
			{@render children?.()}
		{/if}
	</button>
{/if}