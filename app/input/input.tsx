'use client'

import { useState, useEffect, useRef } from 'react'
import { addBobaEntry } from '@/app/actions/addBoba'

type Suggestions = {
    shops: string[]
    drinks: string[]
}

export default function Input({
                                  suggestions,
                                  serverError = '',
                              }: {
    suggestions: Suggestions
    serverError?: string
}) {
    const [shopName, setShopName] = useState('')
    const [bobaName, setBobaName] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState(() => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    })
    const [rating, setRating] = useState<'fire' | 'mid' | 'trash' | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [error, setError] = useState('')

    const [showShopSuggestions, setShowShopSuggestions] = useState(false)
    const [showDrinkSuggestions, setShowDrinkSuggestions] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (serverError) setError(serverError)
    }, [serverError])

    const clearMessages = () => {
        if (error) setError('')
        if (successMessage) setSuccessMessage(null)
    }

    const filteredShopSuggestions = suggestions.shops.filter((s) =>
        s.toLowerCase().includes(shopName.toLowerCase())
    )
    const filteredDrinkSuggestions = suggestions.drinks.filter((d) =>
        d.toLowerCase().includes(bobaName.toLowerCase())
    )

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const formattedValue = inputValue.replace(/[^0-9.]/g, '')
        setPrice(formattedValue)
        clearMessages()
    }

    const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setShopName(value)
        setShowShopSuggestions(value.length > 0)
        clearMessages()
    }

    const handleDrinkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setBobaName(value)
        setShowDrinkSuggestions(value.length > 0)
        clearMessages()
    }

    const handleSuggestionClick = (value: string, type: 'shop' | 'drink') => {
        if (type === 'shop') {
            setShopName(value)
            setShowShopSuggestions(false)
        } else {
            setBobaName(value)
            setShowDrinkSuggestions(false)
        }
        clearMessages()
    }

    const handleRatingClick = (value: 'fire' | 'mid' | 'trash') => {
        setRating(value)
        clearMessages()
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
        clearMessages()
    }

    const isFormValid = shopName && bobaName && price && date && rating

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccessMessage('')

        if (!isFormValid) {
            setError('Please fill out all fields.')
            return
        }

        if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            setError('Please enter a valid price.')
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

            setShopName('')
            setBobaName('')
            setPrice('')
            setDate('')
            setRating(null)
            setShowShopSuggestions(false)
            setShowDrinkSuggestions(false)
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message === 'User not authenticated') {
                    setError('Please Login to Continue!')
                } else {
                    setError(err.message || 'Something went wrong.')
                }
            } else {
                setError('Something went wrong.')
            }
        }
    }

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
                        autoComplete="off"
                    />
                    {showShopSuggestions && filteredShopSuggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 max-h-40 overflow-auto">
                            {filteredShopSuggestions.map((s) => (
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
                        autoComplete="off"
                    />
                    {showDrinkSuggestions && filteredDrinkSuggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 max-h-40 overflow-auto">
                            {filteredDrinkSuggestions.map((d) => (
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

                <div className="relative">
                  <span
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none select-none"
                      aria-hidden="true"
                  >
                    $
                  </span>
                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={handlePriceChange}
                        className="p-3 pl-7 text-base border border-gray-300 rounded-md w-full"
                        inputMode="decimal"
                    />
                </div>

                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
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
