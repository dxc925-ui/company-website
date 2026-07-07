import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "HOME" },
  { path: "/about", label: "ABOUT" },
  { path: "/products", label: "PRODUCTS" },
  { path: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-street-offwhite/95 backdrop-blur-sm border-b border-street-gray"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/BMG logo.png"
              alt="Best Mind Garment Logo"
              className="h-12 w-auto group-hover:opacity-80 transition-opacity"
            />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-display text-base tracking-widest transition-colors hover:text-street-neonDark ${
                  location.pathname === link.path
                    ? "text-street-neonDark"
                    : "text-street-black"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-street-neon transition-all duration-300 ${
                    location.pathname === link.path ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-street-black hover:text-street-neonDark transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-street-gray ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-lg tracking-widest py-2 border-b border-street-gray transition-colors ${
                location.pathname === link.path
                  ? "text-street-neonDark"
                  : "text-street-black hover:text-street-neonDark"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
