import { Link } from "@inertiajs/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer className="footer footer-center  py-5 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 rounded">
                <div className="flex">
                    <Link href="">
                        <FaGithub
                            className="text-gray-800 dark:text-gray-300"
                            size={29}
                        />
                    </Link>
                </div>
                <p className="-mt-5 text-gray-700 dark:text-gray-300">
                    Copyright © 2023 - All right reserved by SMedia Industries
                    Ltd
                </p>
            </footer>
        </>
    );
}
