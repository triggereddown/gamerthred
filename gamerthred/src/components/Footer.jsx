import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SOCIAL = [
  {
    href: "https://www.linkedin.com/company/gamerthred/",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    href: "mailto:gamerthred1@gmail.com",
    label: "Email",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/gamerthred?igsh=dGthdDJ4eGlmYjlr",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: "https://discord.gg/K5s4tmHyWz",
    label: "Discord",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
  },
];

const NAV_COLS = [
  {
    title: "Platform",
    links: [
      { to: "/", label: "Home" },
      { to: "/games", label: "Games" },
      { to: "/missions", label: "Missions" },
      { to: "/leaderboard", label: "Leaderboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/signup", label: "Sign Up" },
      { to: "/login", label: "Login" },
      { to: "/rewards", label: "Rewards" },
      { to: "/profile", label: "Profile" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/disclaimer", label: "Disclaimer" },
      { to: "/tos", label: "Terms & Conditions" },
      { to: "/privacy", label: "Privacy Policy" },
    ],
  },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Divider gradient line */}
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(34,211,238,0.3), transparent)" }} />

      <div className="max-container px-8 pt-16 pb-10 relative z-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-14">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link to="/" onClick={scrollToTop}>
              <img
                src={assets.logo}
                alt="GamerThred"
                className="h-14 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 16px rgba(124,58,237,0.55))" }}
              />
            </Link>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-muted)" }}>
              The gaming rewards platform where every achievement earns you real-world prizes. Play hard, win bigger.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL.map(({ href, label, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(229,231,235,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.15)";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                    e.currentTarget.style.color = "#a78bfa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(229,231,235,0.6)";
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-4">
              <h4
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "rgba(156,163,175,0.5)" }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={scrollToTop}
                      className="text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                      style={{ color: "rgba(229,231,235,0.55)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#E5E7EB"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(229,231,235,0.55)"; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="w-full h-px mb-8" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(107,114,128,0.8)" }}>
            © {new Date().getFullYear()} GamerThred. All rights reserved.
          </p>

          <p className="text-xs text-center max-w-md leading-relaxed" style={{ color: "rgba(107,114,128,0.6)" }}>
            All trademarks, game titles, and logos are property of their respective owners. GamerThred is an independent platform not affiliated with any game developers.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-300"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#a78bfa",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
