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

type BobaEntry = {
    id: number;
    _id: string;
    shop_name: string;
    boba_name: string;
    price: number;
    date: string;
    rating: 'fire' | 'mid' | 'trash';
};

export default function Summary({
                                    summary,
                                    currentMonth,
                                    entries = [],
                                    onDeleteEntry,
                                }: {
    summary: SummaryType | null;
    currentMonth: string;
    entries?: BobaEntry[];
    onDeleteEntry?: (id: number) => Promise<void>;
}) {
    const [showSummary, setShowSummary] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const getRatingEmoji = (rating: 'fire' | 'mid' | 'trash') => {
        switch (rating) {
            case 'fire': return '🔥';
            case 'mid': return '😐';
            case 'trash': return '🗑️';
        }
    };

    const handleDeleteEntry = async (id: number) => {
        if (!onDeleteEntry) return;

        setDeletingId(id);
        try {
            await onDeleteEntry(id);
        } catch (error) {
            console.error('Failed to delete entry:', error);
        } finally {
            setDeletingId(null);
        }
    };

    if (!summary || summary?.total_cups === 0 || summary?.total_spent === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
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
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
            <h1 className="text-4xl font-bold text-black text-center mb-4">
                Your Boba Purchase Summary for {currentMonth}
            </h1>

            {!showSummary && !showGrid ? (
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => setShowSummary(true)}
                        className="text-base px-6 py-3 bg-[#b3886c] text-black font-bold rounded-full border border-black transition-transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        Generate Summary
                    </button>
                    <button
                        onClick={() => setShowGrid(true)}
                        className="text-base px-6 py-3 bg-black text-white font-bold rounded-full border border-black transition-transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        View Data Grid
                    </button>
                </div>
            ) : showSummary ? (
                <>
                    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mb-6">
                        <p className="text-lg text-gray-700 mb-2">
                            Total Spent This Month:{' '}
                            <span className="font-bold text-[#b3886c]">
                                ${summary.total_spent.toFixed(2)}
                            </span>
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Total Visits:{' '}
                            <span className="font-bold text-[#b3886c]">
                                {summary.total_visits}
                            </span>{' '}
                            visits
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Total Cups Purchased:{' '}
                            <span className="font-bold text-[#b3886c]">
                                {summary.total_cups}
                            </span>{' '}
                            cups
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Most Visited Shop:{' '}
                            <span className="font-bold text-[#b3886c]">
                                {summary.most_visited_shop.shop_name}
                            </span>{' '}
                            ({summary.most_visited_shop.shop_visits} visits)
                        </p>
                        <p className="text-lg text-gray-700 mb-2">
                            Most Popular Drink:{' '}
                            <span className="font-bold text-[#b3886c]">
                                {summary.most_popular_drink.boba_name}
                            </span>{' '}
                            ({summary.most_popular_drink.drink_count} orders)
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            Average Price:{' '}
                            <span className="font-bold text-[#b3886c]">
                                ${summary.average_spent.toFixed(2)}
                            </span>
                        </p>
                        <p className="text-lg text-gray-700 mt-4">
                            With this amount spent on boba, you could&#39;ve bought{' '}
                            <span className="font-bold text-[#b3886c]">
                                {(summary.total_spent / 581.58).toFixed(4)}
                            </span>{' '}
                            shares of VOO.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => { setShowSummary(false); setShowGrid(true); }}
                            className="text-base px-6 py-3 bg-[#b3886c] text-black font-bold rounded-full border border-black transition-transform hover:scale-105 active:scale-95"
                        >
                            View Data Grid
                        </button>
                        <button
                            onClick={() => { setShowSummary(false); setShowGrid(false); }}
                            className="text-base px-6 py-3 bg-black text-white font-bold rounded-full border border-black transition-transform hover:scale-105 active:scale-95"
                        >
                            Go Back
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-white rounded-lg shadow-md w-full max-w-6xl mb-6 overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-black">Your Boba Entries</h2>
                            <p className="text-gray-600">{entries.length} total entries</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-s font-medium text-black uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-s font-medium text-black uppercase tracking-wider">
                                        Shop
                                    </th>
                                    <th className="px-4 py-3 text-left text-s font-medium text-black uppercase tracking-wider">
                                        Drink
                                    </th>
                                    <th className="px-4 py-3 text-left text-s font-medium text-black uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-center text-s font-medium text-black uppercase tracking-wider">
                                        Rating
                                    </th>
                                    <th className="px-4 py-3 text-center text-s font-medium text-black uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {entries.length > 0 ? (
                                    entries.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap text-m text-black">
                                                {new Date(entry.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-m font-bold text-black">
                                                {entry.shop_name}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-m font-bold text-black">
                                                {entry.boba_name}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-m font-bold text-black">
                                                ${entry.price.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-center text-lg">
                                                {getRatingEmoji(entry.rating)}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-center">
                                                <button
                                                    onClick={() => handleDeleteEntry(entry.id)}
                                                    disabled={deletingId === entry.id || !onDeleteEntry}
                                                    className={`px-3 py-1 text-m font-medium rounded-md transition-colors border ${
                                                        deletingId === entry.id
                                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            : 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
                                                    }`}
                                                >
                                                    {deletingId === entry.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                            No entries found for this month
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => { setShowGrid(false); setShowSummary(true); }}
                            className="text-base px-6 py-3 bg-[#b3886c] text-black font-bold rounded-full border border-black transition-transform hover:scale-105 active:scale-95"
                        >
                            View Summary
                        </button>
                        <button
                            onClick={() => { setShowSummary(false); setShowGrid(false); }}
                            className="text-base px-6 py-3 bg-black text-white font-bold rounded-full border border-black transition-transform hover:scale-105 active:scale-95"
                        >
                            Go Back
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
