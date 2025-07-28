// import React, { useState, useEffect } from "react";

// export default function Rewards() {
//   const [rewards, setRewards] = useState([]);
//   const [userGTC, setUserGTC] = useState(0);
//   const [userBadge, setUserBadge] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchRewards = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("https://gamerthred.com/api/get_rewards.php", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();

//         if (data.status === 200) {
//           setRewards(data.rewards);
//           setUserGTC(data.gtc);
//           setUserBadge(data.badge || 0); // Assuming badge info comes from API
//         } else {
//           console.error("Failed to load rewards:", data.msg);
//         }
//       } catch (error) {
//         console.error("Error fetching rewards:", error);
//       }
//     };

//     fetchRewards();
//   }, []);

//   const claimReward = async (rewardId) => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("https://gamerthred.com/api/claim_reward.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           reward_id: rewardId,
//         }),
//       });

//       const data = await response.json();

//       if (data.status === 200) {
//         // Update user's GTC and badge after successful claim
//         setUserGTC(data.new_gtc);
//         setUserBadge(data.new_badge);
        
//         // Update the rewards list to reflect the claim
//         setRewards(prevRewards =>
//           prevRewards.map(reward =>
//             reward.id === rewardId
//               ? { ...reward, claimed: true }
//               : reward
//           )
//         );

//         alert(`Successfully claimed ${data.reward_name}!`);
//       } else {
//         alert(`Failed to claim reward: ${data.msg}`);
//       }
//     } catch (error) {
//       console.error("Error claiming reward:", error);
//       alert("An error occurred while claiming the reward. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to check if reward is claimed based on badge level
//   const isRewardClaimed = (rewardId) => {
//     return rewardId <= userBadge;
//   };

//   // Function to check if reward is available to claim
//   const canClaimReward = (reward) => {
//     return userGTC >= reward.requiredGTC && !isRewardClaimed(reward.id);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b0120] to-[#160428] p-8 text-white">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-md">
//           🎁 Reward Store
//         </h1>

//         <div className="text-center mb-10">
//           <p className="text-lg text-purple-300">
//             Your GTC :{" "}
//             <span className="text-yellow-400 font-bold text-xl">{userGTC}</span>
//           </p>
//           <p className="text-lg text-purple-300 mt-2">
//             Badge Level :{" "}
//             <span className="text-green-400 font-bold text-xl">{userBadge}</span>
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {rewards.map((reward) => {
//             const claimed = isRewardClaimed(reward.id);
//             const canClaim = canClaimReward(reward);

//             return (
//               <div
//                 key={reward.id}
//                 className={`relative bg-[#1c0b33]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_#641bff20] transition-transform duration-300 ${
//                   claimed 
//                     ? "opacity-75 border-green-500/30" 
//                     : "hover:shadow-[0_0_40px_#e0c26833] hover:scale-[1.03]"
//                 }`}
//               >
//                 <div className="absolute inset-0 rounded-2xl pointer-events-none border border-purple-600/20"></div>

//                 {claimed && (
//                   <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                     ✓ CLAIMED
//                   </div>
//                 )}

//                 <img
//                   src={reward.image}
//                   alt={reward.name}
//                   className={`w-full h-32 object-cover rounded-xl mb-4 ${
//                     claimed ? "grayscale" : ""
//                   }`}
//                 />
//                 <h2 className="text-xl font-bold mb-2">{reward.name}</h2>
//                 <p className="text-yellow-300 font-medium mb-4">
//                   GTC Required: {reward.requiredGTC}
//                 </p>

//                 <button
//                   onClick={() => claimReward(reward.id)}
//                   disabled={!canClaim || isLoading || claimed}
//                   className={`w-full py-2 rounded-lg font-bold tracking-wide transition-all duration-300 ${
//                     claimed
//                       ? "bg-green-600 text-white cursor-default"
//                       : canClaim
//                       ? "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black shadow-[0_0_10px_#e0c26866] hover:brightness-110"
//                       : "bg-gray-500 text-gray-300 cursor-not-allowed"
//                   }`}
//                 >
//                   {isLoading ? (
//                     "Claiming..."
//                   ) : claimed ? (
//                     "Claimed"
//                   ) : canClaim ? (
//                     "Claim"
//                   ) : userGTC < reward.requiredGTC ? (
//                     "Not Enough GTC"
//                   ) : (
//                     "Already Claimed"
//                   )}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [userGTC, setUserGTC] = useState(0);
  const [userBadge, setUserBadge] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://gamerthred.com/api/get_rewards.php", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.status === 200) {
          setRewards(data.rewards);
          setUserGTC(data.gtc);
          setUserBadge(data.badge || 0); // Assuming badge info comes from API
        } else {
          console.error("Failed to load rewards:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchRewards();
  }, []);

  const claimReward = async (rewardId) => {
    // Temporarily disabled - show coming soon message
    alert("Reward claiming feature is coming soon! Stay tuned for updates.");
  };

  // Function to check if reward is claimed based on badge level
  const isRewardClaimed = (rewardId) => {
    return rewardId <= userBadge;
  };

  // Function to check if reward is available to claim
  const canClaimReward = (reward) => {
    return userGTC >= reward.requiredGTC && !isRewardClaimed(reward.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0120] to-[#160428] p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-md">
          🎁 Reward Store
        </h1>

        <div className="text-center mb-10">
          <p className="text-lg text-purple-300">
            Your GTC :{" "}
            <span className="text-yellow-400 font-bold text-xl">{userGTC}</span>
          </p>
          <p className="text-lg text-purple-300 mt-2">
            Badge Level :{" "}
            <span className="text-green-400 font-bold text-xl">{userBadge}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {rewards.map((reward) => {
            const claimed = isRewardClaimed(reward.id);
            const canClaim = canClaimReward(reward);

            return (
              <div
                key={reward.id}
                className="relative bg-[#1c0b33]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_30px_#641bff20] hover:shadow-[0_0_40px_#e0c26833] hover:scale-[1.03] transition-transform duration-300"
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none border border-purple-600/20"></div>

                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-32 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{reward.name}</h2>
                <p className="text-yellow-300 font-medium mb-4">
                  GTC Required: {reward.requiredGTC}
                </p>

                <button
                  onClick={() => claimReward(reward.id)}
                  className="w-full py-2 rounded-lg font-bold tracking-wide transition-all duration-300 bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-[0_0_10px_#9333ea66] hover:brightness-110 cursor-pointer"
                >
                  Coming Soon
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}