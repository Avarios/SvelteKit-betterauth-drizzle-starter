import { redirect  } from '@sveltejs/kit';
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../server/db";
import {
  user,
  account,
  session,
  verification,
} from "$lib/server/db/auth-schema";
import { getRequestEvent } from "$app/server";
import { sveltekitCookies } from "better-auth/svelte-kit";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, account, session, verification },
  }),
  plugins: [sveltekitCookies(getRequestEvent)],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    resetPasswordTokenExpiresIn: 60*60
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      //TODO: Implement Email Sending trough Service like SendGrid
      console.log("Verification Mail:", {
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  user:{
    additionalFields:{
      companyId:{
        type:"string",
        required:false,
      },
      role:{
        type:"string",
        required:false,
        input:true
      }
    }
  }
});

export const withSessionCheck = <TEvent extends { request: Request }, TReturn>(
	load: (event: TEvent & { session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>> }) => Promise<TReturn>
) => {
	return async (event: TEvent): Promise<TReturn> => {
		const session = await auth.api.getSession({ headers: event.request.headers });
		if (!session?.user) {
			throw redirect(303, '/authentication/login');
		}
		return load({ ...event, session });
	};
};
