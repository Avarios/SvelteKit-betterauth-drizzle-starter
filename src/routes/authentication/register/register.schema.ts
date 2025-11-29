import * as v from 'valibot';

const registerSchema = v.pipe(v.object({
    name: v.pipe(v.string(), v.minLength(3), v.maxLength(50)),
    email: v.pipe(v.string(), v.email('Please add a valid email')),
    password: v.pipe(v.string(), v.minLength(8, 'Your password must have at least 8 chars'),
        v.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, 'Your password must contain a special character, a number, lowercase and uppercase chars')),
    passwordRepeat: v.string()
}), v.forward(v.check((data) => data.password === data.passwordRepeat, 'Your passwords do not match.'), ["passwordRepeat"]));

export { registerSchema };