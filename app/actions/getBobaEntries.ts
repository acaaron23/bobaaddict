import { getCurrentUserEmail } from "./getCurrentUser";
import { getDb } from "./mongodb";

export async function getBobaEntries() {
    const email = await getCurrentUserEmail();
    if (!email) throw new Error("User not authenticated");

    const db = await getDb();

    const entries = await db
        .collection("boba_entries")
        .find({ email })
        .sort({ date: -1 })
        .toArray();

    console.log("Fetched boba entries:", entries.length);

    return entries.map((entry, index) => ({
        id: index + 1,
        shop_name: entry.shop_name,
        boba_name: entry.boba_name,
        price: entry.price,
        date: entry.date,
        rating: entry.rating,
    }));
}