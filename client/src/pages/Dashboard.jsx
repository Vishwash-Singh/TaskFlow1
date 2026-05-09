import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/dashboard", {
        headers: {
          Authorization: token,
        },
      });

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-indigo-500 transition-all">
            <h2 className="text-slate-400 text-lg">
              Total Projects
            </h2>

            <p className="text-5xl font-bold mt-5 text-indigo-500">
              {stats.totalProjects}
            </p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-green-500 transition-all">
            <h2 className="text-slate-400 text-lg">
              Total Tasks
            </h2>

            <p className="text-5xl font-bold mt-5 text-green-500">
              {stats.totalTasks}
            </p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-pink-500 transition-all">
            <h2 className="text-slate-400 text-lg">
              Completed Tasks
            </h2>

            <p className="text-5xl font-bold mt-5 text-pink-500">
              {stats.completedTasks}
            </p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-yellow-500 transition-all">
            <h2 className="text-slate-400 text-lg">
              Pending Tasks
            </h2>

            <p className="text-5xl font-bold mt-5 text-yellow-500">
              {stats.pendingTasks}
            </p>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

export default Dashboard;