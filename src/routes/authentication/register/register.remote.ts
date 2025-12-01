import { form } from '$app/server';
import { registerSchema } from './register.schema';
import { authClient } from '$lib/authentication'
import { redirect, error } from '@sveltejs/kit';

export const registerUser = form(registerSchema, async (data, issues) => {
   let result = await authClient.signUp.email({ email: data.email, name: data.email, password: data.password });
   if (result.error) {
      error(result.error.status, result.error.message)
   } else {
      redirect(302, "/")
   }
});