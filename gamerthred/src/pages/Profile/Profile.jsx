import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { assets } from "../../assets/assets";

const Profile = () => {
  const [username, setUsername] = useState("GAMERGUY");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(username);

  const handleEditToggle = () => {
    if (editing) setUsername(tempName);
    setEditing(!editing);
  };

  return (
    <div className="bg-[#0B132F] text-white font-sans py-8 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center border-b border-white/10 pb-4">
          <h1 className="text-2xl font-bold mb-2">GAMERTHRED</h1>
        </div>

        {/* Profile Top Card */}
        <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-6 flex flex-col items-center">
          <img
            src={assets.logo}
            alt="avatar"
            className="h-20 w-20 rounded-full border-2 border-white mb-4"
          />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {editing ? (
                <input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-transparent border-b border-white text-white text-xl text-center focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-semibold">{username}</h2>
              )}
              <button onClick={handleEditToggle}>
                <Pencil size={18} />
              </button>
            </div>
            <p className="text-sm opacity-75">Level 12</p>
            <div className="h-2 w-64 bg-white/20 rounded-full mt-2">
              <div className="h-full bg-blue-500 rounded-full w-[78%]"></div>
            </div>
            <p className="text-xs mt-1">9,455 XP / 12,000 XP</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-6 space-y-4">
          <div className="flex justify-around">
            <img src={assets.logo} alt="medal" className="h-8" />
            <img src={assets.logo} alt="controller" className="h-8" />
            <img src={assets.logo} alt="flame" className="h-8" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white rounded-sm"></div>
              Complete Objectives
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white rounded-sm"></div>
              Earn Rewards
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white rounded-sm"></div>
              Start New Missions
            </div>
          </div>
        </div>

        {/* Games Section */}
        <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">GAMES</h3>
          <div className="grid grid-cols-2 gap-4">
            <img src={assets.logo} alt="Game 1" className="rounded-md" />
            <img src={assets.logo} alt="Game 2" className="rounded-md" />
            <img src={assets.logo} alt="Game 3" className="rounded-md" />
            <img src={assets.logo} alt="Game 4" className="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
