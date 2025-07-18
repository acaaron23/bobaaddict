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
                <Link href="/" className="text-white text-2xl font-bold"> BobaAddict </Link>
            </div>

            <ul className="flex items-center list-none space-x-8">
                <li className="text-[#E3D1C3] font-bold text-lg inline-flex items-center gap-8">
                    {userName ? (<p>Hi, {userName.split(" ")[0]}!</p>) : ("")}
                </li>
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