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
                        <Image
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

                <div className="mt-20">
                    <h2 className="text-4xl font-bold text-center mb-12">How BobaAddict Works</h2>
                    <ZigzagSteps steps={bobaSteps} />
                </div>
            </div>
        </div>
    )
}