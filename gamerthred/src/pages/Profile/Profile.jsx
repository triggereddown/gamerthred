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
    <div className="min-h-screen bg-[#0B132F] text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h1 className="text-2xl font-bold">GAMERTHRED</h1>
        <div className="flex gap-8 text-sm font-medium">
          <span className="cursor-pointer">HOME</span>
          <span className="cursor-pointer">DISCOVER</span>
          <span className="cursor-pointer">COMMUNITY</span>
        </div>
      </div>

      {/* Profile & Stats */}
      <div className="p-6 flex flex-col gap-6">
        {/* Profile Top Card */}
        <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-4 flex flex-col items-center md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={assets.logo}
              alt="avatar"
              className="h-20 w-20 rounded-full border-2 border-white"
            />
            <div>
              <div className="flex items-center gap-2">
                {editing ? (
                  <input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-transparent border-b border-white text-white text-xl focus:outline-none"
                  />
                ) : (
                  <h2 className="text-xl font-semibold">{username}</h2>
                )}
                <button onClick={handleEditToggle}>
                  <Pencil size={18} />
                </button>
              </div>
              <p className="text-sm opacity-75">Level 12</p>
              <div className="h-2 w-52 bg-white/20 rounded-full mt-2">
                <div className="h-full bg-blue-500 rounded-full w-[78%]"></div>
              </div>
              <p className="text-xs mt-1">9,455 XP / 12,000 XP</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-white/10 text-sm font-medium px-2">
          <span className="pb-2 border-b-2 border-white">OVERVIEW</span>
          <span className="opacity-60 cursor-pointer">BADGES</span>
          <span className="opacity-60 cursor-pointer">MISSIONS</span>
          <span className="opacity-60 cursor-pointer">GAMES</span>
        </div>

        {/* Stats & Missions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Stats & Icons */}
          <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-4 space-y-6">
            <div className="flex justify-around text-center">
              <div>
                <h3 className="text-xl font-semibold">353</h3>
                <p className="text-sm opacity-60">Followers</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">276</h3>
                <p className="text-sm opacity-60">Following</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">82</h3>
                <p className="text-sm opacity-60">Posts</p>
              </div>
            </div>

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

          {/* Right: Games */}
          <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">GAMES</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img src={assets.logo} alt="Game 1" className="rounded-md" />
              <img src={assets.logo} alt="Game 2" className="rounded-md" />
              <img src={assets.logo} alt="Game 3" className="rounded-md" />
              <img src={assets.logo} alt="Game 4" className="rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B132F] border-t border-white/10 py-3 flex justify-around text-xs">
        <span>HOME</span>
        <span>DISCOVER</span>
        <span>COMMUNITY</span>
      </div>
    </div>
  );
};

export default Profile;
