# This is Svelte Kit Starter Kit

## Includes
- SvelteKit and Remote Functions
- better-auth
- drizzle ORM
- tailwind
- valibot

## What it is
This is a starting point to implement your first sveltekit app with all of these addons
It includes a Login and register function for username password
If you want to use social login, you have to add it

It has an built in toast fdunctionality, opinionated.
Just use toast.svelte.ts from the lib folder. Rather than using store i am already using state

Currently it uses sqllite , use whatever is supported and suits your needs :D  

## Including Functions

### $lib/remoteFunctionAddons/withAuth.ts

Higher order function (HoF) for form, query and command remote function to check if the user has a valid session

### $lib/server/auth/auth.ts

includes a function withSessionCheck you can use on server functions to check if the user has a valid session

