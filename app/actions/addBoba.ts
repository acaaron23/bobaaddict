'use server'

import { auth } from "@/auth";
import { getDb } from "../actions/mongodb";

export async function addBobaEntry(data: {
    shop_name: string;
    boba_name: string;
    price: number;
    date: string;
    rating: 'fire' | 'mid' | 'trash';
}) {
    const session = await auth();
    const user = session?.user;

    if (!user?.email) {
        throw new Error("User not authenticated");
    }

    const db = await getDb();
    await db.collection("boba_entries").insertOne({
        ...data,
        email: user.email,
        created_at: new Date(),
    });
}
