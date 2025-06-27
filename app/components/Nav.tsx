'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

export default function Nav() {
    const [user, setUser] = useState(null)

    const handleSuccess = (credentialResponse: { credential: string }) => {
        if (credentialResponse && credentialResponse.credential) {
            const decoded = jwtDecode(credentialResponse.credential)
            setUser({ name: decoded.name, picture: decoded.picture })
        } else {
            console.log('No credential received.')
        }
    }

    return (
        <nav className="flex w-full justify-between items-center h-20 bg-black px-8">
            {/* Header/Logo Section */}
            <div className="flex items-center">
                <h1 className="text-white text-2xl font-bold mr-4">BobaAddict</h1>
                <Image
                    src="/boba.png"
                    alt="BobaAddict logo"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                />
            </div>

            {/* Navigation Links */}
            <ul className="flex items-center list-none">
                <li className="mx-4">
                    <Link
                        href="/"
                        className="text-[#E3D1C3] font-bold text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300"
                    >
                        Home
                    </Link>
                </li>
                <li className="mx-4">
                    <Link
                        href="/input"
                        className="text-[#E3D1C3] font-bold text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300"
                    >
                        Enter Boba
                    </Link>
                </li>
                <li className="mx-4">
                    <Link
                        href="/summary"
                        className="text-[#E3D1C3] font-bold text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300"
                    >
                        Summary
                    </Link>
                </li>
                <li className="ml-4">
                    {user ? (
                        <div className="flex items-center whitespace-nowrap ml-4">
                            <h1 className="text-[#E3D1C3] font-bold text-lg mr-4">
                                Hi, {user.name}
                            </h1>
                            <Image
                                src={user.picture}
                                alt={user.name}
                                width={32}
                                height={32}
                                className="rounded-full w-8 h-8 cursor-pointer"
                                title={user.name}
                            />
                        </div>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => console.log('Login Failed.')}
                            auto_select={true}
                        />
                    )}
                </li>
            </ul>
        </nav>
    )
}