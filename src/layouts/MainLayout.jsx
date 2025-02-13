import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import "../App.css"

const MainLayout = () => {
    return (
        <div className="h-screen overflow-hidden font-inter">
            <nav>
                <Navbar/>
            </nav>

            <main className="min-h-[calc(100vh-120px)]">
                <Outlet/>
            </main>


        </div>
    );
};

export default MainLayout;