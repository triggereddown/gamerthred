import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#050507" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
      />

      {/* Spinner ring */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* outer spinning gradient ring */}
        <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "1.6s" }} viewBox="0 0 112 112">
          <circle cx="56" cy="56" r="50" fill="none" stroke="url(#spinGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="220 80" />
          <defs>
            <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>

        {/* inner static ring */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r="50" fill="none" stroke="white" strokeWidth="1" />
        </svg>

        {/* Logo */}
        <motion.img
          src={assets.logo}
          alt="GamerThred"
          className="relative z-10 w-14 h-14 object-contain"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 16px rgba(124,58,237,0.9))" }}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #7C3AED, #22D3EE)", width: `${progress}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>

      {/* Label */}
      <p className="mt-4 text-xs font-medium tracking-[0.2em] uppercase" style={{ color: "rgba(156,163,175,0.6)" }}>
        Loading GamerThred
      </p>
    </motion.div>
  );
};

export default Loading;
