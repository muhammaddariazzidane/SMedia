import { Link, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function ModalSearch({ posts }) {
    useEffect(() => {
        const handleToggleModalSearch = (e) => {
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                if (window.my_modal_2) {
                    window.my_modal_2.showModal();
                } else {
                    console.error("window.my_modal_2 belum didefinisikan.");
                }
            }
        };

        // event listener ketika komponen dimount
        document.addEventListener("keydown", handleToggleModalSearch);

        // Hapus event listener ketika komponen di-unmount
        return () => {
            document.removeEventListener("keydown", handleToggleModalSearch);
        };
    }, []);
    const { get, data, setData } = useForm({
        query: "",
    });
    const [visibleCount, setVisibleCount] = useState(2);
    const [showLoadMore, setShowLoadMore] = useState(true); // State untuk mengontrol visibilitas tombol "Load More"
    const [filteredPosts, setFilteredPosts] = useState([]); // State untuk data posting yang sesuai dengan pencarian

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            await get("/", { query: data.query });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (data.query) {
            const filtered = posts.filter((post) => {
                return post.description
                    .toLowerCase()
                    .includes(data.query.toLowerCase());
            });
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts([]);
        }
    }, [data.query, posts]);

    return (
        <>
            <dialog id="my_modal_2" className="modal">
                <form
                    method="dialog"
                    onSubmit={handleSearch}
                    className="modal-box top-24  rounded-md fixed bg-white dark:bg-gray-800 -translate-y-12"
                >
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-300">
                        Search posts
                    </h3>
                    <div className="py-4 join w-full">
                        <input
                            autoComplete="off"
                            id="search"
                            type="text"
                            placeholder="Search any posts....."
                            onChange={(e) => setData("query", e.target.value)}
                            className="input h-10 join-item border-none focus:ring-primary input-primary placeholder:text-gray-400 focus:outline-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-r-none rounded-md w-full"
                        />
                        <button className="btn min-h-full max-h-10  no-animation join-item  capitalize">
                            <CiSearch size={28} className="rotate-90" />
                        </button>
                    </div>
                    <p className="px-2 pb-1 text-gray-700 dark:text-gray-400">
                        Related posts
                    </p>
                    <div className={`overflow-y-auto max-h-56`}>
                        {filteredPosts.slice(0, visibleCount).map((post, i) => (
                            <Link
                                href={route("posts.detail", post)}
                                className="p-1.5 rounded-md hover:bg-primary group block mb-1"
                                key={i}
                            >
                                <div className="flex gap-x-2">
                                    <img
                                        src={post.user.avatar}
                                        className="w-6 rounded-full"
                                        alt=""
                                    />
                                    <p className="capitalize dark:text-gray-300 group-hover:text-white text-gray-700">
                                        {post.description}
                                    </p>
                                </div>
                            </Link>
                        ))}

                        {data.query !== "" && filteredPosts.length === 0 ? (
                            <p className="text-center text-gray-700 dark:text-gray-400">
                                Post not found
                            </p>
                        ) : (
                            showLoadMore &&
                            filteredPosts.length > visibleCount && (
                                <div className="flex justify-end mr-3">
                                    <button
                                        className="text-gray-700 dark:text-gray-300"
                                        type="button"
                                        onClick={() =>
                                            setVisibleCount(visibleCount + 2)
                                        }
                                    >
                                        Load More
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
