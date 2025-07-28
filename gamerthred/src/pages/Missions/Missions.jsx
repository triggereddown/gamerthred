import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Missions = () => {
  const [tasksByType, setTasksByType] = useState({});
  const [loading, setLoading] = useState(true);
  const [submittedTasks, setSubmittedTasks] = useState({});
  const [fileInputs, setFileInputs] = useState({});

  // Fetch tasks from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all tasks
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
        }

        // Fetch user's submitted tasks
        const token = localStorage.getItem("token");
        if (token) {
          const submissionsResponse = await fetch("https://gamerthred.com/api/check_submissions.php", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
    // Check if already submitted
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
        
        // Clear the file input
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
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading missions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-10 text-center">All Missions</h1>

      {Object.entries(tasksByType).map(([group_id, tasks]) => (
        <div key={group_id} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 capitalize text-center">
            {group_id} Missions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => {
              const isSubmitted = submittedTasks[task.task_id];
              
              return (
                <div
                  key={task.task_id}
                  className={`relative w-full bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-md border-2 transition group ${
                    isSubmitted 
                      ? 'border-green-500 bg-green-900 bg-opacity-20' 
                      : 'border-purple-500 hover:border-purple-400'
                  }`}
                >
                  {/* Submitted Badge */}
                  {isSubmitted && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20">
                      ✓ SUBMITTED
                    </div>
                  )}

                  {/* Points */}
                  <div className="absolute top-4 right-4 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    +{task.points} GTC
                  </div>

                  {/* Type Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold text-yellow-200 bg-yellow-600 bg-opacity-30 border border-yellow-400 rounded-full shadow-md animate-pulse">
                      {task.type?.toUpperCase()} MISSION
                    </span>
                  </div>

                  {/* Glow */}
                  <div className={`absolute -inset-0.5 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all pointer-events-none z-0 ${
                    isSubmitted ? 'bg-green-700' : 'bg-purple-700'
                  }`} />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-3 text-center mt-8">
                      {task.task_name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      {task.full_description}
                    </p>

                    <img
                      src={task.demo_image_url}
                      alt={task.task_name}
                      className={`w-full h-40 object-cover rounded-lg border mb-4 ${
                        isSubmitted 
                          ? 'border-green-600 opacity-75 grayscale' 
                          : 'border-purple-600'
                      }`}
                    />

                    <input
                      type="file"
                      accept="image/*"
                      disabled={isSubmitted}
                      className={`w-full mb-4 p-2 rounded text-black ${
                        isSubmitted 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-white'
                      }`}
                      onChange={(e) =>
                        handleFileChange(task.task_id, e.target.files[0])
                      }
                    />

                    <div className="flex justify-between text-xs text-gray-400 mb-4">
                      <span className="bg-purple-800 px-2 py-1 rounded-full text-white text-xs font-semibold">
                        ⏱ Estimated: {task.time}
                      </span>
                      <span>
                        👥 Joined: {task.joined_users}/{task.total_users}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSubmit(task, group_id)}
                      disabled={isSubmitted}
                      className={`w-full py-2 rounded font-bold transition ${
                        isSubmitted
                          ? "bg-green-600 cursor-not-allowed text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {isSubmitted ? "✓ Submitted" : "Submit Mission"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Missions;