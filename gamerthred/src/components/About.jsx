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
      className="relative flex flex-col items-center justify-center p-14 md:px-20 lg:px-32 w-full overflow-hidden bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B]"
      id="about"
    >
      {/* Draggable ball */}
      <DraggableBall />

      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl font-bold mb-2 text-white  duration-300">
        About{" "}
        <motion.span
          className="text-purple-700 font-semibold cursor-pointer "
          whileHover={{ scale: 1.1, color: "#ffffff" }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          GamerThred
        </motion.span>
      </h1>

      {/* Subheading */}
      <p className="w-max text-center mb-8 text-white transition duration-300 hover:text-purple-300 hover:scale-105"></p>

      {/* Content section */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
        {/* Left: Image */}
        <img
          src={assets.consolee}
          alt="Gaming Console"
          className="w-full sm:w-1/2 max-w-lg rounded-lg"
        />

        {/* Right: Text */}
        <div className="flex flex-col items-center md:items-start mt-10 pt-7 text-white">
          <p className="text-white text-xl leading-8 mb-4 transition duration-300 hover:text-purple-300 hover:scale-[1.01]">
            Welcome to GameThred – where your passion for gaming meets tangible
            rewards. We are more than just a platform; we are a community built
            by gamers, for gamers.
            <br />
            <br />
            Our vision is to be India's leading and most trusted gaming rewards
            platform, redefining the gaming experience by making it inherently
            more rewarding and connected. Our mission is clear: to empower
            gamers with a fair and exciting way to earn rewards, build a
            supportive community, continuously drive value through expanding
            offerings and brand partnerships, and constantly innovate with new
            games and features. We are a passionate team of gamers,
            technologists, and marketers dedicated to this mission. We are
            committed to transparency, fairness, and building a platform that
            truly understands and serves you, our community. Your feedback
            fuels our progress!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
