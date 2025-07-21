import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className="bg-[#050D2B] sticky top-0 z-50 px-4 sm:px-6 md:px-20 lg:px-32 py-4 shadow-md text-white font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" onClick={scrollToTop} className="flex items-center">
          <img src={assets.logo} alt="logo" className="w-28 h-16" />
        </Link>

        {/* Hamburger menu button (visible on mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/80">
          <Link
            to="/games"
            onClick={scrollToTop}
            className="hover:text-white transition hover:underline"
          >
            Games
          </Link>
          <Link
            to="/profile"
            onClick={scrollToTop}
            className="hover:text-white transition hover:underline"
          >
            Profile
          </Link>
          <Link
            to="/login"
            onClick={scrollToTop}
            className="bg-white text-black px-5 py-2 rounded-full hover:shadow-[0_0_12px_rgba(255,255,255,0.6)] transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={scrollToTop}
            className="bg-purple-500 text-white px-5 py-2 rounded-full hover:bg-purple-600 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu (Slide-down) */}
        {isMobileMenuOpen && (
          <div className="absolute top-[4.5rem] right-4 w-44 bg-[#0B132F] border border-white/10 rounded-xl p-4 flex flex-col gap-3 shadow-xl md:hidden">
            <Link
              to="/games"
              onClick={() => {
                scrollToTop();
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:underline"
            >
              Games
            </Link>
            <Link
              to="/profile"
              onClick={() => {
                scrollToTop();
                setIsMobileMenuOpen(false);
              }}
              className="text-white hover:underline"
            >
              Profile
            </Link>
            <Link
              to="/login"
              onClick={() => {
                scrollToTop();
                setIsMobileMenuOpen(false);
              }}
              className="bg-white text-black px-4 py-1.5 rounded-full text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => {
                scrollToTop();
                setIsMobileMenuOpen(false);
              }}
              className="bg-purple-500 text-white px-4 py-1.5 rounded-full text-center"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
