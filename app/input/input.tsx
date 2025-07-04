'use client'

import { useState, useRef } from 'react'
import { addBobaEntry } from '@/app/actions/addBoba'

type Suggestions = {
    shops: string[]
    drinks: string[]
}

export default function Input({ suggestions }: { suggestions: Suggestions }) {
    const [shopSuggestions, setShopSuggestions] = useState<string[]>(suggestions.shops)
    const [drinkSuggestions, setDrinkSuggestions] = useState<string[]>(suggestions.drinks)
    const [shopName, setShopName] = useState('')
    const [bobaName, setBobaName] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [rating, setRating] = useState<'fire' | 'mid' | 'trash' | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [error, setError] = useState('')

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const formattedValue = inputValue.replace(/[^0-9.]/g, '')
        setPrice(formattedValue)
    }

    const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        setShopName(inputValue)
    }

    const handleDrinkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        setBobaName(inputValue)
    }

    const handleSuggestionClick = (value: string, type: 'shop' | 'drink') => {
        if (type === 'shop') {
            setShopName(value)
            setShopSuggestions([])
        } else {
            setBobaName(value)
            setDrinkSuggestions([])
        }
    }

    const handleRatingClick = (value: 'fire' | 'mid' | 'trash') => {
        setRating(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!shopName || !bobaName || !price || !date || !rating) {
            setError('Please fill out all fields.')
            return
        }

        try {
            await addBobaEntry({
                shop_name: shopName,
                boba_name: bobaName,
                price: parseFloat(price),
                date,
                rating,
            })

            setSuccessMessage('Boba Added Successfully!')
            setTimeout(() => setSuccessMessage(null), 3000)

            setShopName('')
            setBobaName('')
            setPrice('')
            setDate('')
            setRating(null)
            setError('')
        } catch (err: any) {
            setError(err.message || 'Something went wrong.')
        }
    }

    const isFormValid = shopName && bobaName && price && date && rating

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative px-4">
            {successMessage && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md text-lg z-50 animate-fadeInOut">
                    {successMessage}
                </div>
            )}

            <h1 className="text-4xl font-bold text-black text-center mb-4">
                Enter your boba information
            </h1>
            <p className="text-lg text-black text-center mb-8">
                Please enter the information as accurately as possible!
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md relative"
            >
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={handleShopNameChange}
                        ref={inputRef}
                        className="p-3 text-base border border-gray-300 rounded-md w-full"
                    />
                    {shopName && shopSuggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1">
                            {shopSuggestions
                                .filter((s) => s.toLowerCase().includes(shopName.toLowerCase()))
                                .map((s) => (
                                    <li
                                        key={s}
                                        onClick={() => handleSuggestionClick(s, 'shop')}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {s}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Boba Name"
                        value={bobaName}
                        onChange={handleDrinkNameChange}
                        className="p-3 text-base border border-gray-300 rounded-md w-full"
                    />
                    {bobaName && drinkSuggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1">
                            {drinkSuggestions
                                .filter((d) => d.toLowerCase().includes(bobaName.toLowerCase()))
                                .map((d) => (
                                    <li
                                        key={d}
                                        onClick={() => handleSuggestionClick(d, 'drink')}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {d}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Price ($)"
                    value={`$ ${price}`}
                    onChange={handlePriceChange}
                    className="p-3 text-base border border-gray-300 rounded-md"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-3 text-base border border-gray-300 rounded-md"
                />

                <div className="flex justify-around my-4">
                    {(['🔥', '😐', '🗑️'] as const).map((emoji, idx) => {
                        const value = ['fire', 'mid', 'trash'][idx] as 'fire' | 'mid' | 'trash'
                        return (
                            <button
                                key={value}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleRatingClick(value)
                                }}
                                className={`w-12 h-12 text-2xl border-2 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none ${
                                    rating === value ? 'bg-yellow-300' : 'bg-transparent'
                                }`}
                            >
                                {emoji}
                            </button>
                        )
                    })}
                </div>

                {error && <p className="text-red-600 text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`py-3 px-6 font-bold rounded-full transition-transform ${
                        isFormValid
                            ? 'bg-black text-white hover:scale-105 active:scale-95'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                >
                    Add Boba
                </button>
            </form>
        </div>
    )
}