import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [gamePreviewData, setGamePreviewData] = useState([]);
  const navigate = useNavigate();

  // Fetch game missions
  useEffect(() => {
    fetch("https://gamerthred.com/api/all_tasks_grouped.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const groupedTasks = data.data;

          const allTasksWithGroupKey = [];

          for (const [groupKey, tasks] of Object.entries(groupedTasks)) {
            tasks.forEach((task) => {
              allTasksWithGroupKey.push({
                ...task,
                group_id: groupKey,
              });
            });
          }

          const randomTasks = allTasksWithGroupKey
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

          // Add initial countdown to each game
          const initialized = randomTasks.map((game) => ({
            ...game,
            countdown: {
              days: "00",
              hours: "00",
              minutes: "00",
              seconds: "00",
            },
          }));

          setGamePreviewData(initialized);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      });
  }, []);

  // Countdown timer for each mission
  useEffect(() => {
    const interval = setInterval(() => {
      setGamePreviewData((prev) =>
        prev.map((game) => {
          // If `end_time` exists in game, use it. Else, simulate deadline +1 day
          const deadline = game.end_time
            ? new Date(game.end_time)
            : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

          const now = new Date();
          const diff = deadline - now;

          if (diff <= 0) {
            return {
              ...game,
              countdown: {
                days: "00",
                hours: "00",
                minutes: "00",
                seconds: "00",
              },
            };
          }

          const days = String(
            Math.floor(diff / (1000 * 60 * 60 * 24))
          ).padStart(2, "0");
          const hours = String(
            Math.floor((diff / (1000 * 60 * 60)) % 24)
          ).padStart(2, "0");
          const minutes = String(
            Math.floor((diff / (1000 * 60)) % 60)
          ).padStart(2, "0");
          const seconds = String(Math.floor((diff / 1000) % 60)).padStart(
            2,
            "0"
          );

          return {
            ...game,
            countdown: { days, hours, minutes, seconds },
          };
        })
      );
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
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            EARN WHAT <br />
            <span className="text-purple-500 animate-pulse">YOU DESERVE</span>
          </h2>

          {/* Mobile Console Card */}
          <div className="block md:hidden w-full max-w-xs mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-purple-900/10 border border-purple-500/20 rounded-2xl shadow-xl backdrop-blur-md p-6 flex flex-col items-center transition-all duration-300 hover:shadow-purple-600/40 hover:border-purple-500">
              <img
                src={assets.zebion}
                alt="Console"
                className="w-52 sm:w-60 mx-auto animate-[float_3s_ease-in-out_infinite] drop-shadow-xl"
              />

              <Link to="/missiondetails">
                <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-all">
                  Zebion Exclusive Here
                </button>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              PLAY | PROGRESS | WIN
            </h2>
          </div>

          <div className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md rounded-xl border border-purple-500/40 p-6 mt-8 max-w-xl mr-auto ml-0 text-white shadow-[0_0_20px_rgba(128,0,255,0.2)] transition-all duration-300 hover:shadow-purple-500/30">
            <p className="text-base sm:text-lg font-mono leading-relaxed text-left animate-fade-in">
              🎮 Join the gaming revolution where every match ⚔️ matters, every
              skill 🧠 pays off, and every click 🖱️ brings you closer to
              real-world rewards 💰!
            </p>
          </div>
        </div>

        {/* Desktop Console Image */}
        {/* Desktop Console Card */}
        <div className="hidden md:flex flex-col items-center flex-1 justify-center">
          <div className="bg-gradient-to-br from-white/5 to-purple-900/10 border border-purple-500/20 rounded-2xl shadow-xl backdrop-blur-md p-6 flex flex-col items-center transition-all duration-300 hover:shadow-purple-600/40 hover:border-purple-500">
            <img
              src={assets.zebion}
              alt="Console"
              className="w-80 lg:w-[350px] xl:w-[400px] animate-[float_3s_ease-in-out_infinite] drop-shadow-xl"
            />

            <Link to="/missiondetails">
              <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition-all">
                Zebion Exclusive Here
              </button>
            </Link>
          </div>
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
              onClick={() => navigate(`/games/${game.group_id}`)}
              className="cursor-pointer p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-purple-700/70 hover:border-purple-400 group min-h-[500px]"
            >
              <div className="relative w-full aspect-video overflow-hidden rounded-md mb-5 border border-white/20 group-hover:shadow-md group-hover:shadow-purple-400">
                <img
                  src={game.demo_image_url}
                  alt={game.task_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 text-transparent bg-clip-text group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                {game.task_name}
              </h2>

              <p className="text-xl text-gray-300 text-center">
                {game.task_description}
              </p>

              <p className="text-xs text-gray-400 mt-3 text-center">
                ⏱ {game.time} • 👥 {game.joined_users}/{game.total_users}
              </p>

              {game.countdown && (
                <div className="mt-4 flex justify-center gap-3 text-purple-300 text-sm font-mono">
                  <div className="bg-black/30 px-2 py-1 rounded-md">
                    {game.countdown.days}d
                  </div>
                  <div className="bg-black/30 px-2 py-1 rounded-md">
                    {game.countdown.hours}h
                  </div>
                  <div className="bg-black/30 px-2 py-1 rounded-md">
                    {game.countdown.minutes}m
                  </div>
                  <div className="bg-black/30 px-2 py-1 rounded-md">
                    {game.countdown.seconds}s
                  </div>
                </div>
              )}
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
