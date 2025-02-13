import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import "../App.css"
import { useApp } from "../Context/AppContext";

const MainLayout = () => {
    const {darkMode} = useApp()

    return (
        <div className={`h-screen overflow-hidden font-inter ${darkMode ? "dark" : ""}`}>
            <div className="dark:bg-gray-900 dark:text-white">
                <nav>
                    <Navbar/>
                </nav>

                <main className="min-h-[calc(100vh-120px)]">
                    <Outlet/>
                </main>


            </div>
        </div>
    );
};

export default MainLayout;