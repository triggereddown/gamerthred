import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetail = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [tasks, setTasks] = useState([]);

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
          image_url: "https://example.com/images/jcb_base.jpg",
          total_users: 50,
          joined_users: 30,
          time: "30m",
        },
        {
          task_id: "task2",
          task_name: "Mount Arm",
          task_description: "Fix the digging arm and calibrate controls.",
          image_url: "https://example.com/images/jcb_arm.jpg",
          total_users: 50,
          joined_users: 25,
          time: "1h",
        },
        {
          task_id: "task3",
          task_name: "Test Drive",
          task_description: "Simulate a drive to verify functionality.",
          image_url: "https://example.com/images/jcb_test.jpg",
          total_users: 50,
          joined_users: 20,
          time: "45m",
        },
      ],
      t002: [
        {
          task_id: "task4",
          task_name: "Dig Soil",
          task_description: "Dig a hole to plant the seedling.",
          image_url: "https://example.com/images/tree_dig.jpg",
          total_users: 30,
          joined_users: 22,
          time: "20m",
        },
        {
          task_id: "task5",
          task_name: "Water Tree",
          task_description: "Regularly water the plant to grow it fully.",
          image_url: "https://example.com/images/tree_water.jpg",
          total_users: 30,
          joined_users: 25,
          time: "40m",
        },
      ],
    };

    const selectedGame = hardcodedGames.find((g) => g.id === gameId);
    const selectedTasks = hardcodedTasks[gameId] || [];

    setGame(selectedGame);
    setTasks(selectedTasks);
  }, [gameId]);

  const handleTaskSubmit = (e, taskName) => {
    e.preventDefault();
    alert(`Submitted ${taskName} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white p-6 md:px-20 font-sans">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Missions for {game?.name || `Game ${gameId}`}
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {tasks.map((task) => (
          <form
            key={task.task_id}
            onSubmit={(e) => handleTaskSubmit(e, task.task_name)}
            className="w-full sm:w-[300px] bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-md border-2 border-purple-500 hover:border-purple-400 transition relative group"
          >
            <div className="absolute -inset-0.5 rounded-xl blur-xl bg-purple-700 opacity-30 group-hover:opacity-60 transition-all pointer-events-none z-0" />
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-4 text-center">
                {task.task_name}
              </h2>

              <input
                type="file"
                accept="image/*"
                className="w-full mb-3 p-2 rounded bg-white text-black"
                required
              />

              <p className="text-sm text-gray-300 mb-2">
                {task.task_description}
              </p>
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
    </div>
  );
};

export default GameDetail;
