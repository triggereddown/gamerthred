import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  // Mocked initial value; replace with real fetch logic in future
  const navigate = useNavigate();
  const [username, setUsername] = useState("username");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(username);
  
  useEffect(() => {
    // In future: Fetch username and image from backend here
    let tokenFromLocalStorage = localStorage.getItem("token");
  if (!tokenFromLocalStorage) {
        navigate("/login");
      } else {
        const decodedToken = jwtDecode(tokenFromLocalStorage);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          localStorage.clear(); // Token has expired
          navigate("/login");
        }else{
          console.log(decodedToken.name);
          setUsername(decodedToken.name);
        }
      }
  }, []);

  const handleEditToggle = () => {
    if (editing) setUsername(tempName); // Save edited name
    setEditing(!editing);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white p-6 font-sans">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold mb-6">Profile</h2>

        {/* User Image */}
        <div className="flex justify-center mb-4">
          <img
            src={assets.logo} // Replace with dynamic URL later
            alt="User Avatar"
            className="h-24 w-24 rounded-full border-2 border-white object-cover"
          />
        </div>

        {/* Name with Edit Option */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {editing ? (
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="bg-transparent border-b border-white text-white text-lg text-center focus:outline-none"
            />
          ) : (
            <p className="text-xl">{username}</p>
          )}
          <button onClick={handleEditToggle} className="text-white">
            <Pencil size={20} />
          </button>
        </div>

        <p className="text-sm opacity-70">Your public profile info.</p>
      </div>
    </div>
  );
};

export default Profile;
