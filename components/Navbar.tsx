import Link from "next/link";
import Image from "next/image";
import Navitems from "./Navitems";
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
                <p>Sign In</p>
            </div>

        </nav>
    )
}

export default Navbar