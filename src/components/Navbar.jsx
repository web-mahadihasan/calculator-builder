import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="font-bold text-xl text-blue-500">CalcBuilder</span>
            </Link>
          </div>
          <div>
            <Link href="/builder">
              <span className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

