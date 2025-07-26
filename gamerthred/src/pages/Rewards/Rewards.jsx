import React, { useState, useEffect } from "react";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    const demoRewards = [
      {
        id: 1,
        name: "Exclusive Skin",
        image: "/images/skin1.jpg",
        requiredXP: 500,
      },
      {
        id: 2,
        name: "100 Coins",
        image: "/images/coins.jpg",
        requiredXP: 200,
      },
      {
        id: 3,
        name: "Premium Badge",
        image: "/images/badge.jpg",
        requiredXP: 300,
      },
      {
        id: 4,
        name: "Game Pass",
        image: "/images/pass.jpg",
        requiredXP: 1000,
      },
    ];

    const demoUserXP = 350;

    setTimeout(() => {
      setRewards(demoRewards);
      setUserXP(demoUserXP);
    }, 300);
  }, []);

  const claimReward = (rewardId) => {
    alert(`Claimed reward #${rewardId}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0120] to-[#160428] p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-md">
          🎁 Reward Store
        </h1>

        <p className="text-center text-lg mb-10 text-purple-300">
          Your XP:{" "}
          <span className="text-yellow-400 font-bold text-xl">{userXP}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="relative bg-[#1c0b33]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_#641bff20] hover:shadow-[0_0_40px_#e0c26833] transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Optional glow border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border border-purple-600/20"></div>

              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{reward.name}</h2>
              <p className="text-yellow-300 font-medium mb-4">
                XP Required: {reward.requiredXP}
              </p>

              <button
                onClick={() => claimReward(reward.id)}
                disabled={userXP < reward.requiredXP}
                className={`w-full py-2 rounded-lg font-bold tracking-wide transition-all duration-300 ${
                  userXP >= reward.requiredXP
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow-[0_0_10px_#e0c26866] hover:brightness-110"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                {userXP >= reward.requiredXP ? "Claim" : "Not Enough XP"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
