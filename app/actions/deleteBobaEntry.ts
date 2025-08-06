'use server'

import { getCurrentUserEmail } from "./getCurrentUser";
import { getDb } from "./mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteBobaEntry(entryId: string) {
    const email = await getCurrentUserEmail();
    if (!email) throw new Error("User not authenticated");

    const db = await getDb();

    try {
        const result = await db.collection("boba_entries").deleteOne({
            _id: new ObjectId(entryId),
            email: email
        });

        if (result.deletedCount === 0) {
            throw new Error("Entry not found or you don't have permission to delete it");
        }

        revalidatePath('/summary');

        return { success: true };
    } catch (error) {
        console.error('Error deleting boba entry:', error);
        throw new Error('Failed to delete entry');
    }
}

export async function deleteBobaEntryById(displayId: number) {
    'use server';

    const email = await getCurrentUserEmail();
    if (!email) throw new Error("User not authenticated");

    const db = await getDb();

    try {
        const entries = await db
            .collection("boba_entries")
            .find({ email })
            .sort({ date: -1 })
            .toArray();

        const entryToDelete = entries[displayId - 1];

        if (!entryToDelete) {
            throw new Error("Entry not found");
        }

        await deleteBobaEntry(entryToDelete._id.toString());

    } catch (error) {
        console.error('Error deleting boba entry by ID:', error);
        throw error;
    }
}