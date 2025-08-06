import Summary from './summary';
import { getBobaSummary } from '@/app/actions/getSummary';
import { getBobaEntries } from '@/app/actions/getBobaEntries';

export const metadata = {
    title: "Summary",
};

export const dynamic = 'force-dynamic';

type BobaEntry = {
    id: number
    shop_name: string;
    boba_name: string;
    price: number;
    date: string;
    rating: 'fire' | 'mid' | 'trash';
};

type SummaryType = {
    total_spent: number;
    total_visits: number;
    total_cups: number;
    average_spent: number;
    most_visited_shop: { shop_name: string; shop_visits: number };
    most_popular_drink: { boba_name: string; drink_count: number };
};

export default async function SummaryPage() {
    let summary: SummaryType;
    let entries: BobaEntry[] = [];

    try {
        const [summaryResult, entriesResult] = await Promise.all([
            getBobaSummary(),
            getBobaEntries()
        ]);

        summary = summaryResult;
        entries = entriesResult;

        console.log('Fetched entries count:', entries.length);

    } catch (error) {
        console.error('Failed to get summary:', error);
        summary = {
            total_spent: 0,
            total_visits: 0,
            total_cups: 0,
            average_spent: 0,
            most_visited_shop: { shop_name: 'N/A', shop_visits: 0 },
            most_popular_drink: { boba_name: 'N/A', drink_count: 0 },
        };
        entries = [];
    }

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    return <Summary summary={summary} currentMonth={currentMonth} entries={entries} />;
}