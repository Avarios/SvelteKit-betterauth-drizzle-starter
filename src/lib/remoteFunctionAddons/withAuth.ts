import { form, command, query, getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const authenticatedForm = <T>(
    schema: T,
    handler: (data: any, invalid: any) => Promise<any>
) => {
    return form(schema as any, async (data, invalid) => {
        const { locals: { session, user } } = getRequestEvent();
        if (!session) {
            return redirect(307, "/authentication/login");
        }
        return handler({ ...data, user }, invalid);
    });
}

export const authenticatedCommand = <T>(
    schema: T,
    handler: (data: any) => Promise<any>
) => {
    return command(schema as any, async (data) => {
        const { locals: { session, user } } = getRequestEvent();
        if (!session) {
            return redirect(307, "/authentication/login");
        }
        return handler({ ...data, user });
    });
}

export const authenticatedQuery = <T>(
    schema: T,
    handler: (data: any) => Promise<any>
) => {
    return query(schema as any, async (data: any) => {
        const { locals: { session, user } } = getRequestEvent();
        if (!session) {
            return redirect(307, "/authentication/login");
        }
        return handler({ ...data, user });
    });
}