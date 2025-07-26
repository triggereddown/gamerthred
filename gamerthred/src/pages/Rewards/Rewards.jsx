import React, { useState, useEffect } from "react";
// import axios from "axios";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    // Mock data for rewards
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

    // Simulate API fetching
    setTimeout(() => {
      setRewards(demoRewards);
      setUserXP(demoUserXP);
    }, 300);

    //   const fetchData = async () => {
    //     try {
    //       const rewardRes = await axios.get("/api/rewards");
    //       setRewards(rewardRes.data);

    //       const xpRes = await axios.get("/api/user-xp");
    //       setUserXP(xpRes.data.xp);
    //     } catch (err) {
    //       console.error("Error fetching store data:", err);
    //     }
    //   };

    //   fetchData();
  }, []);

  const claimReward = async (rewardId) => {
    try {
      alert(`Claimed reward #${rewardId}!`);
      //     const res = await axios.post("/api/claim-reward", { rewardId });
      //     alert(res.data.message);
      //     setUserXP((prevXP) => prevXP - res.data.cost);
    } catch (err) {
      //     console.error("Error claiming reward:", err);
      alert("Failed to claim reward.", err);
    }
  };

  return (
    <div className="bg-[#050D2B] min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Reward Store</h1>
        <p className="text-center text-lg mb-8">
          Your XP: <span className="font-semibold">{userXP}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-[#9139e0] p-4 rounded-xl shadow-md text-center"
            >
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold mb-1">{reward.name}</h2>
              <p className="text-black mb-3">
                XP Required: {reward.requiredXP}
              </p>
              <button
                onClick={() => claimReward(reward.id)}
                disabled={userXP < reward.requiredXP}
                className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                  userXP >= reward.requiredXP
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
