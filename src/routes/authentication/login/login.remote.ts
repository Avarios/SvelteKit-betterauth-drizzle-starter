import { form, getRequestEvent } from '$app/server';
import * as v from 'valibot'
import { loginSchema } from './login.schema';
import { auth } from '$lib/server/auth'

export const loginBusinessUser = form(loginSchema, async (data, invalid) => {
   let result = v.safeParse(loginSchema, data);
   let event = getRequestEvent();
   if (!result.success) {
      result.issues.forEach(x => {
         invalid({
            message: x.message,
            path: x.path?.map(item => item.key as PropertyKey) || []
         })
      });
   } else {
      try {
         let result = await auth.api.signInEmail({ body: { email: data.email, password: data.password } });
         if (result.user) {
            console.log(result);
         } else {
            console.log("ERROR WHERE IT SHOULD NOT BE ",result);
            invalid({ message: 'Something went wrong' });
         }
         console.log('redirecting to Home');
         return {
            redirect: '/'
         }

      } catch (error) {
         invalid({ message: String(error) || 'Something went wrong' });
      }
   }
});