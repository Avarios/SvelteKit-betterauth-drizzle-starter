<script lang="ts">
	import Toast from '$lib/components/Toast.svelte';
	import type { LayoutProps } from './$types';

	import '../app.css';
	let { data, children }: LayoutProps = $props();
</script>

<div class="app">
	<main class="flex flex-col min-h-screen">
		{@render children()}
	</main>
	<Toast />

	<footer class="bg-gray-900 text-white py-12 border-t border-gray-800 relative z-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="flex items-center mb-4 md:mb-0">
					<div class="p-2 bg-linear-to-bg from-indigo-500 to-purple-600 rounded-xl mr-3">
						<svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div>
						<p class="text-sm text-gray-300">
							&copy; {new Date().getFullYear()} Arrangemently. All rights reserved.
						</p>
					</div>
				</div>
				<div class="flex items-center space-x-6">
					<nav>
						<ul class="flex space-x-6">
							<li>
								<a
									href="#"
									class="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
									>Terms of Service</a
								>
							</li>
							<li>
								<a
									href="#"
									class="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
									>Privacy Policy</a
								>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</footer>
</div>
