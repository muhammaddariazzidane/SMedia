import { Link } from "@inertiajs/react";
import React from "react";

export default function PostsCard() {
    return (
        <>
            <div className="card max-w-3xl mb-3 mx-auto hover:opacity-80 transition-all duration-300 bg-white dark:bg-gray-700 shadow-md rounded-lg">
                <div className="flex flex-col p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Very easy this was to integrate
                    </h3>
                    <p className="mb-3 mt-1 text-gray-600 dark:text-gray-300">
                        If you care for your time, I hands down would go with
                        this."
                    </p>
                    <div className="flex justify-between  items-end ">
                        <div className="flex space-x-2">
                            <img
                                className="rounded-full w-9 h-9"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                                alt="profile picture"
                            />
                            <div>
                                <h4 className="text-sm text-gray-600 dark:text-gray-300">
                                    Bonnie Green
                                </h4>
                                <Link
                                    href=""
                                    className="text-sm block text-gray-500 dark:text-gray-400"
                                >
                                    Post at 2 days ago | 1 comments
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Link className="link link-hover text-gray-600 dark:text-gray-300">
                                view...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
