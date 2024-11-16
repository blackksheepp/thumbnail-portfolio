import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: 'postgresql',
    out: './supabase/migrations',
    schema: './src/app/server/database/schema',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})                                                                                                          
