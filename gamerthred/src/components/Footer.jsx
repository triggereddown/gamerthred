import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#050D2B] text-white py-8 px-4 sm:px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-0 md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="Logo"
            className="h-36 w-36 object-contain rounded p-2"
          />
        </div>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold mt-4 md:mt-0">
          <Link
            to="/about"
            onClick={scrollToTop}
            className="hover:text-purple-400 transition"
          >
            About Us
          </Link>
          <Link
            to="/"
            onClick={scrollToTop}
            className="hover:text-purple-400 transition"
          >
            Home
          </Link>
          <Link
            to="/signup"
            onClick={scrollToTop}
            className="hover:text-purple-400 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            onClick={scrollToTop}
            className="hover:text-purple-400 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-4 mt-6 text-xl">
        <a
          href="https://www.linkedin.com/company/gamerthred/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 transition"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a
          href="mailto:gamerthred1@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 transition"
        >
          <i className="fa-solid fa-envelope"></i>
        </a>
        <a
          href="https://www.instagram.com/gamerthred?igsh=dGthdDJ4eGlmYjlr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 transition"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href="https://discord.gg/K5s4tmHyWz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-400 transition"
        >
          <i className="fa-brands fa-discord"></i>
        </a>
      </div>

      {/* Disclaimer text */}
      <div className="text-center text-gray-400 text-xs mt-6 max-w-4xl mx-auto px-2">
        All trademarks, game titles, and logos used on this platform are the
        property of their respective owners. GamerThred is an independent
        platform and is not affiliated with, endorsed, or sponsored by any game
        developers or publishers.
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GamerThred. All rights reserved.
      </div>

      {/* Legal Links - moved to bottom */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-3 text-xs text-gray-600">
        <Link
          to="/disclaimer"
          onClick={scrollToTop}
          className="hover:underline"
        >
          Disclaimer
        </Link>
        <span className="hidden md:inline">|</span>
        <Link to="/tos" onClick={scrollToTop} className="hover:underline">
          Terms & Conditions
        </Link>
        <span className="hidden md:inline">|</span>
        <Link to="/privacy" onClick={scrollToTop} className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
