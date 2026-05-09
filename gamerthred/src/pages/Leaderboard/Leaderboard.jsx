import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const [players, setPlayers] = useState([
    { id: 1, name: "ZebionMaster", gtc: 14500, profile_picture: "" },
    { id: 2, name: "CryptoGamer", gtc: 12200, profile_picture: "" },
    { id: 3, name: "ValorantKing", gtc: 9800, profile_picture: "" }
  ]);

  const formatRank = (index) => {
    const rank = index + 1;
    if (rank % 10 === 1 && rank % 100 !== 11) return `${rank}st`;
    if (rank % 10 === 2 && rank % 100 !== 12) return `${rank}nd`;
    if (rank % 10 === 3 && rank % 100 !== 13) return `${rank}rd`;
    return `${rank}th`;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("https://gamerthred.com/api/leaderboard.php");
        const data = await res.json();
        if (data.status === 200 && Array.isArray(data.users) && data.users.length > 0) {
          setPlayers(data.users);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen max-container pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        <div className="flex flex-col gap-4 text-center items-center">
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
            Global Rankings
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Leaderboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base font-normal max-w-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Top players ranked by GTC. Keep grinding to climb the ranks and claim exclusive real-world rewards.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card flex flex-col items-center text-center mb-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% -20%, rgba(255,255,255,0.1), transparent 70%)" }} />
          <h2 className="text-xl font-heading font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Zebion Sensei Keyboard & Mouse Combo
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Awarded to the top players at the end of the season.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Contest ends: August 10, 2025
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-0 overflow-hidden"
        >
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th className="py-5 px-6 font-semibold text-sm" style={{ color: "var(--text-muted)" }}>Rank</th>
                  <th className="py-5 px-6 font-semibold text-sm" style={{ color: "var(--text-muted)" }}>Player</th>
                  <th className="py-5 px-6 font-semibold text-sm text-right" style={{ color: "var(--text-muted)" }}>GTC</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr
                    key={player.id}
                    className="group transition-colors duration-200"
                    style={{ borderBottom: index !== players.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  >
                    <td className="py-5 px-6 font-medium" style={{ color: index < 3 ? "var(--text-primary)" : "var(--text-muted)" }}>
                      {formatRank(index)}
                    </td>
                    <td className="py-5 px-6 flex items-center gap-3 font-medium" style={{ color: "var(--text-primary)" }}>
                      {player.profile_picture ? (
                        <img
                          src={player.profile_picture}
                          alt={player.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50 border border-white/10">
                          {player.name.charAt(0)}
                        </div>
                      )}
                      {player.name}
                    </td>
                    <td className="py-5 px-6 font-medium text-right" style={{ color: "var(--text-primary)" }}>
                      {player.gtc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
