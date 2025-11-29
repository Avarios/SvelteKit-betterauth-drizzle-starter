<script lang="ts">
	import { CalendarDays } from 'lucide-svelte';
	import { registerBusinessUser } from './register.remote';
	import { useToast } from '$lib/toast.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormErrorField from '$lib/components/FormErrorField.svelte';
	let { email, name, password, passwordRepeat } = registerBusinessUser.fields;

	let isFormError = $derived.by(() => {
		return (
			(email.issues()?.length ?? 0) > 0 ||
			(name.issues()?.length ?? 0) > 0 ||
			(password.issues()?.length ?? 0) > 0 ||
			(passwordRepeat.issues()?.length ?? 0) > 0
		);
	});
	let { addToast } = useToast();
</script>

<div
	class="min-h-screen bg-linear-to-br from-indigo-50 via-white to-cyan-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
>
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="flex justify-center mb-8">
			<div class="p-4 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
				<CalendarDays class="h-10 w-10 text-white" />
			</div>
		</div>

		<h2
			class="text-center text-4xl font-bold bg-linear-to-br from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-2"
		>
			Create your Account
		</h2>
	</div>

	<form
		oninput={() => registerBusinessUser.validate({ includeUntouched: false })}
		{...registerBusinessUser.enhance(async ({ submit }) => {
			await submit();
			const backendIssues = registerBusinessUser.fields.issues();
			if (backendIssues?.length) {
				backendIssues.forEach((issue) => {
					addToast(issue.message, 'error');
				});
			}
		})}
		class="sm:mx-auto sm:w-full sm:max-w-md"
	>
		<div class="bg-white py-10 px-8 shadow-xl rounded-2xl border border-gray-100">
			<div class="space-y-5">
				<div>
					<label class="block text-sm font-semibold text-gray-900 mb-2">
						Name
						<FormErrorField issues={name.issues()?.map((x) => x.message)} />
						<input
							onblur={() => registerBusinessUser.validate({ includeUntouched: false })}
							{...name.as('text')}
							class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-500"
							placeholder="Enter your full name"
						/>
					</label>
				</div>

				<div>
					<label class="block text-sm font-semibold text-gray-900 mb-2">
						Email address
						<FormErrorField issues={email.issues()?.map((x) => x.message)} />
						<input
							{...email.as('email')}
							class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-500"
							placeholder="Enter your email"
						/>
					</label>
				</div>

				<div>
					<label class="block text-sm font-semibold text-gray-900 mb-2">
						Password
						<FormErrorField issues={password.issues()?.map((x) => x.message)} />
						<input
							{...password.as('password')}
							class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-500"
							placeholder="Create a password"
						/>
					</label>
				</div>

				<div>
					<label class="block text-sm font-semibold text-gray-900 mb-2">
						Confirm Password
						<FormErrorField issues={passwordRepeat.issues()?.map((x) => x.message)} />
						<input
							{...passwordRepeat.as('password')}
							class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-500"
							placeholder="Confirm your password"
						/>
					</label>
				</div>
				<Button primary centered disabled={isFormError}>Create</Button>
			</div>
		</div>
	</form>
</div>
