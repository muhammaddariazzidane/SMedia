import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer className="footer footer-center  py-5 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 rounded">
                <div className="flex">
                    <a
                        href="https://github.com/muhammaddariazzidane/SMedia"
                        target="_blank"
                    >
                        <FaGithub
                            className="text-gray-800 dark:text-gray-300"
                            size={29}
                        />
                    </a>
                </div>
                <p className="-mt-5 text-gray-700 dark:text-gray-300">
                    Copyright © 2023 - All right reserved by SMedia Industries
                </p>
            </footer>
        </>
    );
}
