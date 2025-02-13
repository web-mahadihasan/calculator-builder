import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div>
            <nav>
                <Navbar/>
            </nav>

            <main>
                <Outlet/>
            </main>

            
        </div>
    );
};

export default MainLayout;