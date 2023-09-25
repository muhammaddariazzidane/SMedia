import Footer from "@/Components/Footer";
import Navbar from "@/Components/navigation/Navbar";

export default function Main({ children, auth }) {
    return (
        <>
            <div className="min-h-screen w-full bg-white dark:bg-gray-800">
                <Navbar auth={auth} />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
}
