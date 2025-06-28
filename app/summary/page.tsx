import Summary from './summary';
import { getBobaSummary } from '@/app/actions/getSummary';

export default async function SummaryPage() {
    let summary;

    try {
        summary = await getBobaSummary();
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
    }

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    return <Summary summary={summary} currentMonth={currentMonth} />;
}
