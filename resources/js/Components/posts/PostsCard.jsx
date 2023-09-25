import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function PostsCard({ posts }) {
    return (
        <div className="flex justify-center flex-wrap ">
            {posts && posts.length > 0 ? (
                posts.map((post, i) => (
                    <div
                        key={i}
                        className="card lg:w-1/4 mx-3 md:w-1/3 sm:w-1/2 w-full mb-3  hover:opacity-80 transition-all duration-300 bg-white dark:bg-gray-700 shadow-md rounded-lg"
                    >
                        <div className="flex flex-col justify-center p-5">
                            <h1 className="mb-4 text-lg text-gray-700 dark:text-gray-200">
                                {post.description.substr(0, 27)}...
                            </h1>
                            <div className="flex justify-between  items-end ">
                                <div className="flex space-x-2 items-center">
                                    <img
                                        className="rounded-full w-9 h-9"
                                        src={
                                            post.user.auth_type
                                                ? post.user.avatar
                                                : "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                                        }
                                        alt="profile picture"
                                    />
                                    <div>
                                        <h4 className="text-sm text-gray-600 dark:text-gray-300">
                                            {post.user.name}
                                        </h4>
                                        <Link
                                            href=""
                                            className="lg:text-sm md:text-sm sm:text-sm text-xs block text-gray-500 dark:text-gray-400"
                                        >
                                            {dayjs(post.created_at).fromNow()} |
                                            1 comments
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <Link
                                        href={route("posts.detail", post)}
                                        className="link link-hover text-gray-600 dark:text-gray-300"
                                    >
                                        view...
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-center lg:text-3xl md:text-2xl sm:text-xl xl:text-4xl text-lg font-semibold text-gray-800 dark:text-gray-300">
                    Posts Not Yet Available
                </h1>
            )}
        </div>
    );
}
