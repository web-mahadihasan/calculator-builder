import { Link } from "react-router"
import { useApp } from "../Context/AppContext"
import { Moon, Sun } from "lucide-react"

const Navbar = () => {
    const {darkMode, toggleDarkMode} = useApp()
    
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <Link href="/">
                <span className="font-bold text-2xl text-blue-500">CalcBuilder</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
                >
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                </div>
                <div>
                    <Link to="/calculator">
                    <span className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2.5 px-4 rounded transition-colors duration-200">
                        Try it Free
                    </span>
                    </Link>
                </div>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default Navbar

