import { type Handle, redirect } from '@sveltejs/kit';
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "$lib/server/auth";
import { building } from "$app/environment";

export const handle: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({
    headers: event.request.headers
  });
  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  if (!event.locals.session && !event.url.pathname.startsWith('/authentication') && !event.url.pathname.startsWith('/api/auth') && event.url.pathname !== '/') {
    throw redirect(303, '/authentication/login');
  }

  return svelteKitHandler({ event, resolve, auth, building });
};