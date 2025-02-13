import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import "../App.css"
import { useApp } from "../Context/AppContext";
import Footer from "../components/Footer";

const MainLayout = () => {
    const {darkMode} = useApp()

    return (
        <div className={`min-h-screen font-inter ${darkMode ? "dark" : ""}`}>
            <div className="dark:bg-gray-900 dark:text-white h-full">
                <nav className="sticky top-0 w-full z-50">
                    <Navbar/>
                </nav>

                <main className="min-h-[calc(100vh-100px)]">
                    <Outlet/>
                </main>

            </div>
        </div>
    );
};

export default MainLayout;