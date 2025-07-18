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
        <div className=" flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full mx-auto">
                    <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left px-6">
                        <h1 className="text-5xl md:text-7xl font-bold mb-2">Welcome to</h1>
                        <h2 className="text-6xl md:text-9xl font-bold mb-4 text-[#b3886c]">Boba Addict!</h2>
                        <p className="text-3xl md:text-4xl font-semibold text-black">
                            Journal your boba addiction, <br/> one card swipe at a time!
                        </p>
                        <button
                            onClick={scrollToExplanation}
                            className="w-fit text-xl px-4 py-4 bg-black text-white font-bold rounded-full transition-transform hover:scale-105 active:scale-95 mt-4 self-start"
                        >
                            Learn more about BobaAddict
                        </button>
                    </div>

                    <div className="w-1/2 md:w-1/4 flex items-center justify-center px-4">
                        <img
                            src="/boba.png"
                            alt="BobaAddict logo"
                            className="w-[20rem] h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            <div
                ref={explanationRef}
                className="min-h-screen w-full flex flex-col items-center justify-center mt-20 px-4"
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