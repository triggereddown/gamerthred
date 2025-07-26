import React, { useState } from "react";

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
      type: "weekly",
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
      type: "daily",
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
      type: "brand",
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
      type: "monthly",
    },
  ],
};

// Group tasks by type
const groupTasksByType = () => {
  const grouped = {};
  Object.values(hardcodedTasks)
    .flat()
    .forEach((task) => {
      if (!grouped[task.type]) grouped[task.type] = [];
      grouped[task.type].push(task);
    });
  return grouped;
};

const Missions = () => {
  const groupedTasks = groupTasksByType();

  const [submittedTasks, setSubmittedTasks] = useState({});

  const handleSubmit = (e, taskId, taskName) => {
    e.preventDefault();
    setSubmittedTasks((prev) => ({ ...prev, [taskId]: true }));
    alert(`Submitted ${taskName} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-10 text-center">All Missions</h1>

      {Object.entries(groupedTasks).map(([type, tasks]) => (
        <div key={type} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 capitalize text-center">
            {type} Missions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <form
                key={task.task_id}
                onSubmit={(e) => handleSubmit(e, task.task_id, task.task_name)}
                className="relative w-full bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-md border-2 border-purple-500 hover:border-purple-400 transition group"
              >
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
                <div className="absolute -inset-0.5 rounded-xl blur-xl bg-purple-700 opacity-30 group-hover:opacity-60 transition-all pointer-events-none z-0" />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {task.task_name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {task.full_description}
                  </p>

                  <img
                    src={task.demo_image_url}
                    alt={task.task_name}
                    className="w-full h-40 object-cover rounded-lg border border-purple-600 mb-4"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    required
                    className="w-full mb-4 p-2 rounded bg-white text-black"
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
                    type="submit"
                    disabled={submittedTasks[task.task_id]}
                    className={`w-full py-2 rounded font-bold transition ${
                      submittedTasks[task.task_id]
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {submittedTasks[task.task_id] ? "Submitted" : "Submit"}
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Missions;
