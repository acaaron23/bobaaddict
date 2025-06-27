import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "BobaAddict - Track your Addiction",
        template: "%s | BobaAddict",
    },
    description: "BobaAddict - Track your Addiction one purchase at a time",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-[#E3D1C3]`}>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <Nav />
                <main className="flex-grow w-full">{children}</main>
            </GoogleOAuthProvider>
            <Footer />
        </body>
        </html>
    );
}
