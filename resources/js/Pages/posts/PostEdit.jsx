import InputError from "@/Components/InputError";
import Alert from "@/Components/notification/Alert";
import Main from "@/Layouts/Main";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function PostEdit({ auth, posts }) {
    const { data, setData, processing, put, reset, errors } = useForm({
        description: posts.description || "",
        image: posts.image || "",
    });

    const [imgPrev, setImgPrev] = useState(
        posts.image ? `/storage/${posts.image}` : "",
    );

    useEffect(() => {
        if (posts.image) {
            setImgPrev(`/storage/${posts.image}`);
        }
    }, [posts.image]);

    const handleFile = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            setImgPrev(URL.createObjectURL(file));
        } else {
            setImgPrev(data.image);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("posts.update", { id: posts.id }), {
            description: data.description,
            image: data.image,
        });
    };

    const { flash } = usePage().props;
    return (
        <Main auth={auth}>
            <Head title="Edit Post" />
            <div className="max-w-xl mx-auto py-12">
                <h1 className="text-center text-2xl text-gray-700 dark:text-gray-300">
                    Edit Post
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
                                    <img
                                        src={imgPrev}
                                        alt="Preview"
                                        className="rounded"
                                    />
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
                                Processing
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary  btn-sm h-10"
                            >
                                Update
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Main>
    );
}
