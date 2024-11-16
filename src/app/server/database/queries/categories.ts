"use server";
import { eq, inArray, sql } from "drizzle-orm";
import db from "..";
import { Categories, categories } from "../schema/categories";

export const GetCategories = async () => {
    return await db
        .select()
        .from(categories)
}

export const GetCategory = async (id: number) => {
    const resp = await db
        .select()
        .from(categories)
        .where(eq(categories.id, id));
    return resp[0]
}

export const CreateCategory = async (name: string) => {
    return await db
        .insert(categories)
        .values({
            name,
            thumbs: [],
            order: -1
        })
        .returning();
}

export const GetThumbnails = async (category: string) => {
    const resp = await db
        .select()
        .from(categories)
        .where(eq(categories.name, category))
    if (resp[0]) {
        return resp[0].thumbs
    }
}

export const AddThumbnail = async (category: string, thumbnail: string) => {
    const resp = await db.update(categories)
        .set({ thumbs: sql`array_append(${categories.thumbs}, ${thumbnail})` })
        .where(eq(categories.name, category))
        .returning();
    return resp
}

export const RemoveThumbnail = async (category: string, thumbnail: string) => {
    const resp = await db.update(categories)
        .set({ thumbs: sql`array_remove(${categories.thumbs}, ${thumbnail})` })
        .where(eq(categories.name, category))
        .returning();
    return resp
}

export const ReplaceThumbnail = async (category: string, oldThumbnail: string, newThumbnail: string) => {
    const resp = await db.update(categories)
        .set({ thumbs: sql`array_replace(${categories.thumbs}, ${oldThumbnail}, ${newThumbnail})` })
        .where(eq(categories.name, category))
        .returning();
    return resp
}

export const ReOrderThumbnails = async (category: string, thumbnails: string[]) => {
    const resp = await db.update(categories)
        .set({ thumbs: thumbnails })
        .where(eq(categories.name, category))
        .returning();
    return resp
}

export const ReOrderCategories = async (names: string[]) => {
    await db.transaction(async (tx) => {
        for (let i = 0; i < names.length; i++) {
            await tx.
                update(categories)
                .set({ order: i + 1 })
                .where(eq(categories.name, names[i]));
        }
    });
}

export const RemoveCategory = async (id: number) => {
    const resp = await db
        .delete(categories)
        .where(eq(categories.id, id))
        .returning();
    return resp
}