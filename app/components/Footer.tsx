import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="text-center w-full text-sm py-4">
            <p>
                All Rights Reserved by Aaron Chen{' '}
                <Link href="/" className="text-red-800 no-underline">
                    Credits
                </Link>{' '}
                &copy;
            </p>
        </footer>
    )
}