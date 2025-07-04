import { getCurrentUserEmail } from "./getCurrentUser";
import { getDb } from "./mongodb";

export async function getUserSuggestions() {
    const email = await getCurrentUserEmail();
    if (!email) throw new Error("User not authenticated");

    const db = await getDb();
    const entries = await db
        .collection("boba_entries")
        .find({ email })
        .project({ shop_name: 1, boba_name: 1 })
        .toArray();

    const shopSet = new Set<string>();
    const drinkSet = new Set<string>();

    entries.forEach((e) => {
        if (e.shop_name) shopSet.add(e.shop_name);
        if (e.boba_name) drinkSet.add(e.boba_name);
    });

    console.log("Fetched entries:", entries);

    return {
        shops: Array.from(shopSet),
        drinks: Array.from(drinkSet),
    };
}
