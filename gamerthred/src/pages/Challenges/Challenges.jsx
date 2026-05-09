import React from "react";
import { motion } from "framer-motion";
import { Play, Trophy, Crosshair } from "lucide-react";

const CHALENGES_DATA = [
  {
    id: 1,
    title: "100 Headshots in Valorant",
    desc: "Achieve 100 headshots in unrated or competitive matches this week.",
    reward: "Exclusive T-Shirt",
    status: "live",
    icon: Crosshair,
    progress: 45,
    total: 100,
  },
  {
    id: 2,
    title: "Diamond Rank Rush",
    desc: "Hit Diamond rank in Apex Legends before the season ends.",
    reward: "Gaming Mousepad",
    status: "live",
    icon: Trophy,
    progress: 0,
    total: 1,
  },
  {
    id: 3,
    title: "Play 50 Matches",
    desc: "Complete 50 matches across any supported game on our platform.",
    reward: "500 Coins",
    status: "upcoming",
    icon: Play,
    progress: 0,
    total: 50,
  },
];

const Challenges = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-container">
      <div className="flex flex-col gap-6 mb-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide w-max"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--text-primary)",
          }}
        >
          Daily & Weekly
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-heading font-semibold tracking-tight"
        >
          Challenges
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-muted font-normal"
          style={{ color: "var(--text-muted)" }}
        >
          Push your limits and earn exclusive real-world rewards. Track your progress, dominate the leaderboards, and claim your prizes.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHALENGES_DATA.map((challenge, i) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="glass-card flex flex-col gap-5 relative group"
          >
            {challenge.status === "live" && (
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
              </div>
            )}
            {challenge.status === "upcoming" && (
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-white/50">
                Upcoming
              </div>
            )}

            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
              <challenge.icon size={20} />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-heading font-semibold tracking-tight">
                {challenge.title}
              </h3>
              <p className="text-sm font-normal text-muted" style={{ color: "var(--text-muted)" }}>
                {challenge.desc}
              </p>
            </div>

            <div className="mt-auto pt-4 flex flex-col gap-3">
              <div className="flex justify-between text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                <span>Progress</span>
                <span style={{ color: "var(--text-primary)" }}>{challenge.progress} / {challenge.total}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000"
                  style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 pt-4 border-t border-white/10">
                <span className="text-xs text-muted" style={{ color: "var(--text-muted)" }}>Reward:</span>
                <span className="text-sm font-medium gradient-text">{challenge.reward}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
