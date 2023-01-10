import React from "react";
import Image from "next/image";
import Headerimg from "/public/Headerimg.png";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { unstable_getServerSession } from "next-auth";

async function Header() {
    const session = await unstable_getServerSession()
    if (session)
        return (
            <header className="sticky top-0 z-50 bg-white flex justify-between  items-center p-2 shadow-sm">
                <div className="flex space-x-2">
                    <Image
                        src={session.user?.image!}
                        alt="logo"
                        height={10}
                        width={50}
                        className="rounded-full mx-2 "
                    />
                    <div>
                        <p className="text-blue-400">logged in as:</p>
                        <p className="font-bold text-lg">{session.user?.name}</p>
                    </div>
                </div>
                <LogoutButton />
            </header>
        );
    return (
        <header className=" sticky top-0 z-50 bg-white flex justify-center items-center p-2 shadow-sm">
            <div className="flex flex-col items-center space-y-5">
                <div className="flex space-x-2 items-center">
                    <Image src={Headerimg} alt="" height={60} width={90} />
                    <p className="text-blue-400">Welcome to Chit Chat Messenger</p>
                </div>
                <Link
                    href="/auth/signin"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign In
                </Link>
            </div>
        </header>
    );
};

export default Header;
