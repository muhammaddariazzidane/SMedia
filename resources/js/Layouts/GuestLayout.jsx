import DarkMode from "@/Components/button/DarkMode";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 ">{children}</div>
        </div>
    );
}
