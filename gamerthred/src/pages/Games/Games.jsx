import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gamerthred.com/api/games.php")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200 && result.data) {
          setGroupedData(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading games...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white px-4 py-10 md:px-20 font-sans">
      <h1 className="text-3xl font-bold mb-10 text-center text-white drop-shadow-xl">
        🚀 Select Your Game
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {Object.entries(groupedData).map(([groupId, tasks]) => {
          const firstTask = tasks[0]; // Use first task for preview

          return (
            <div
              key={groupId}
              onClick={() => navigate(`/games/${groupId}`)} // ✅ use t001, t002, etc.
              className="cursor-pointer p-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-purple-700/70 hover:border-purple-400 group"
            >
              <img
                src={firstTask.demo_image_url || "/default.jpg"}
                alt={firstTask.task_name}
                className="w-full h-40 object-cover rounded-md mb-4 border border-white/20 group-hover:shadow-md group-hover:shadow-purple-400"
              />
              <h2 className="text-xl font-semibold text-center mb-2 group-hover:text-purple-300">
                {firstTask.task_name}
              </h2>
              <p className="text-sm text-gray-300 text-center">
                {firstTask.task_description}
              </p>
              <p className="text-xs text-gray-400 mt-2 text-center">
                ⏱ {firstTask.time} • 👥 {firstTask.joined_users}/{firstTask.total_users}
              </p>
              <p className="text-xs text-yellow-400 text-center">
                ⭐ {firstTask.points} points
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Games;
