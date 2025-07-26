import React from "react";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();

  const data = [
    {
      no: 1,
      task_id: "t001",
      task_name: "Build a Mini JCB",
      task_description:
        "Assemble a virtual JCB model using the provided parts and instructions.",
      image_url: "https://via.placeholder.com/300x200?text=JCB+Game",
      total_users: 100,
      joined_users: 76,
      time: "2h",
      public_date: "2025-07-22",
      end_date: "2025-07-30",
    },
    {
      no: 2,
      task_id: "t002",
      task_name: "Plant a Tree in Simulation",
      task_description:
        "Use the farming sim to plant and grow a tree to maturity.",
      image_url: "https://via.placeholder.com/300x200?text=Plant+Tree",
      total_users: 50,
      joined_users: 32,
      time: "1h 30m",
      public_date: "2025-07-20",
      end_date: "2025-07-25",
    },
    {
      no: 3,
      task_id: "t003",
      task_name: "Solve the Maze",
      task_description:
        "Navigate through a dynamic virtual maze in limited time.",
      image_url: "https://via.placeholder.com/300x200?text=Maze+Challenge",
      total_users: 80,
      joined_users: 60,
      time: "1h",
      public_date: "2025-07-15",
      end_date: "2025-07-24",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white px-4 py-10 md:px-20 font-sans">
      <h1 className="text-3xl font-bold mb-10 text-center text-white drop-shadow-xl">
        🚀 Select Your Game
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((game) => (
          <div
            key={game.task_id}
            onClick={() => navigate(`/games/${game.task_id}`)}
            className="cursor-pointer p-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-purple-700/70 hover:border-purple-400 group"
          >
            <img
              src={game.image_url || "/default.jpg"}
              alt={game.task_name}
              className="w-full h-40 object-cover rounded-md mb-4 border border-white/20 group-hover:shadow-md group-hover:shadow-purple-400"
            />
            <h2 className="text-xl font-semibold text-center mb-2 group-hover:text-purple-300">
              {game.task_name}
            </h2>
            <p className="text-sm text-gray-300 text-center">
              {game.task_description}
            </p>
            <p className="text-xs text-gray-400 mt-2 text-center">
              ⏱ {game.time} • 👥 {game.joined_users}/{game.total_users}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
