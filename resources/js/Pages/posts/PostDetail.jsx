import Main from "@/Layouts/Main";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function PostDetail({ auth, post }) {
    return (
        <Main auth={auth}>
            <Head title={`Post Detail ${post.user.name}`} />
            <div className="px-12 py-3">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <Link
                                href={route("home")}
                                className="text-gray-800 font-semibold  dark:text-gray-300"
                            >
                                <FaArrowLeft size={20} className="mr-2" />
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-4xl px-12  mt-3 mx-auto min-h-screen">
                <div className="max-w-xl mx-auto ">
                    <img
                        src={`/storage/${post.image}`}
                        className="object-cover rounded-md"
                        alt={post.image ? post.name : ""}
                    />
                </div>
                <h1 className="text-center mt-3 md:text-xl sm:text-xl text-base lg:text-xl">
                    {post.description}
                </h1>
            </div>
        </Main>
    );
}
