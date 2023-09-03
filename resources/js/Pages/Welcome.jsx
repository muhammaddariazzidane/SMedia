import Footer from "@/Components/Footer";
import ModalSearch from "@/Components/modal/ModalSearch";
import Navbar from "@/Components/navigation/Navbar";
import PostsCard from "@/Components/posts/PostsCard";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Homepage" />
            <div className="min-h-screen w-full bg-white dark:bg-gray-800">
                <ModalSearch />
                <Navbar auth={auth} />
                <div className="max-w-7xl py-12 w-full px-6 mx-auto">
                    <PostsCard />
                </div>
            </div>
            <Footer />
        </>
    );
}
