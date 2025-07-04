'use client';

import { useState } from 'react';

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
    const [showSummary, setShowSummary] = useState(false);

    if (!summary || summary?.total_cups === 0 || summary?.total_spent === 0) {
        return (
            <div className="min-h-screen bg-[#E3D1C3] flex flex-col items-center justify-center px-6 py-10">
                <h1 className="text-4xl font-bold text-black text-center mb-4">
                    Your Boba Purchase Summary for {currentMonth}
                </h1>
                <p className="text-center text-red-600 text-lg">
                    No summary data available. Start tracking your boba purchases to see your stats!
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E3D1C3] flex flex-col items-center justify-center px-6 py-10">
            <h1 className="text-4xl font-bold text-black text-center mb-4">
                Your Boba Purchase Summary for {currentMonth}
            </h1>

            {!showSummary ? (
                <>
                    <p className="text-lg text-black text-center mb-8">
                        Interested in your stats for {currentMonth}?
                    </p>
                    <button
                        onClick={() => setShowSummary(true)}
                        className="text-base px-6 py-3 bg-white text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
                    >
                        Generate Summary
                    </button>
                </>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mb-6">
                        <p className="text-lg text-gray-700 mb-2">
                            Total Spent This Month:{' '}
                            <span className="font-bold text-blue-600">
                                ${summary.total_spent.toFixed(2)}
                            </span>
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Total Visits:{' '}
                            <span className="font-bold text-blue-600">
                                {summary.total_visits}
                            </span>{' '}
                            visits
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Total Cups Purchased:{' '}
                            <span className="font-bold text-blue-600">
                                {summary.total_cups}
                            </span>{' '}
                            cups
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Most Visited Shop:{' '}
                            <span className="font-bold text-blue-600">
                                {summary.most_visited_shop.shop_name}
                            </span>{' '}
                            ({summary.most_visited_shop.shop_visits} visits)
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Most Popular Drink:{' '}
                            <span className="font-bold text-blue-600">
                                {summary.most_popular_drink.boba_name}
                            </span>{' '}
                            ({summary.most_popular_drink.drink_count} orders)
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            Average Price:{' '}
                            <span className="font-bold text-blue-600">
                                ${summary.average_spent.toFixed(2)}
                            </span>
                        </p>
                        <p className="text-lg text-gray-700 mt-4">
                            With this amount spent on boba, you could&#39;ve bought{' '}
                            <span className="font-bold text-blue-600">
                                {(summary.total_spent / 562.81).toFixed(2)}
                            </span>{' '}
                            shares of SPY. Oh well, we can always buy the dip!
                        </p>
                    </div>
                    <button
                        onClick={() => setShowSummary(false)}
                        className="text-base px-6 py-3 bg-white text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
                    >
                        Go Back
                    </button>
                </>
            )}
        </div>
    );
}