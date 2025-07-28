import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const GameDetail = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [socialTasksCompleted, setSocialTasksCompleted] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [gameRes, taskRes, submissionRes] = await Promise.all([
          fetch("https://gamerthred.com/api/get_all_games.php"),
          fetch("https://gamerthred.com/api/all_tasks_grouped.php"),
          fetch("https://gamerthred.com/api/check_submissions.php", { headers }),
        ]);

        const gameData = await gameRes.json();
        const taskData = await taskRes.json();
        const submissionData = await submissionRes.json();

        if (gameData.status === 200 && taskData.status === 200) {
          const foundGame = gameData.data.find((g) => g.id === gameId);
          setGame(foundGame || null);
          const gameTasks = taskData.data[gameId] || [];
          setTasks(gameTasks);
        }

        if (submissionData.status === 200) {
          setSubmittedTasks(submissionData.submitted_tasks || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId]);

  const handleTaskSubmit = async (e, taskId, groupId) => {
    e.preventDefault();

    const fileInput = e.target.querySelector('input[type="file"]');
    const image = fileInput?.files[0];

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded?.id;

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("task_id", taskId);
    formData.append("group_id", groupId);
    formData.append("screenshot", image);
    formData.append("token", token);

    try {
      const res = await fetch("https://gamerthred.com/api/submit_task.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.status === 200) {
        alert("Task submitted successfully!");
        setSubmittedTasks((prev) => [...prev, taskId]); // update submitted task list
      } else {
        alert("Submission failed: " + result.msg);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting task.");
    }
  };

  const handleSocialTaskSubmit = (platform) => {
    setSocialTasksCompleted((prev) => ({ ...prev, [platform]: true }));
    alert(`Submitted ${platform} follow task successfully! Points added.`);
  };

  const socialMediaTasks = [
    {
      platform: "Instagram",
      link: "https://www.instagram.com/gamerthred/?igsh=dGthdDJ4eGlmYjlr#",
      icon: "📸",
      points: 10,
    },
    {
      platform: "Discord",
      link: "https://discord.com/invite/K5s4tmHyWz",
      icon: "💬",
      points: 15,
    },
    {
      platform: "Linkedin",
      link: "https://www.linkedin.com/company/gamerthred/",
      icon: "🐦",
      points: 10,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        Game not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Missions for {game.name}
      </h1>

      {/* Tasks List */}
      <div className="flex flex-col items-center gap-8">
        {tasks.map((task) => {
          const isSubmitted = submittedTasks.includes(task.task_id);
          return (
            <form
              key={task.task_id}
              onSubmit={(e) => handleTaskSubmit(e, task.task_id, gameId)}
              className={`relative w-full max-w-2xl p-6 rounded-xl shadow-lg backdrop-blur-md transition group ${
                isSubmitted
                  ? "bg-green-900 border border-green-600"
                  : "bg-white bg-opacity-10 border-2 border-purple-500 hover:border-purple-400"
              }`}
            >
              <div className={`absolute top-4 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-20 ${
                isSubmitted ? "bg-green-700" : "bg-purple-700"
              }`}>
                +{task.points} GTC
              </div>

              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                  isSubmitted
                    ? "text-green-200 bg-green-600 bg-opacity-30 border border-green-400"
                    : "text-yellow-200 bg-yellow-600 bg-opacity-30 border border-yellow-400 animate-pulse"
                }`}>
                  {isSubmitted ? "COMPLETED" : `${task.type?.toUpperCase()} MISSION`}
                </span>
              </div>

              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-3 text-center">{task.task_name}</h2>
                <p className="text-sm text-gray-300 mb-4">
                  {task.full_description}
                </p>

                {task.demo_image_url && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">
                      Demo Screenshot:
                    </p>
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
                  className="w-full mb-4 p-2 rounded bg-white text-black"
                  disabled={isSubmitted}
                  required={!isSubmitted}
                />

                <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                  <span className="bg-purple-800 px-2 py-1 rounded-full text-white text-xs font-semibold">
                    ⏱ Estimated: {task.time}
                  </span>
                  <span>
                    👥 Joined: {task.joined_users}/{task.total_users}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-2 rounded font-bold transition ${
                    isSubmitted
                      ? "bg-green-500 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {isSubmitted ? "Already Submitted" : "Submit"}
                </button>
              </div>
            </form>
          );
        })}
      </div>

      {/* Social Media Section */}
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
