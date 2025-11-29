import * as v from 'valibot';

const loginSchema = v.pipe(v.object({
    email: v.pipe(v.string(), v.email('Please add a valid email')),
    password: v.pipe(v.string(), v.minLength(8, 'Your password must have at least 8 chars'))
}));

export { loginSchema };