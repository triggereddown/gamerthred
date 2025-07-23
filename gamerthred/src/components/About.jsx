import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

// Draggable ball component
const DraggableBall = () => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-700 to-purple-500 fixed top-32 left-8 z-50 cursor-pointer shadow-2xl"
    />
  );
};

const About = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center px-6 py-16 md:px-20 lg:px-32 w-full bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white overflow-hidden"
      id="about"
    >
      <DraggableBall />

      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-center">
        About{" "}
        <motion.span
          className="text-purple-500 cursor-pointer"
          whileHover={{ scale: 1.1, color: "#ffffff" }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          GamerThred
        </motion.span>
      </h1>

      {/* Subheading */}
      <p className="text-center max-w-3xl text-lg sm:text-xl mt-4 mb-10 text-gray-300 leading-relaxed">
        Welcome to <strong>GamerThred</strong>, where gamers earn rewards for
        playing their favorite games! We believe every player should be
        rewarded. Our platform lets you complete fun, game-specific missions to
        earn cool stuff like T-shirts and gaming gear.
      </p>

      {/* Middle section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 w-full">
        {/* Left side image */}
        <img
          src={assets.consolee}
          alt="Gaming Console"
          className="w-full max-w-md rounded-xl shadow-lg"
        />

        {/* Right side mission */}
        <div className="flex flex-col justify-center gap-6 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold">What We Do</h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            With one affordable monthly subscription, you can unlock missions in
            our platform. Hit goals like reaching Diamond rank or completing
            quests, and claim awesome rewards. The more you play, the more you
            earn!
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
            Why GamerThred?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#0f172a] p-5 rounded-xl shadow-md border border-purple-700 hover:scale-105 transition">
              <h3 className="font-bold text-purple-400 mb-2">For All Gamers</h3>
              <p>Casual or pro, everyone gets rewarded.</p>
            </div>
            <div className="bg-[#0f172a] p-5 rounded-xl shadow-md border border-purple-700 hover:scale-105 transition">
              <h3 className="font-bold text-purple-400 mb-2">Easy & Fun</h3>
              <p>Just play, complete missions, and grab your rewards.</p>
            </div>
            <div className="bg-[#0f172a] p-5 rounded-xl shadow-md border border-purple-700 hover:scale-105 transition">
              <h3 className="font-bold text-purple-400 mb-2">Real Prizes</h3>
              <p>Get gaming gear, apparel, and more.</p>
            </div>
            <div className="bg-[#0f172a] p-5 rounded-xl shadow-md border border-purple-700 hover:scale-105 transition">
              <h3 className="font-bold text-purple-400 mb-2">
                Community Vibes
              </h3>
              <p>Join gamers who share your passion.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold mt-6">Our Goal</h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            We want every gamer to feel valued. GamerThred turns your in-game
            wins into real-world rewards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
