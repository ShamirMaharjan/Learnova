import Link from "next/link";
import Image from "next/image";
import Navitems from "./Navitems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="flex items-center gap-2.5 cursor-pointer">
                <Link href="/">
                    <Image src="/favicon.ico" alt="logo" width={46} height={44}></Image>
                </Link>
            </div>

            <div className="flex items-center gap-8">
                <Navitems />
                <SignedOut>

                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>


                </SignedOut>
                <SignedIn>

                    <UserButton />

                </SignedIn>

            </div>

        </nav>
    )
}

export default Navbar