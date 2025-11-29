<script lang="ts">
	import { CalendarDays } from 'lucide-svelte';
	import FormErrorField from '$lib/components/FormErrorField.svelte';
	import Primary from '$lib/components/Button.svelte';
	import { loginBusinessUser } from './login.remote';
	import { useToast } from '$lib/toast.svelte';
	import { goto } from '$app/navigation';
	let { addToast } = useToast();
	let { email, password } = loginBusinessUser.fields;
	let isFormError = $derived.by(() => {
		return (email.issues()?.length ?? 0) > 0 || (password.issues()?.length ?? 0) > 0;
	});
</script>

<div
	class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
>
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="flex justify-center mb-8">
			<div class="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
				<CalendarDays class="h-10 w-10 text-white" />
			</div>
		</div>
		<h2
			class="text-center text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-2 leading-tight"
		>
			Sign in to your account
		</h2>
		<p class="text-center text-gray-600 mb-8">Welcome back to your scheduling platform</p>
	</div>

	<form
		oninput={() => loginBusinessUser.validate({ includeUntouched:false })}
		{...loginBusinessUser.enhance(async ({ submit }) => {
			await submit();
			const backendIssues = loginBusinessUser.fields.issues();
			if (backendIssues?.length) {
				backendIssues.forEach((issue) => {
					addToast(issue.message, 'error');
				});
			}
			if(!backendIssues) {
				goto('/');
			}
		})}
		class="sm:mx-auto sm:w-full sm:max-w-md"
	>
		<div class="bg-white py-10 px-8 shadow-xl rounded-2xl border border-gray-100">
			<div class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-semibold text-gray-900 mb-2">
						Email address
					</label>
					<input
						{...email.as('email')}
						class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-500"
						placeholder="Enter your email"
					/>
					<FormErrorField issues={email.issues()?.map((x) => x.message)} />
				</div>

				<div>
					<label for="password" class="block text-sm font-semibold text-gray-900 mb-2">
						Password
					</label>
					<input
						{...password.as('password')}
						class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-500"
						placeholder="Enter your password"
					/>
					<FormErrorField issues={password.issues()?.map((x) => x.message)} />
				</div>

				<div class="pt-2">
					<Primary centered primary disabled={isFormError}>Sign in</Primary>
				</div>
			</div>
		</div>
	</form>
</div>
