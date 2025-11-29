//import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte"
export const authClient = createAuthClient({
    plugins: [
     /* This is an example how to use additional fields in better-auth that are injected to the user
        
     inferAdditionalFields({
            user: {
                role: { type: "string", required: false },
                companyId: { type: "string", required: false }
            }
        }), */
    ]
});