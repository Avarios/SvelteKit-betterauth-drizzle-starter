import { form } from '$app/server';
import * as v from 'valibot'
import { registerSchema } from './register.schema';
import { authClient } from '$lib/authentication'

export const registerBusinessUser = form(registerSchema, async (data, invalid) => {
   let result = v.safeParse(registerSchema, data);
  
   if (!result.success) {
      result.issues.forEach(x => {
         const fieldPath = x.path?.map(item => item.key).join('.') || 'form';
         invalid(x.message);
      });
   } else {
      let result = await authClient.signUp.email({ email: data.email, name: data.name, password: data.password, role:'owner' });
      if (result.error) {
         invalid(result.error.message || 'Something went wrong');
      } else {
         return {
            success: true
         }
      }
   }
});
