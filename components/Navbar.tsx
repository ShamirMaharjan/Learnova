"use client"

import Link from "next/link"
import Image from "next/image"
import Navitems from "./Navitems"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Navbar = () => {
    return (
        <div>
            <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="text-xl font-bold text-gray-800"></span>
                    </Link>
                </div>

                {/* Navigation and Auth Buttons */}
                <div className="flex items-center gap-6">
                    <Navitems />

                    <SignedOut>
                        <SignInButton>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
