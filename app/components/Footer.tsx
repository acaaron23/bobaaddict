import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="text-center w-full text-sm py-4 px-4">
            <p className="flex flex-wrap justify-center items-center gap-1">
                <span>All Rights Reserved by BobaAddict</span>{' '}
                <Link href="/" className="text-red-800 no-underline hover:underline">
                    Credits
                </Link>{' '}
                <span>&copy;</span>
            </p>
        </footer>
    )
}