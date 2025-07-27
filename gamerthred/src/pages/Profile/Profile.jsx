import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Rexui");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(username);
  /*
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.clear();
        navigate("/login");
      } else {
        setUsername(decoded.name || "Rexui");
        setXp(decoded.xp || 0);
      }
    }
  }, []);
  */

  let xp = 650; // remove this when fething xp dynamically

  const getLevelInfo = (xp) => {
    if (xp >= 1500) return { level: 5, badge: "Clutcher Badge" };
    if (xp >= 900) return { level: 4, badge: "Synced Badge" };
    if (xp >= 500) return { level: 3, badge: "Loaded Badge" };
    if (xp >= 200) return { level: 2, badge: "Grinder Badge" };
    return { level: 1, badge: "Spawned Badge" };
  };

  const { level, badge } = getLevelInfo(xp);

  const levelThresholds = [0, 200, 500, 900, 1500];
  const nextLevelXp = level < 5 ? levelThresholds[level] : 1500;
  const prevLevelXp = levelThresholds[level - 1];
  const expPercent =
    level === 5
      ? 100
      : Math.floor(((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100);

  const handleEditToggle = () => {
    if (editing) setUsername(tempName);
    setEditing(!editing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex items-center justify-center font-sans">
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-purple-700/20 via-purple-400/10 to-yellow-100/10 border border-purple-300/30 rounded-3xl shadow-[0_0_30px_#FFD70055] p-8 w-[500px] text-white overflow-hidden">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative h-28 w-28 rounded-full border-4 border-purple-400 shadow-lg overflow-hidden">
            <img
              src={assets.logo}
              alt="User"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Username */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2">
            {editing ? (
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-transparent border-b border-white text-white text-lg text-center focus:outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold tracking-wide">{username}</h2>
            )}
            <button onClick={handleEditToggle}>
              <Pencil size={18} />
            </button>
          </div>
        </div>

        <hr className="my-4 border-white/20" />

        {/* Badge Display */}
        <div className="mb-6 text-center">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-2">
            Level {level} - {badge}
          </h3>
          <div className="flex justify-center">
            <img
              src={assets[`level${level}`]} // Assumes assets.level1 to level5
              alt={`Level ${level} badge`}
              className="h-24"
            />
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-6">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-2">
            Experience ({xp} XP)
          </h3>
          <div className="w-full h-4 bg-white/10 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${expPercent}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-center text-yellow-300">
            {level === 5
              ? "Max Level Achieved"
              : `${expPercent}% to Level ${level + 1}`}
          </p>
        </div>

        {/* Games Playing */}
        <div className="mt-6">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-2">
            Now Playing
          </h3>
          <div className="flex justify-center gap-4">
            <img
              src="/games/valorant.jpg"
              alt="Valorant"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <img
              src="/games/minecraft.jpg"
              alt="Minecraft"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <img
              src="/games/fifa.jpg"
              alt="FIFA"
              className="h-12 w-12 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
