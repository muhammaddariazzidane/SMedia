import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import DarkMode from "../button/DarkMode";
import { HiOutlineHome, HiX } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CiSearch, CiLogin, CiLogout } from "react-icons/ci";

export default function Navbar({ auth }) {
    const [menu, setMenu] = useState(false);
    const handleNavMenu = () => {
        setMenu(!menu);
    };
    return (
        <>
            <div className="navbar px-4 py-3 lg:px-6 dark:bg-gray-800 bg-white shadow-gray-200 dark:shadow-gray-600 shadow">
                <div className="navbar-start">
                    <div className="lg:hidden sm:hidden md:hidden xl:hidden">
                        <button
                            type="button"
                            onClick={handleNavMenu}
                            className="btn btn-ghost btn-circle p-0"
                        >
                            {menu ? (
                                <HiX className="w-6 h-6 text-gray-800 dark:text-gray-400" />
                            ) : (
                                <FaBars className="w-6 h-6 text-gray-800 dark:text-gray-400" />
                            )}
                        </button>
                    </div>
                    <div
                        className={`lg:flex md:flex sm:flex items-center xl:flex ${
                            menu
                                ? "absolute z-10 lg:top-2 md:top-2 sm:top-2 top-16 bg-inherit lg:shadow-none md:shadow-none sm:shadow-none xl:shadow-none shadow-md rounded-md"
                                : "hidden"
                        }`}
                    >
                        <button
                            type="button"
                            className="btn btn-ghost btn-circle "
                        >
                            <HiOutlineHome
                                className={`w-9 h-9 p-2 text-black dark:text-gray-300 ${
                                    location.pathname == "/"
                                        ? "border-b-2 border-b-gray-800 dark:border-b-gray-400"
                                        : ""
                                }`}
                            />
                        </button>
                        <button
                            onClick={() => window.my_modal_2.showModal()}
                            type="button"
                            className="btn btn-ghost btn-circle group"
                        >
                            <CiSearch className="w-9 h-9 p-2 text-black dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost btn-circle"
                        >
                            <DarkMode />
                        </button>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-2xl group ">
                        <span className="bg-clip-text rotate-[335deg] group-hover:mt-[0.1rem] transition-all duration-300 delay-300 -m-4  mt-[0.4rem] text-3xl text-transparent bg-gradient-to-r from-teal-500 to-sky-600">
                            S
                        </span>
                        <span className="bg-clip-text text-transparent -rotate-6 group-hover:-rotate-0 transition-all duration-300 z-10 bg-gradient-to-r from-sky-600 via-slate-500 dark:via-slate-400 to-slate-500 dark:to-slate-400">
                            Media
                        </span>
                    </a>
                </div>
                <div className="navbar-end">
                    {auth.user ? (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        src={auth.user.avatar}
                                        alt={auth.user.name}
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 px-1 shadow-md menu menu-sm dropdown-content text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-md w-32"
                            >
                                <li>
                                    <Link href={route("dashboard")}>
                                        <MdDashboard className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                                        <span className="text-gray-800 dark:text-gray-300">
                                            Dashboard
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("logout")}
                                        as="button"
                                        method="post"
                                    >
                                        <CiLogout className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                                        <span className="text-gray-800 dark:text-gray-300">
                                            Logout
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            href={route("login")}
                            className=" flex items-center btn btn-ghost py-1 text-gray-800 dark:text-gray-300"
                        >
                            <CiLogin className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
