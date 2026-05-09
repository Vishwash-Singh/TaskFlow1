import Sidebar from "../components/Sidebar";
import { Search, Bell } from "lucide-react";

function MainLayout({ children }) {
  return (
    <div className="flex bg-[#020817] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1">
        {/* Navbar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
          <div className="relative w-[350px]">
            <Search
              className="absolute left-4 top-3.5 text-slate-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell className="text-slate-300" />

              <span className="absolute -top-1 -right-1 bg-pink-500 w-2 h-2 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                VS
              </div>

              <div>
                <h3 className="font-semibold">
                  Vishwash
                </h3>

                <p className="text-xs text-slate-400">
                  Admin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;