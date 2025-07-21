import React from "react";
import { useParams } from "react-router-dom";

const games = [
  { id: 1, name: "Candy Crush" },
  { id: 2, name: "Shadow Fight" },
];

const GameDetail = () => {
  const { gameId } = useParams();
  const game = games.find((g) => g.id.toString() === gameId);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white p-6 md:px-20 font-sans">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Missions for {game ? game.name : `Game ${gameId}`}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-md"
      >
        {[1, 2, 3].map((mission) => (
          <div key={mission} className="mb-6">
            <label className="block mb-2 text-lg font-semibold">
              Mission {mission} Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">
            Time Taken to Complete (in minutes)
          </label>
          <input
            type="number"
            min="0"
            placeholder="Enter time"
            className="w-full p-2 rounded bg-white text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded font-bold"
        >
          Submit Missions
        </button>
      </form>
    </div>
  );
};

export default GameDetail;
