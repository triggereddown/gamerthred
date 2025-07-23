import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function GameSelectorBox({ onClose }) {
  const [selectedGames, setSelectedGames] = useState([]);
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("/api/games");
        setGamesList(response.data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    fetchGames();
  }, []);

  const toggleGame = (gameId) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId],
    );
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "api-route-for-saving-newly-selected-games",
        {
          games: selectedGames,
        },
      );
      console.log("Saved successfully:", response.data);
      onClose();
    } catch (err) {
      console.error("Error saving games:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Select Games for Dashboard
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto">
          {gamesList.map((game) => (
            <label
              key={game.id}
              className={`relative border rounded-xl p-2 shadow-md cursor-pointer transition-transform transform hover:scale-105 ${selectedGames.includes(game.id) ? "ring-2 ring-blue-500" : ""}`}
            >
              <input
                type="checkbox"
                className="absolute top-2 left-2 z-10 w-5 h-5"
                checked={selectedGames.includes(game.id)}
                onChange={() => toggleGame(game.id)}
              />
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-2 text-center font-medium text-gray-800">
                {game.name}
              </div>
            </label>
          ))}
        </div>

        <button
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700"
          onClick={handleSave}
        >
          Save Selection
        </button>
      </div>
    </div>
  );
}
