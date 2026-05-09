import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: token,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/tasks",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.put(
        `/tasks/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(response.data.message);

      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success(response.data.message);

      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold text-white">
          Tasks ✅
        </h1>
      </div>

      {/* Create Task Form */}
      <form
        onSubmit={createTask}
        className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl mb-10"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="mt-5 bg-indigo-600 hover:bg-indigo-700 transition-all px-6 py-3 rounded-xl text-white font-semibold"
        >
          Create Task
        </button>
      </form>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-indigo-400">
                {task.title}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {task.status}
              </span>
            </div>

            <p className="text-slate-400 mb-6">
              {task.description}
            </p>

            <button
              onClick={() =>
                updateTaskStatus(
                  task._id,
                  task.status === "Completed"
                    ? "Pending"
                    : "Completed"
                )
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all py-3 rounded-xl text-white font-semibold"
            >
              Mark as{" "}
              {task.status === "Completed"
                ? "Pending"
                : "Completed"}
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 transition-all py-3 rounded-xl text-white font-semibold"
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Tasks;