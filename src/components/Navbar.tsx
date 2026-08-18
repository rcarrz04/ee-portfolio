import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Résumé" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setIsOpen(false);

  const linkClass = (to: string) =>
    cn(
      "font-mono text-xs uppercase tracking-wide transition-colors border-b border-transparent pb-0.5",
      pathname === to
        ? "text-signal border-signal"
        : "text-graphite hover:text-ink hover:border-line"
    );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-paper/90 backdrop-blur-sm z-50 border-b border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-display text-lg font-semibold text-ink">
            Ruben Carrazco
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass(link.to)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink hover:text-graphite transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-paper border-b border-line">
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className="block font-mono text-xs uppercase tracking-wide text-graphite hover:text-ink py-3"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
