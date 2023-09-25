import ModalSearch from "@/Components/modal/ModalSearch";
import PostsCard from "@/Components/posts/PostsCard";
import Main from "@/Layouts/Main";
import { Head } from "@inertiajs/react";

export default function Posts({ auth, posts }) {
    return (
        <Main auth={auth}>
            <Head title="Home" />
            <div className="lg:px-20 px-3 pt-5">
                <div className="text-sm ">
                    <ul className="flex justify-between px-4">
                        <li>
                            <div className="text-gray-800 text-lg  dark:text-gray-300">
                                Readable posts
                            </div>
                        </li>
                        <li
                            className="relative hidden md:block sm:block lg:block cursor-pointer"
                            onClick={() => window.my_modal_2.showModal()}
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                className="input cursor-pointer h-10 max-h-10 border-none shadow-sm ring-0 focus:ring-0 input-primary placeholder:text-gray-400 focus:outline-none bg-stone-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300  rounded-md w-full"
                                readOnly
                            />
                            <div className="absolute top-2.5 right-2">
                                <div className="badge  mr-[.1rem] shadow-sm shadow-gray-500">
                                    Ctrl
                                </div>
                                <div className="badge ml-[.1rem]  shadow-sm shadow-gray-500">
                                    K
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl pb-12 pt-6 w-full px-6 mx-auto">
                <ModalSearch posts={posts} />
                <PostsCard posts={posts} />
            </div>
        </Main>
    );
}
