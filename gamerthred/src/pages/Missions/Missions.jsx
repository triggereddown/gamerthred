import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const Missions = () => {
  const [tasksByType, setTasksByType] = useState({});
  const [loading, setLoading] = useState(true);
  const [submittedTasks, setSubmittedTasks] = useState({});
  const [fileInputs, setFileInputs] = useState({});

  // Fetch tasks from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await fetch("https://gamerthred.com/api/all_tasks_grouped.php");
        const tasksData = await tasksResponse.json();
        
        if (tasksData.status === 200 && tasksData.data) {
          const grouped = {};
          Object.values(tasksData.data)
            .flat()
            .forEach((task) => {
              if (!grouped[task.type]) grouped[task.type] = [];
              grouped[task.type].push(task);
            });
          setTasksByType(grouped);
        } else {
          // Mock data if fetch fails
          setTasksByType({
            "daily": [
              {
                task_id: "m-1",
                task_name: "10 Headshots",
                full_description: "Get 10 headshots in a single match.",
                demo_image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
                points: 50,
                type: "daily",
                time: "24 Hours",
                joined_users: 120,
                total_users: 500
              }
            ]
          });
        }

        const token = localStorage.getItem("token");
        if (token) {
          const submissionsResponse = await fetch("https://gamerthred.com/api/check_submissions.php", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          const submissionsData = await submissionsResponse.json();
          if (submissionsData.status === 200) {
            const submittedTasksObj = {};
            submissionsData.submitted_tasks.forEach(taskId => {
              submittedTasksObj[taskId] = true;
            });
            setSubmittedTasks(submittedTasksObj);
          }
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (taskId, file) => {
    setFileInputs((prev) => ({ ...prev, [taskId]: file }));
  };

  const handleSubmit = async (task, group_id) => {
    if (submittedTasks[task.task_id]) {
      alert("You have already submitted this task!");
      return;
    }
    
    const image = fileInputs[task.task_id];
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
    formData.append("task_id", task.task_id);
    formData.append("group_id", group_id);
    formData.append("user_id", userId);
    formData.append("token", token);
    formData.append("screenshot", image);

    try {
      const res = await fetch("https://gamerthred.com/api/submit_task.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.status === 200) {
        alert(`Submitted "${task.task_name}" successfully!`);
        setSubmittedTasks((prev) => ({ ...prev, [task.task_id]: true }));
        setFileInputs((prev) => ({ ...prev, [task.task_id]: null }));
      } else {
        alert(`Failed to submit: ${result.msg}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-container pt-32 pb-24 px-6 md:px-10">
      <div className="flex flex-col gap-6 mb-16 max-w-2xl mx-auto text-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide w-max"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)" }}
        >
          Tasks & Submissions
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-heading font-semibold tracking-tight"
        >
          All Missions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-muted font-normal"
          style={{ color: "var(--text-muted)" }}
        >
          Browse active missions, complete objectives in-game, and upload your screenshots to earn GTC and rewards.
        </motion.p>
      </div>

      {Object.entries(tasksByType).map(([group_id, tasks], groupIndex) => (
        <div key={group_id} className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-semibold mb-8 capitalize font-heading border-b border-white/10 pb-4"
          >
            {group_id} Missions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, i) => {
              const isSubmitted = submittedTasks[task.task_id];
              return (
                <motion.div
                  key={task.task_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="glass-card flex flex-col gap-4 relative overflow-hidden group"
                  style={{ opacity: isSubmitted ? 0.7 : 1 }}
                >
                  {isSubmitted && (
                    <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white border border-white text-black z-20">
                      ✓ Submitted
                    </div>
                  )}

                  <div className="absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 border border-white/20 z-20">
                    +{task.points} GTC
                  </div>

                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2">
                    <img
                      src={task.demo_image_url}
                      alt={task.task_name}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isSubmitted ? 'grayscale' : ''}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-heading font-semibold tracking-tight">
                      {task.task_name}
                    </h3>
                    <p className="text-sm font-normal text-muted line-clamp-2" style={{ color: "var(--text-muted)" }}>
                      {task.full_description}
                    </p>
                  </div>

                  <div className="flex justify-between text-xs font-medium border-t border-white/10 pt-4 mt-2" style={{ color: "var(--text-muted)" }}>
                    <span>⏱ {task.time}</span>
                    <span>👥 {task.joined_users}/{task.total_users}</span>
                  </div>

                  <div className="mt-auto pt-2 flex flex-col gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isSubmitted}
                      className={`w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 transition-colors ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onChange={(e) => handleFileChange(task.task_id, e.target.files[0])}
                    />
                    
                    <button
                      onClick={() => handleSubmit(task, group_id)}
                      disabled={isSubmitted}
                      className={`w-full py-3 rounded-full text-sm font-medium transition-all ${
                        isSubmitted
                          ? "bg-white/10 text-white/50 cursor-not-allowed"
                          : "bg-white text-black hover:scale-[1.02]"
                      }`}
                    >
                      {isSubmitted ? "Mission Complete" : "Submit Screenshot"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Missions;