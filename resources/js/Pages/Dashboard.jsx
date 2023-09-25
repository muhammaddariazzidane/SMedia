import InputError from "@/Components/InputError";
import Alert from "@/Components/notification/Alert";
import Main from "@/Layouts/Main";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { CiTrash } from "react-icons/ci";
import { BsTrash2Fill } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";

dayjs.extend(relativeTime);

export default function Dashboard({ auth, posts }) {
    const [imgPrev, setImgPrev] = useState("");
    const { data, setData, post, processing, reset, errors } = useForm({
        description: "",
        image: null,
    });
    const handleFile = (e) => {
        setData("image", e.target.files[0]);
        setImgPrev(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("posts.store"), {
            onSuccess: () => {
                reset();
                setImgPrev("");
            },
        });
    };
    const { flash } = usePage().props;

    return (
        <Main auth={auth}>
            <Head title="Dashboard" />
            <div className="max-w-xl mx-auto py-12 ">
                <h1 className="text-center text-2xl text-gray-700 dark:text-gray-300">
                    Create Post
                </h1>
                {flash.message && (
                    <Alert message={flash.message} color={"alert-success"} />
                )}
                <form onSubmit={handleSubmit} className="p-6 shadow">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 dark:text-gray-300">
                                Description
                            </span>
                        </label>
                        <textarea
                            autoFocus
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="textarea text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 textarea-bordered h-24"
                            placeholder="Your posts text"
                        ></textarea>

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div className="form-control mb-3 mt-2">
                        {imgPrev && (
                            <div className="mb-3">
                                <div className="max-w-[15rem] ">
                                    <img src={imgPrev} className="rounded" />
                                </div>
                            </div>
                        )}
                        <div>
                            <input
                                onChange={handleFile}
                                type="file"
                                className="file-input file-input-bordered bg-white dark:bg-gray-700 file-input-primary file-input-sm h-10 file:h-10 w-full "
                            />
                        </div>

                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="justify-end flex">
                        {processing ? (
                            <button
                                className="btn btn-primary  opacity-60 btn-sm h-10 cursor-wait no-animation"
                                type="button"
                            >
                                <span className="loading loading-spinner"></span>
                                processing
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary  btn-sm h-10"
                            >
                                create
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {/* mypost */}
            <div className="max-w-6xl  mx-auto">
                <div className="overflow-y-auto overflow-x-auto  ">
                    <h1 className="text-center text-2xl mb-3 text-gray-800 dark:text-gray-300 ">
                        My posts
                    </h1>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-gray-800 dark:text-gray-300">
                                <th>No</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Date post</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 &&
                                posts.map((post, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-primary group transition-colors duration-300 hover:text-white text-gray-800 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        <th>{i + 1}</th>
                                        <td>
                                            {post.description.substr(0, 12)}...
                                        </td>
                                        <td>
                                            <img
                                                src={
                                                    post.image
                                                        ? `/storage/${post.image}`
                                                        : ""
                                                }
                                                className="w-12 rounded-md"
                                                alt={
                                                    post.image
                                                        ? post.description
                                                        : ""
                                                }
                                            />
                                        </td>
                                        <td>
                                            {dayjs(post.created_at).fromNow()}
                                        </td>
                                        <td className="flex gap-x-1 items-center">
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route(
                                                    "posts.delete",
                                                    post,
                                                )}
                                                className="btn bg-transparent border-none hover:bg-transparent btn-sm px-1"
                                            >
                                                <BsTrash2Fill
                                                    color="red"
                                                    size={23}
                                                />
                                            </Link>
                                            <Link
                                                as="button"
                                                href={route("posts.edit", post)}
                                                className="btn bg-transparent border-none hover:bg-transparent btn-sm px-1"
                                            >
                                                <MdOutlineEditNote
                                                    className="text-sky-400 group-hover:text-white transition-colors duration-300"
                                                    size={23}
                                                />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* mypost */}
        </Main>
    );
}
