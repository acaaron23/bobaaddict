import Link from 'next/link'
import Image from 'next/image'
import LoginForm from "@/app/components/LoginForm";

export default function Nav() {
    return (
        <nav className="flex w-full justify-between items-center h-20 bg-black px-8">
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
                <li>
                    <LoginForm/>
                </li>
            </ul>
        </nav>
    )
}