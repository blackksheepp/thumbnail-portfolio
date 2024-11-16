import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL environment variable');
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

export default db;