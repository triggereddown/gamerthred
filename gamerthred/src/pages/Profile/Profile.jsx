import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { assets } from "../../assets/assets";

const Profile = () => {
  const [username, setUsername] = useState("Rexui");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(username);

  const handleEditToggle = () => {
    if (editing) setUsername(tempName);
    setEditing(!editing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex items-center justify-center text-white font-sans p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Left Card */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 w-full md:w-1/3 flex flex-col items-center text-center shadow-lg">
          <img
            src={assets.logo}
            alt="User Avatar"
            className="h-24 w-24 rounded-full border-2 border-white mb-4"
          />
          <div className="flex items-center justify-center gap-2">
            {editing ? (
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-transparent border-b border-white text-white text-xl text-center focus:outline-none"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{username}</h2>
            )}
            <button onClick={handleEditToggle}>
              <Pencil size={18} />
            </button>
          </div>
          <p className="mt-1 opacity-75">Rank-1</p>
          <img src={assets.badge} alt="Badge" className="h-10 mt-4" />{" "}
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 w-full md:w-2/3 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Current Missions</h3>
          <div className="space-y-3">
            <div className="flex justify-between bg-white bg-opacity-5 p-3 rounded-lg">
              <span>Candy Crush</span>
              <span>3/5</span>
              <span className="text-blue-400 font-bold">+100 XP</span>
            </div>
            <div className="flex justify-between bg-white bg-opacity-5 p-3 rounded-lg">
              <span>Candy Crush</span>
              <span>1/3</span>
              <span className="text-blue-400 font-bold">+150 XP</span>
            </div>
            <div className="flex justify-between bg-white bg-opacity-5 p-3 rounded-lg opacity-50 line-through">
              <span>Candy Crush</span>
              <span>5/5</span>
              <span className="font-bold">+250 XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
