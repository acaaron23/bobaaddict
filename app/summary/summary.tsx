'use client';

type SummaryType = {
    total_spent: number;
    total_visits: number;
    total_cups: number;
    average_spent: number;
    most_visited_shop: { shop_name: string; shop_visits: number };
    most_popular_drink: { boba_name: string; drink_count: number };
};

export default function Summary({
                                          summary,
                                          currentMonth,
                                      }: {
    summary: SummaryType | null;
    currentMonth: string;
}) {
    if (!summary) {
        return <p className="text-center mt-20 text-red-600">No summary data available.</p>;
    }

    return (
        <div className="min-h-screen bg-[#E3D1C3] flex flex-col items-center justify-center px-6 py-10">
            <h1 className="text-4xl font-bold text-black text-center mb-4">
                Your Boba Purchase Summary for {currentMonth}
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mb-6">
                <p className="text-lg text-gray-700 mb-2">
                    Total Spent This Month:{' '}
                    <span className="font-bold text-blue-600">${summary.total_spent.toFixed(2)}</span>
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    Total Visits:{' '}
                    <span className="font-bold text-blue-600">{summary.total_visits}</span> visits
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    Total Cups Purchased:{' '}
                    <span className="font-bold text-blue-600">{summary.total_cups}</span> cups
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    Most Visited Shop:{' '}
                    <span className="font-bold text-blue-600">{summary.most_visited_shop.shop_name}</span>{' '}
                    ({summary.most_visited_shop.shop_visits} visits)
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    Most Popular Drink:{' '}
                    <span className="font-bold text-blue-600">{summary.most_popular_drink.boba_name}</span>{' '}
                    ({summary.most_popular_drink.drink_count} orders)
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Average Price:{' '}
                    <span className="font-bold text-blue-600">${summary.average_spent.toFixed(2)}</span>
                </p>
                <p className="text-lg text-gray-700 mt-4">
                    With this amount spent on boba, you could’ve bought{' '}
                    <span className="font-bold text-blue-600">
            {(summary.total_spent / 562.81).toFixed(2)}
          </span>{' '}
                    shares of SPY. Oh well, we can always buy the dip!
                </p>
            </div>
        </div>
    );
}
