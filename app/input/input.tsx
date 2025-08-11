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

    const shopInputRef = useRef<HTMLInputElement | null>(null)
    const drinkInputRef = useRef<HTMLInputElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        if (serverError) setError(serverError)
    }, [serverError])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node

            const shopContainer = shopInputRef.current?.parentElement
            const drinkContainer = drinkInputRef.current?.parentElement

            if (shopContainer && !shopContainer.contains(target)) {
                setShowShopSuggestions(false)
            }
            if (drinkContainer && !drinkContainer.contains(target)) {
                setShowDrinkSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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
        const formattedValue = inputValue.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
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

    const handleKeyDown = (e: React.KeyboardEvent, type: 'shop' | 'drink') => {
        if (e.key === 'Escape') {
            if (type === 'shop') {
                setShowShopSuggestions(false)
            } else {
                setShowDrinkSuggestions(false)
            }
        }
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

    const resetForm = () => {
        setShopName('')
        setBobaName('')
        setPrice('')
        setDate(() => {
            const today = new Date()
            return today.toISOString().split('T')[0]
        })
        setRating(null)
        setShowShopSuggestions(false)
        setShowDrinkSuggestions(false)
    }

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
            resetForm()
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
        <div className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {successMessage && (
                <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:w-auto bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-base lg:text-lg z-50 shadow-lg animate-fadeInOut">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-xl">✅</span>
                        <span className="font-medium">{successMessage}</span>
                    </div>
                </div>
            )}

            <div className="text-center mb-6 sm:mb-8 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 px-4">
                    Enter your boba information
                </h1>
                <p className="text-base sm:text-lg text-black px-4">
                    Please enter the information as accurately as possible!
                </p>
            </div>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-5 w-full max-w-sm sm:max-w-md bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg relative"
            >
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={handleShopNameChange}
                        onKeyDown={(e) => handleKeyDown(e, 'shop')}
                        ref={shopInputRef}
                        className="p-3 sm:p-4 text-base sm:text-lg border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        autoComplete="off"
                    />
                    {showShopSuggestions && filteredShopSuggestions.length > 0 && (
                        <ul className="absolute z-20 w-full bg-white shadow-lg rounded-lg mt-2 max-h-32 sm:max-h-40 overflow-auto border border-gray-200">
                            {filteredShopSuggestions.map((s) => (
                                <li
                                    key={s}
                                    onClick={() => handleSuggestionClick(s, 'shop')}
                                    className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer text-sm sm:text-base border-b border-gray-100 last:border-b-0 active:bg-gray-100"
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
                        onKeyDown={(e) => handleKeyDown(e, 'drink')}
                        ref={drinkInputRef}
                        className="p-3 sm:p-4 text-base sm:text-lg border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        autoComplete="off"
                    />
                    {showDrinkSuggestions && filteredDrinkSuggestions.length > 0 && (
                        <ul className="absolute z-20 w-full bg-white shadow-lg rounded-lg mt-2 max-h-32 sm:max-h-40 overflow-auto border border-gray-200">
                            {filteredDrinkSuggestions.map((d) => (
                                <li
                                    key={d}
                                    onClick={() => handleSuggestionClick(d, 'drink')}
                                    className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer text-sm sm:text-base border-b border-gray-100 last:border-b-0 active:bg-gray-100"
                                >
                                    {d}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none select-none text-base sm:text-lg font-medium">
                        $
                    </span>
                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={handlePriceChange}
                        className="p-3 sm:p-4 pl-8 sm:pl-10 text-base sm:text-lg border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        inputMode="decimal"
                    />
                </div>

                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="p-3 sm:p-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                                className={`w-14 h-14 sm:w-16 sm:h-16 text-3xl sm:text-4xl border-2 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    rating === value ? 'bg-yellow-300 border-yellow-500' : 'bg-transparent border-gray-300'
                                }`}
                                type="button"
                            >
                                {emoji}
                            </button>
                        )
                    })}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                            <span className="text-red-500 text-lg">⚠️</span>
                            <p className="text-red-600 text-sm sm:text-base font-medium">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`py-3 sm:py-4 px-6 sm:px-8 font-bold text-base sm:text-lg rounded-xl transition-all focus:outline-none focus:ring-3 focus:ring-blue-400 shadow-md ${
                        isFormValid
                            ? 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95 hover:shadow-lg'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-sm'
                    }`}
                >
                    Add Boba
                </button>
            </form>
        </div>
    )
}