import React, { useState, useEffect } from "react";
// import axios from "axios";

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
    const demoPlayers = [
      { id: 1, name: "Rohan", xp: 1200, profile_picture: "/rohan.jpg" },
      { id: 2, name: "Priya", xp: 1050, profile_picture: "/priya.jpg" },
      { id: 3, name: "Amit", xp: 980, profile_picture: "/amit.jpg" },
      { id: 4, name: "Sneha", xp: 920, profile_picture: "/sneha.jpg" },
      { id: 5, name: "Kabir", xp: 880, profile_picture: "/kabir.jpg" },
    ];
    setPlayers(demoPlayers);

    /*
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/api/leaderboard");
        setPlayers(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };
    fetchLeaderboard();
    */
  }, []);

  return (
    <div className="min-h-screen bg-[#050d2b] text-white py-10 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">🏆 Leaderboard</h1>
        <p className="mb-8 text-lg text-gray-700">Top players ranked by XP</p>

        <div className="rounded-xl shadow-md overflow-hidden border-2 border-[#a855f7]">
          <table className="w-full text-left">
            <thead className="bg-[#a855f7] text-white">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">XP</th>
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
                  <td className="py-3 px-4">{player.name}</td>
                  <td className="py-3 px-4">{player.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
