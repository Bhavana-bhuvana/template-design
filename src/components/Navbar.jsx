import React, { useEffect, useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DonationModal from "./DonationModal";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showNavbar, setShowNavbar] = useState(false); // start hidden

  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleCloseMenu = () => setIsOpen(false);

  const navItems = [
    { id: "home", label: "Home", type: "scroll" },
    { id: "publications", label: "Publications", type: "scroll" },
    { id: "pressreleases", label: "Press Releases", type: "route", path: "/pressreleases" },
    { id: "explore", label: "Stories", type: "scroll" },
    { id: "volunteercorner", label: "Explore", type: "scroll" },
  ];

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return; // Hero not loaded yet

      const heroHeight = hero.offsetHeight;
      setShowNavbar(window.scrollY > heroHeight - 50);

      // Scroll spy
      const scrollPosition = window.scrollY + 100;
      navItems.forEach((item) => {
        if (item.type === "scroll") {
          const element = document.getElementById(item.id);
          if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
              setActiveSection(item.id);
            }
          }
        }
      });
    };

    // Run after first paint
    requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleClick = (item, e) => {
    e.preventDefault();
    handleCloseMenu();

    if (item.type === "scroll") {
      const targetElement = document.getElementById(item.id);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
      }
    } else if (item.type === "route") {
      navigate(item.path);
    }
  };

  const renderLinks = () => (
    <ul className="font-medium flex flex-col md:flex-row lg:space-x-8 sm:space-x-4 space-y-2 md:space-y-0 p-4 md:p-0">
      {navItems.map((item) => (
        <li key={item.id}>
          <motion.a
            href={item.type === "scroll" ? `#${item.id}` : item.path}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => handleClick(item, e)}
            className={`text-white hover:text-[#34d399] transition-colors duration-300 ${
              activeSection === item.id ||
              (item.type === "route" && location.pathname === item.path)
                ? "font-bold text-[#06a055]"
                : ""
            }`}
          >
            {item.label}
          </motion.a>
        </li>
      ))}
    </ul>
  );

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-heroBG/90 backdrop-blur-md text-white py-3 px-4 fixed top-0 left-0 right-0 z-10 shadow-md"
        >
          <div className="container mx-auto flex justify-between items-center h-full">
            {/* logo */}
            <div className="flex items-center">
              <a href="/">
                <img src="logo.png" alt="logo" className="h-12 w-auto object-contain" />
              </a>
            </div>

            {/* desktop nav */}
            <div className="hidden md:flex flex-grow justify-center">
              <nav>{renderLinks()}</nav>
            </div>

            {/* donate button */}
           <button
  className="text-white bg-primary/90 hover:bg-primary px-4 py-2 rounded-lg shadow"
  onClick={() => navigate("/donate")}
>
  Donate
</button>

            {/* mobile menu button */}
            <div className="block md:hidden">
              <button
                onClick={handleToggle}
                className={`text-white focus:outline-none rounded-lg p-2 ${
                  isOpen ? "bg-white/20" : "bg-transparent"
                }`}
              >
                <TfiMenuAlt className="size-6" />
              </button>
            </div>
          </div>

          {/* mobile nav */}
          {isOpen && (
            <nav className="absolute top-full left-0 w-full bg-heroBG/95 backdrop-blur-lg shadow-lg z-20 md:hidden">
              <ul className="flex flex-col p-4 space-y-3">
                {renderLinks().props.children}
                <li className="py-2">
                  <Link
                    to="/donate"
                    className="text-white bg-primary/90 hover:bg-primary px-3 py-2 rounded-lg shadow"
                    onClick={handleCloseMenu}
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
