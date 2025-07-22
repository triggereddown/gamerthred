import React from "react";
import { assets } from "../assets/assets";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50">
      <div className="relative h-32 w-32 flex items-center justify-center">
        <div className="absolute top-0 left-0 h-full w-full border-t-4 border-blue-500 border-opacity-50 rounded-full animate-spin"></div>

        <img
          src={assets.logo}
          alt="Logo"
          className="h-20 w-20 object-contain z-10"
        />
      </div>
    </div>
  );
};

export default Loading;
