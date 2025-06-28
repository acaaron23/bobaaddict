import { getCurrentUserEmail } from "../actions/getCurrentUser";
import { getDb } from "../actions/mongodb";

export async function getBobaSummary() {
    const email = await getCurrentUserEmail();
    if (!email) throw new Error("User not authenticated");

    const db = await getDb();
    console.log("Database connected:", !!db); // Add this debug line

    // Also check if the collection exists and has data
    const collectionExists = await db.listCollections({name: "boba_entries"}).hasNext();
    console.log("Collection exists:", collectionExists);

    const totalDocs = await db.collection("boba_entries").countDocuments();
    console.log("Total documents in collection:", totalDocs);

    const userDocs = await db.collection("boba_entries").countDocuments({ email });
    console.log("Documents for user:", userDocs);

    const result = await db
        .collection("boba_entries")
        .aggregate([
            { $match: { email } }, // filter by user email

            // Group overall totals and counts
            {
                $group: {
                    _id: null,
                    total_spent: { $sum: "$price" },
                    total_visits: { $sum: 1 },
                    total_cups: { $sum: 1 }, // assuming each entry is 1 cup
                    shops: { $push: "$shop_name" },
                    drinks: { $push: "$boba_name" },
                },
            },
        ])
        .toArray();

    if (result.length === 0) {
        // no data for user
        return {
            total_spent: 0,
            total_visits: 0,
            total_cups: 0,
            average_spent: 0,
            most_visited_shop: { shop_name: "N/A", shop_visits: 0 },
            most_popular_drink: { boba_name: "N/A", drink_count: 0 },
        };
    }

    const { total_spent, total_visits, total_cups, shops, drinks } = result[0];

    // Calculate average price
    const average_spent = total_visits ? total_spent / total_visits : 0;

    // Count shops frequency
    const shopCounts = shops.reduce((acc: Record<string, number>, shop: string) => {
        acc[shop] = (acc[shop] || 0) + 1;
        return acc;
    }, {});

    // Find most visited shop — cast entries so TypeScript knows the type
    const most_visited_shop = (Object.entries(shopCounts) as [string, number][]).reduce(
        (max, curr) => (curr[1] > max[1] ? curr : max),
        ["N/A", 0]
    );

    // Count drinks frequency
    const drinkCounts = drinks.reduce((acc: Record<string, number>, drink: string) => {
        acc[drink] = (acc[drink] || 0) + 1;
        return acc;
    }, {});

    // Find most popular drink — cast entries so TypeScript knows the type
    const most_popular_drink = (Object.entries(drinkCounts) as [string, number][]).reduce(
        (max, curr) => (curr[1] > max[1] ? curr : max),
        ["N/A", 0]
    );

    return {
        total_spent,
        total_visits,
        total_cups,
        average_spent,
        most_visited_shop: { shop_name: most_visited_shop[0], shop_visits: most_visited_shop[1] },
        most_popular_drink: { boba_name: most_popular_drink[0], drink_count: most_popular_drink[1] },
    };
}
