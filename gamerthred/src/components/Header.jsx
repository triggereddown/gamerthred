import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Mail } from "lucide-react";

const Header = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const navigate = useNavigate();

  const gamePreviewData = [
    {
      task_id: "t001",
      task_name: "Build a Mini JCB",
      task_description:
        "Assemble a virtual JCB model using the provided parts and instructions.",
      image_url: "https://via.placeholder.com/300x200?text=JCB+Game",
      total_users: 100,
      joined_users: 76,
      time: "2h",
    },
    {
      task_id: "t002",
      task_name: "Plant a Tree in Simulation",
      task_description:
        "Use the farming sim to plant and grow a tree to maturity.",
      image_url: "https://via.placeholder.com/300x200?text=Plant+Tree",
      total_users: 50,
      joined_users: 32,
      time: "1h 30m",
    },
  ];

  useEffect(() => {
    const targetDate = new Date("2025-07-28T12:00:00+05:30");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");
      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
        2,
        "0"
      );

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex flex-col items-center justify-start px-4 sm:px-6 md:px-20 lg:px-32 xl:px-40 py-12 md:py-20 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-700 opacity-30 blur-3xl rounded-full z-0"></div>

      {/* Main Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-12 z-10">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            Gamer
            <span className="text-black bg-white py-1 px-2 rounded shadow ml-2">
              Thred
            </span>
          </h1>

          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            We're <br />
            <span className="text-purple-500 animate-pulse">
              Launching Soon
            </span>
          </h2>

          {/* Mobile Image */}
          <div className="block md:hidden">
            <img
              src={assets.consolee}
              alt="Console"
              className="w-60 sm:w-72 mx-auto animate-[float_3s_ease-in-out_infinite]"
            />
          </div>

          {/* Countdown Timer */}
          <div className="flex flex-row gap-x-4 justify-center md:justify-start text-white font-semibold text-lg sm:text-xl">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 px-4 py-2 rounded-lg shadow-md shadow-purple-900/30 w-20 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          <p className="text-white font-bold px-4 sm:px-0">
            We’re building something for the everyday gamers — fair, rewarding,
            and real.
          </p>

          <a
            href="https://forms.gle/Vvx7RgXswjjiWvcZ9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-purple-600 hover:bg-fuchsia-600 transition-all px-6 py-4 rounded-full text-white text-base sm:text-lg font-semibold shadow-lg"
          >
            🚀 Join the Waitlist
          </a>

          <a
            href="mailto:gamerthred1@gmail.com"
            className="mt-3 bg-purple-600 hover:bg-fuchsia-600 transition-all px-6 py-3 rounded-full text-white text-md font-semibold shadow-lg flex items-center justify-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Us</span>
          </a>
        </div>

        {/* Desktop Console Image */}
        <div className="hidden md:flex flex-1 justify-center">
          <img
            src={assets.consolee}
            alt="Console"
            className="w-[600px] animate-[float_3s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* Featured Game Cards Section */}
      <div className="w-full mt-20 z-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">
          Featured Missions 🎮
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {gamePreviewData.map((game) => (
            <div
              key={game.task_id}
              onClick={() => navigate(`/games/${game.task_id}`)}
              className="cursor-pointer p-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-purple-700/70 hover:border-purple-400 group"
            >
              <img
                src={game.image_url}
                alt={game.task_name}
                className="w-full h-40 object-cover rounded-md mb-4 border border-white/20 group-hover:shadow-md group-hover:shadow-purple-400"
              />
              <h2 className="text-xl font-semibold text-center mb-2 group-hover:text-purple-300">
                {game.task_name}
              </h2>
              <p className="text-sm text-gray-300 text-center">
                {game.task_description}
              </p>
              <p className="text-xs text-gray-400 mt-2 text-center">
                ⏱ {game.time} • 👥 {game.joined_users}/{game.total_users}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default Header;
