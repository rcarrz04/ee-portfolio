
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-sfpro font-bold">
            Ruben Carrazco
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-900 hover:text-gray-600 transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">
            <div className="px-4 py-2 space-y-2">
              <Link 
                to="/" 
                onClick={closeMenu}
                className="block font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-3 rounded-lg"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={closeMenu}
                className="block font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-3 rounded-lg"
              >
                About
              </Link>
              <Link 
                to="/projects" 
                onClick={closeMenu}
                className="block font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-3 rounded-lg"
              >
                Projects
              </Link>
              <Link 
                to="/resume" 
                onClick={closeMenu}
                className="block font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-3 rounded-lg"
              >
                Resume
              </Link>
              <Link 
                to="/contact" 
                onClick={closeMenu}
                className="block font-sfpro text-gray-900 hover:text-gray-600 transition-colors bg-gray-100 px-4 py-3 rounded-lg"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
