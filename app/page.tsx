'use client'

import { useRef } from 'react'

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

    return (
        <div className="min-h-screen bg-[#E3D1C3] flex flex-col items-center justify-center px-4">
            <h1 className="mt-[35vh] text-4xl md:text-5xl font-bold text-black text-center mb-4">
                Welcome to Boba Addicts!
            </h1>
            <p className="text-lg text-black text-center mb-6">
                Journal your boba addiction, one card swipe at a time!
            </p>
            <button
                onClick={scrollToExplanation}
                className="text-base md:text-lg px-6 py-3 bg-white text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
            >
                Learn more about BobaAddict
            </button>

            <div
                ref={explanationRef}
                className="min-h-screen w-full bg-[#E3D1C3] flex flex-col items-center justify-center mt-20 px-4"
            >
                <p className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
                    How does it work?
                </p>
                <p className="text-lg text-black text-center max-w-2xl leading-relaxed">
                    Ever wondered how much you spend on boba each month? <br />
                    <span className="inline-block mt-2">BobaAddict is here to help you track your boba expenses!</span>
                    <br />
                    <br />
                    Enter the shop&#39;s name, the drink&#39;s name, the price, the date, rate it, and hit submit!
                    <br />
                    <br />
                    When you need to see the damage, click <strong>Request Info</strong> to see your stats!
                </p>
            </div>
        </div>
    )
}
