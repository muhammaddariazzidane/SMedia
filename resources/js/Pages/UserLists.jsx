import ListUsers from "@/Components/users/ListUsers";
import Main from "@/Layouts/Main";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "@inertiajs/react";

export default function UserLists({ auth, users }) {
    const [keyword, setKeyword] = useState("");
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    return (
        <Main auth={auth}>
            <div className="py-7">
                <div className="mx-auto px-6 flex justify-center pb-5">
                    <input
                        value={keyword || ""}
                        onChange={(e) => setKeyword(e.target.value)}
                        type="text"
                        placeholder="Search users...."
                        className="input dark:placeholder:text-gray-300 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-400 focus:outline-none border-none bg-gray-300/40 text-gray-800 dark:text-gray-300 dark:bg-gray-600  w-full max-w-sm"
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-6 p-4 dark:text-white sm:flex-row ">
                    {filteredUsers.map((user, i) => (
                        <Link
                            href="#"
                            as="button"
                            className="flex w-full min-h-16 h-full flex-col items-center justify-center shadow-md rounded-md   transition-all duration-300 hover:-translate-y-1 dark:bg-slate-700 dark:shadow-slate-900 md:w-5/6 lg:w-1/3 xl:w-1/4"
                            key={i}
                        >
                            <div
                                className={`avatar ${
                                    dayjs().diff(
                                        dayjs(user.last_seen),
                                        "minutes",
                                    ) <= 2
                                        ? " online "
                                        : " offline"
                                }`}
                            >
                                <div className="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                                    <img src={user.avatar} alt={user.name} />
                                </div>
                            </div>
                            <div className="stat">
                                <p className="text-gray-700 dark:text-gray-300">
                                    {user.name}
                                </p>
                                <p
                                    className={`${
                                        dayjs().diff(
                                            dayjs(user.last_seen),
                                            "minutes",
                                        ) <= 2
                                            ? " text-green-500 "
                                            : " text-gray-500 dark:text-gray-400"
                                    }`}
                                >
                                    {dayjs().diff(
                                        dayjs(user.last_seen),
                                        "minutes",
                                    ) <= 2
                                        ? " online "
                                        : " offline"}
                                </p>
                            </div>
                        </Link>
                    ))}

                    {filteredUsers.length === 0 ? (
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            Users Not Found
                        </p>
                    ) : null}
                </div>
            </div>
        </Main>
    );
}
