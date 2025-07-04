import Link from 'next/link'
import Image from 'next/image'
import LoginForm from "@/app/components/LoginForm"
import LogoutForm from "@/app/components/LogoutForm"
import { getCurrentUserName } from '@/app/actions/getCurrentUser'

export default async function Nav() {
    const userName = await getCurrentUserName();

    return (
        <nav className="flex w-full justify-between items-center h-20 bg-black px-10">
            <div className="flex items-center">
                <h1 className="text-white text-2xl font-bold">BobaAddict</h1>
                <Image
                    src="/boba.png"
                    alt="BobaAddict logo"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                />
            </div>

            <ul className="flex items-center list-none space-x-8">
                <li>
                    <Link
                        href="/"
                        className="text-[#E3D1C3] font-bold text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/input"
                        className="text-[#E3D1C3] font-bold text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300"
                    >
                        Enter Boba
                    </Link>
                </li>
                <li>
                    <Link
                        href="/summary"
                        className="text-[#E3D1C3] font-bold text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300"
                    >
                        Summary
                    </Link>
                </li>
                <li className="text-[#E3D1C3] font-bold text-lg inline-flex items-center gap-8">
                    {userName ? (
                        <>
                            <p>Hello, {userName.split(" ")[0]}!</p>
                            <LogoutForm />
                        </>
                    ) : (
                        <LoginForm />
                    )}
                </li>
            </ul>
        </nav>
    );
}
