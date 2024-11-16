import { pgTable, text, serial, integer } from "drizzle-orm/pg-core"
import { sql } from 'drizzle-orm';

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text().notNull(),
    order: integer().notNull(),
    thumbs: text()
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
});

export type Categories = typeof categories.$inferInsert;