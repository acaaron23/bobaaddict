'use client'

import { useRef } from 'react'
import ZigzagSteps from '@/app/components/ZigZagSteps';
import Image from 'next/image'

export default function Home() {
    const explanationRef = useRef<HTMLDivElement | null>(null)

    const scrollToExplanation = () => {
        if (explanationRef.current) {
            explanationRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    const bobaSteps = [
        {
            id: 1,
            title: "Login Using Google",
            description: "Secure and personalized access",
            content: "By logging in with Google, BobaAddict can store and save all of your past purchases! Note: BobaAddict won't work otherwise. ",
        },
        {
            id: 2,
            title: "Begin Entering Boba",
            description: "Add your drinks easily",
            content: "Enter the name of the store, drink, price, date, and your rating. Then, simply click submit!",
        },
        {
            id: 3,
            title: "Interested in Your Summary",
            description: "See your data in action",
            content: "Click Summary and click Generate Summary. You'll get a cool summary with the number of drinks and how much you’ve spent!",
        },
        {
            id: 4,
            title: "Enjoy",
            description: "Track your spending in style",
            content: "Have fun with BobaAddict! Learn how much money you have spent and could save on your favorite drinks.",
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center justify-center w-full max-w-7xl mx-auto">
                    <div className="flex flex-col justify-center w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 leading-tight">
                            Welcome to
                        </h1>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold mb-4 sm:mb-6 text-[#b3886c] leading-tight">
                            Boba Addict!
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-black leading-relaxed mb-4 sm:mb-6">
                            Journal your boba addiction, <br className="hidden sm:block"/> one card swipe at a time!
                        </p>
                        <button
                            onClick={scrollToExplanation}
                            className="w-fit text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-bold rounded-full transition-transform hover:scale-105 active:scale-95 self-center lg:self-start shadow-lg hover:shadow-xl"
                        >
                            Learn more about BobaAddict
                        </button>
                    </div>

                    <div className="w-48 sm:w-56 md:w-64 lg:w-1/4 xl:w-1/3 flex items-center justify-center order-1 lg:order-2 mb-6 lg:mb-0">
                        <div className="relative">
                            <Image
                                src="/boba.png"
                                alt="BobaAddict logo"
                                width={250}
                                height={250}
                                className="w-full h-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 transform hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={explanationRef}
                className="min-h-screen w-full flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="w-full max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-[#7B3F00] leading-tight">
                        How BobaAddict Works
                    </h2>
                    <ZigzagSteps steps={bobaSteps} />
                </div>
            </div>
        </div>
    )
}