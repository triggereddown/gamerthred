import React, { useState, useEffect } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

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
        const res = await fetch("https://gamerthred.com/api/leaderboard.php"); // 🔁 Update your actual API
        const data = await res.json();
        if (data.status === 200 && Array.isArray(data.users)) {
          setPlayers(data.users); // 👈 expecting: { users: [...] }
        } else {
          console.error("Invalid response:", data);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#050d2b] text-white py-10 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">🏆 Leaderboard</h1>
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 rounded-xl border-2 border-yellow-400 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-3xl">🎁</span>
            <h2 className="text-2xl font-bold text-yellow-300">SPECIAL PRIZE!</h2>
            <span className="text-3xl">🎁</span>
          </div>
          <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-4">
            <p className="text-xl font-semibold text-white mb-2">
              ⌨️ Zebion Sensei Keyboard & Mouse Combo ⌨️
            </p>
            <p className="text-lg text-yellow-200">
              Awarded to the <span className="font-bold text-yellow-300">#2 Top Player</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-red-300">
            <span className="text-xl">⏰</span>
            <p className="text-lg font-bold">
              Contest ends: <span className="text-red-200">August 10, 2025</span>
            </p>
          </div>
          <div className="mt-3 text-sm text-gray-300">
            🔥 Keep grinding to claim your prize! 🔥
          </div>
        </div>
        <p className="mb-8 text-lg text-gray-400">Top players ranked by GTC</p>

        <div className="rounded-xl shadow-md overflow-hidden border-2 border-[#a855f7]">
          <table className="w-full text-left">
            <thead className="bg-[#a855f7] text-white">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">GTC</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr
                  key={player.id}
                  className={`border-b ${
                    index === 0
                      ? "bg-yellow-100 font-bold text-black"
                      : "bg-[#050d2b]"
                  }`}
                >
                  <td className="py-3 px-4">{formatRank(index)}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    {player.profile_picture && (
                      <img
                        src={player.profile_picture}
                        alt={player.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    {player.name}
                  </td>
                  <td className="py-3 px-4">{player.gtc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
