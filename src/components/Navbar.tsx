
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-sfpro font-bold">
            Ruben Carrazco
          </Link>
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-2 rounded-lg"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-2 rounded-lg"
            >
              About
            </Link>
            <Link 
              to="/projects" 
              className="font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-2 rounded-lg"
            >
              Projects
            </Link>
            <Link 
              to="/resume" 
              className="font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-2 rounded-lg"
            >
              Resume
            </Link>
            <Link 
              to="/contact" 
              className="font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-2 rounded-lg"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
