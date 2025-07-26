import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetail = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [socialTasksCompleted, setSocialTasksCompleted] = useState({});

  useEffect(() => {
    const hardcodedGames = [
      {
        id: "t001",
        name: "Build a Mini JCB",
        description: "Assemble a virtual JCB model using the provided parts.",
      },
      {
        id: "t002",
        name: "Plant a Tree in Simulation",
        description: "Use the farming sim to plant and grow a tree.",
      },
    ];

    const hardcodedTasks = {
      t001: [
        {
          task_id: "task1",
          task_name: "Assemble Base",
          task_description: "Attach wheels and set up base.",
          full_description:
            "Go to Level 2 of the simulator. Attach all 4 wheels using the tool provided. Submit a screenshot once the base is completely assembled.",
          points: 30,
          demo_image_url:
            "https://via.placeholder.com/400x200.png?text=Assemble+Base+Demo",
          total_users: 50,
          joined_users: 30,
          time: "30m",
        },
        {
          task_id: "task2",
          task_name: "Mount Arm",
          task_description: "Fix the digging arm and calibrate controls.",
          full_description:
            "In Level 4, fix the mechanical arm on the base and calibrate it. Submit a screenshot from the calibration panel with success message.",
          points: 50,
          demo_image_url:
            "https://via.placeholder.com/400x200.png?text=Mount+Arm+Demo",
          total_users: 50,
          joined_users: 25,
          time: "1h",
        },
      ],
      t002: [
        {
          task_id: "task4",
          task_name: "Dig Soil",
          task_description: "Dig a hole to plant the seedling.",
          full_description:
            "Go to Level 3. Use the shovel tool to dig a 1-meter hole. Submit a screenshot showing the completed dig site.",
          points: 25,
          demo_image_url:
            "https://via.placeholder.com/400x200.png?text=Dig+Soil+Demo",
          total_users: 30,
          joined_users: 22,
          time: "20m",
        },
        {
          task_id: "task5",
          task_name: "Water Tree",
          task_description: "Regularly water the plant to grow it fully.",
          full_description:
            "Advance to Level 5. Water the tree for 3 simulated days. Submit a screenshot of the fully grown tree.",
          points: 35,
          demo_image_url:
            "https://via.placeholder.com/400x200.png?text=Water+Tree+Demo",
          total_users: 30,
          joined_users: 25,
          time: "40m",
        },
      ],
    };

    setGame(hardcodedGames.find((g) => g.id === gameId));
    setTasks(hardcodedTasks[gameId] || []);
  }, [gameId]);

  const handleTaskSubmit = (e, taskName) => {
    e.preventDefault();
    alert(`Submitted ${taskName} successfully!`);
  };

  const handleSocialTaskSubmit = (platform) => {
    setSocialTasksCompleted((prev) => ({ ...prev, [platform]: true }));
    alert(`Submitted ${platform} follow task successfully! Points added.`);
  };

  const socialMediaTasks = [
    {
      platform: "Instagram",
      link: "https://instagram.com/brandhandle",
      icon: "📸",
      points: 10,
    },
    {
      platform: "Discord",
      link: "https://discord.gg/invitecode",
      icon: "💬",
      points: 15,
    },
    {
      platform: "Twitter",
      link: "https://twitter.com/brandhandle",
      icon: "🐦",
      points: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Missions for {game?.name || `Game ${gameId}`}
      </h1>

      {/* Game Tasks Section */}
      <div className="flex flex-col items-center gap-8">
        {tasks.map((task) => (
          <form
            key={task.task_id}
            onSubmit={(e) => handleTaskSubmit(e, task.task_name)}
            className="relative w-full max-w-2xl bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-md border-2 border-purple-500 hover:border-purple-400 transition group"
          >
            <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-20">
              +{task.points} pts
            </div>
            <div className="absolute -inset-0.5 rounded-xl blur-xl bg-purple-700 opacity-30 group-hover:opacity-60 transition-all pointer-events-none z-0" />

            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-3 text-center">
                {task.task_name}
              </h2>

              <p className="text-sm text-gray-300 mb-4">
                {task.full_description}
              </p>

              {task.demo_image_url && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Demo Screenshot:</p>
                  <img
                    src={task.demo_image_url}
                    alt={`Demo for ${task.task_name}`}
                    className="w-full rounded-lg border border-purple-600"
                  />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="w-full mb-3 p-2 rounded bg-white text-black"
                required
              />

              <p className="text-xs text-gray-400 mb-4">
                Time: {task.time} | Joined: {task.joined_users}/
                {task.total_users}
              </p>

              <input
                type="number"
                min="0"
                placeholder="Time taken (mins)"
                className="w-full mb-4 p-2 rounded bg-white text-black"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded font-bold"
              >
                Submit
              </button>
            </div>
          </form>
        ))}
      </div>

      {/* Social Media Tasks Section */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Social Media Bonus Tasks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialMediaTasks.map((task) => (
            <div
              key={task.platform}
              className="relative bg-white bg-opacity-10 p-6 rounded-xl shadow-xl backdrop-blur-md border border-gray-600 flex flex-col items-center text-center"
            >
              <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                +{task.points} pts
              </div>
              <div className="text-4xl mb-2">{task.icon}</div>
              <h3 className="text-xl font-bold mb-2">{task.platform}</h3>
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline mb-4"
              >
                Visit {task.platform}
              </a>
              <button
                disabled={socialTasksCompleted[task.platform]}
                onClick={() => handleSocialTaskSubmit(task.platform)}
                className={`px-4 py-2 w-full rounded font-semibold transition ${
                  socialTasksCompleted[task.platform]
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {socialTasksCompleted[task.platform]
                  ? "Submitted"
                  : "Mark as Done"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
