import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-indigo-500 mb-10">
        TaskFlow
      </h1>

      <div className="space-y-4">
        <Link to="/dashboard">
          <button className="flex items-center gap-3 w-full bg-indigo-600 px-4 py-3 rounded-xl text-white">
            <LayoutDashboard size={20} />
            Dashboard
          </button>
        </Link>

        <Link to="/projects">
          <button className="flex items-center gap-3 w-full hover:bg-slate-800 px-4 py-3 rounded-xl text-slate-300 transition-all">
            <FolderKanban size={20} />
            Projects
          </button>
        </Link>

        <Link to="/tasks"className="flex items-center gap-3 w-full hover:bg-slate-800 px-4 py-3 rounded-xl text-slate-300 transition-all"> <CheckSquare size={20} />Tasks</Link>

        <Link to="/logout">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full hover:bg-red-500/20 px-4 py-3 rounded-xl text-red-400 transition-all mt-10"
          >
            <LogOut size={20} />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;