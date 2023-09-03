import React, { useEffect } from "react";

export default function ModalSearch() {
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

        // Tambahkan event listener ketika komponen dimount
        document.addEventListener("keydown", handleToggleModalSearch);

        // Hapus event listener ketika komponen di-unmount
        return () => {
            document.removeEventListener("keydown", handleToggleModalSearch);
        };
    }, []);

    return (
        <>
            <dialog id="my_modal_2" className="modal backdrop-blur-sm">
                <form
                    method="dialog"
                    className="modal-box top-24 rounded-md fixed bg-white dark:bg-gray-800 -translate-y-12"
                >
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-300">
                        Search posts
                    </h3>
                    <div className="py-4">
                        <input
                            id="search"
                            type="search"
                            placeholder="Search any posts....."
                            className="input input-bordered input-primary placeholder:text-gray-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md w-full"
                        />
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
