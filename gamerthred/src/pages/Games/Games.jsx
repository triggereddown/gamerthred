import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const Games = () => {
  const navigate = useNavigate();

  const games = [
    { id: 1, name: "Candy Crush", thumbnail: assets.candy || "/default1.jpg" },
    {
      id: 2,
      name: "Shadow Fight",
      thumbnail: assets.shadow || "/default2.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white px-4 py-10 md:px-20 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Your Game</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white bg-opacity-10 hover:bg-opacity-20 transition rounded-xl shadow-lg p-6 cursor-pointer backdrop-blur-md"
            onClick={() => navigate(`/games/${game.id}`)}
          >
            <img
              src={game.thumbnail}
              alt={game.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{game.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
