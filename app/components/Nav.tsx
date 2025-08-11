import Link from 'next/link'
import LoginForm from "@/app/components/LoginForm"
import LogoutForm from "@/app/components/LogoutForm"
import { getCurrentUserName } from '@/app/actions/getCurrentUser'

export default async function Nav() {
    const userName = await getCurrentUserName();

    return (
        <nav className="flex flex-col sm:flex-row w-full justify-between items-center min-h-20 bg-black px-4 sm:px-6 lg:px-10 py-4 sm:py-0">
            <div className="flex items-center mb-4 sm:mb-0">
                <Link href="/" className="text-white text-xl sm:text-2xl font-bold hover:text-gray-300 transition-colors">
                    BobaAddict
                </Link>
            </div>

            <div className="w-full sm:w-auto">
                {userName && (
                    <div className="text-[#E3D1C3] font-bold text-base text-center mb-3 sm:hidden">
                        Hi, {userName.split(" ")[0]}!
                    </div>
                )}

                <ul className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end list-none gap-3 sm:gap-6 lg:gap-8">
                    <li className="hidden sm:block text-[#E3D1C3] font-bold text-lg">
                        {userName ? (<p>Hi, {userName.split(" ")[0]}!</p>) : ("")}
                    </li>

                    <li>
                        <Link
                            href="/"
                            className="text-[#E3D1C3] font-bold text-sm sm:text-base lg:text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300 px-2 py-1 rounded"
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/input"
                            className="text-[#E3D1C3] font-bold text-sm sm:text-base lg:text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300 px-2 py-1 rounded whitespace-nowrap"
                        >
                            Enter Boba
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/summary"
                            className="text-[#E3D1C3] font-bold text-sm sm:text-base lg:text-lg no-underline hover:text-gray-400 hover:text-shadow-sm transition-colors duration-300 px-2 py-1 rounded"
                        >
                            Summary
                        </Link>
                    </li>

                    <li className="text-[#E3D1C3] font-bold text-sm sm:text-base lg:text-lg">
                        {userName ? (
                            <LogoutForm />
                        ) : (
                            <LoginForm />
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}