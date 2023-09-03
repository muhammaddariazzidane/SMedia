import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const [showFlash, setShowFlash] = useState(true);

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.message) {
            setShowFlash(true);
            setTimeout(() => {
                setShowFlash(false);
            }, 3000);
        }
        return () => {
            reset("password");
        };
    }, [flash.message]);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            {showFlash && flash.message && (
                <div className="toast toast-top toast-center top-12 lg:top-8">
                    <div className="alert alert-warning rounded-md">
                        <span>{flash.message}</span>
                    </div>
                </div>
            )}
            <form
                className="bg-white dark:bg-gray-800 px-6 py-3 shadow-md rounded-lg"
                onSubmit={submit}
            >
                <div className="text-center">
                    <h1 className="text-2xl mb-3 text-gray-800 dark:text-gray-400">
                        Login
                    </h1>
                    <p className="text-gray-700 text-sm dark:text-gray-400 ">
                        Login using social account
                    </p>
                </div>
                <div className="text-center flex justify-center gap-x-2 my-5 font-semibold text-white">
                    <div>
                        <a
                            download={false}
                            href={route("google", "google")}
                            className=" text-gray-700  bg-white dark:bg-gray-200 hover:opacity-90 dark:hover:bg-gray-300 transition-all duration-300  font-semibold rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 shadow ring-1 ring-gray-100 dark:ring-gray-200 dark:hover:ring-gray-300"
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Google
                        </a>
                    </div>
                    <div>
                        <a
                            download={false}
                            href={route("github", "github")}
                            className="text-white bg-[#24292F] dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-[#24292F]/90 focus:outline-none  font-medium rounded-md text-sm transition-all duration-300 px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2"
                        >
                            <FaGithub className="w-5 h-5 mr-2" />
                            Github
                        </a>
                    </div>
                </div>
                <div className="flex justify-center gap-2 mb-3 items-center">
                    <div className="border-b border-gray-500 w-full"></div>
                    <p className="text-gray-500">Or</p>
                    <div className="border-b border-gray-500 w-full"></div>
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="block mt-4 ">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2  text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>
                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none "
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
