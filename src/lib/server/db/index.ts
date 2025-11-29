import 'dotenv/config';
import * as schema from './auth-schema';
import { drizzle } from 'drizzle-orm/libsql/web';
import { createClient } from '@libsql/client/node';

const client = createClient({
  url: process.env.DATABASE_URL!, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
});

const db = drizzle(client, { schema });


export { db, schema };