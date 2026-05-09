import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Games = () => {
  const navigate = useNavigate();
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gamerthred.com/api/games.php")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200 && result.data && Object.keys(result.data).length > 0) {
          setGroupedData(result.data);
        } else {
          // Fallback mock data
          setGroupedData({
            "valorant": [{
              task_name: "Valorant Mastery",
              task_description: "Compete in daily Valorant challenges and claim your rewards.",
              time: "2 Days",
              joined_users: 1420,
              total_users: 5000,
              points: 100,
              demo_image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
            }],
            "apex": [{
              task_name: "Apex Legends",
              task_description: "Drop in, secure the champion squad, and earn exclusive gear.",
              time: "5 Days",
              joined_users: 850,
              total_users: 2000,
              points: 250,
              demo_image_url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070"
            }]
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
        // Fallback mock data
        setGroupedData({
          "valorant": [{
            task_name: "Valorant Mastery",
            task_description: "Compete in daily Valorant challenges and claim your rewards.",
            time: "2 Days",
            joined_users: 1420,
            total_users: 5000,
            points: 100,
            demo_image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
          }],
          "apex": [{
            task_name: "Apex Legends",
            task_description: "Drop in, secure the champion squad, and earn exclusive gear.",
            time: "5 Days",
            joined_users: 850,
            total_users: 2000,
            points: 250,
            demo_image_url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070"
          }]
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-container pt-32 pb-24 px-6 md:px-10">
      <div className="flex flex-col gap-6 mb-16 max-w-2xl mx-auto text-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide w-max"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)" }}
        >
          Select Your Path
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-heading font-semibold tracking-tight"
        >
          All Games
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-muted font-normal"
          style={{ color: "var(--text-muted)" }}
        >
          Choose a game title to explore exclusive missions and start your journey towards earning rewards.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedData).map(([groupId, tasks], i) => {
          const firstTask = tasks[0];

          return (
            <motion.div
              key={groupId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              onClick={() => navigate(`/games/${groupId}`)}
              className="glass-card flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 border border-white/20 z-20">
                ⭐ {firstTask.points} Points
              </div>

              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2">
                <img
                  src={firstTask.demo_image_url || "/default.jpg"}
                  alt={firstTask.task_name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-heading font-semibold tracking-tight">
                  {firstTask.task_name}
                </h3>
                <p className="text-sm font-normal text-muted line-clamp-2" style={{ color: "var(--text-muted)" }}>
                  {firstTask.task_description}
                </p>
              </div>

              <div className="flex justify-between text-xs font-medium border-t border-white/10 pt-4 mt-auto" style={{ color: "var(--text-muted)" }}>
                <span>⏱ {firstTask.time}</span>
                <span>👥 {firstTask.joined_users}/{firstTask.total_users}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Games;
