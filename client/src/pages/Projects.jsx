import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import toast from "react-hot-toast";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/projects", {
        headers: {
          Authorization: token,
        },
      });

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await API.post(
        "/projects",
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

      fetchProjects();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Projects 📁
        </h1>

        <form
          onSubmit={createProject}
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="text"
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl"
          >
            Create Project
          </button>
        </form>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-3 text-indigo-400">
                {project.title}
              </h2>

              <p className="text-slate-400">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;