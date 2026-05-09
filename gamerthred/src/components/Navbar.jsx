import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X, Gamepad2, Trophy, Crosshair, Gift, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { to: "/games",       label: "Games",       icon: Gamepad2  },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy    },
  { to: "/missions",    label: "Missions",    icon: Crosshair },
  { to: "/challenges",  label: "Challenges",  icon: Trophy },
];

const AUTH_LINKS = [
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/profile", label: "Profile", icon: User },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();

  /* ── auth ── */
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location]);

  /* ── scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setMobileOpen(false);
    navigate("/login");
  };

  /* drawer variants */
  const drawer = {
    hidden: { opacity: 0, y: -8, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5,5,7,0.85)"
          : "rgba(5,5,7,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
      }}
    >
      <div className="max-container px-6 md:px-10 flex items-center justify-between h-[72px]">

        {/* ── Logo ── */}
        <Link to="/" onClick={scrollToTop} className="flex items-center shrink-0">
          <img
            src={assets.logo}
            alt="GamerThred"
            className="h-12 w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 12px rgba(124,58,237,0.6))" }}
          />
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={scrollToTop}
              className="nav-link"
            >
              {label}
            </Link>
          ))}

          {isAuthenticated &&
            AUTH_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} onClick={scrollToTop} className="nav-link">
                {label}
              </Link>
            ))}
        </div>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-500/30 text-red-400 px-5 py-2 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:scale-[1.02] transition-all duration-300"
            >
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={scrollToTop} className="btn-secondary text-sm py-[10px] px-6">
                Login
              </Link>
              <Link to="/signup" onClick={scrollToTop} className="btn-primary text-sm py-[10px] px-6">
                Sign Up Free
              </Link>
            </>
          )}
        </div>

        {/* ── Hamburger ── */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-white/80 hover:border-white/20 hover:text-white transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 mx-4 mb-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(11,11,18,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.08)",
            }}
          >
            <div className="p-5 flex flex-col gap-1">
              {[...NAV_LINKS, ...(isAuthenticated ? AUTH_LINKS : [])].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => { scrollToTop(); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
                >
                  <Icon size={15} className="text-purple-400" />
                  {label}
                </Link>
              ))}

              <div className="h-px bg-white/5 my-2" />

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => { scrollToTop(); setMobileOpen(false); }}
                    className="btn-secondary text-center text-sm py-[10px]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => { scrollToTop(); setMobileOpen(false); }}
                    className="btn-primary text-center text-sm py-[10px]"
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
