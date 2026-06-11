import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, History, Info, CircleHelp, Phone, Headphones, X } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import logoUIN from "../../assets/logoUIN.jpg";

const menus = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Pemesanan Ruang", path: "/booking", icon: CalendarDays },
  { name: "Jadwal Saya", path: "/schedule", icon: CalendarDays },
  { name: "Riwayat Penggunaan", path: "/history", icon: History },
  { name: "Informasi Lab", path: "/laboratories", icon: Info },
  { name: "Panduan Penggunaan", path: "/guide", icon: CircleHelp },
  { name: "Kontak & Bantuan", path: "/contact", icon: Phone },
];

export default function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useContext(AppContext);

  const SidebarContent = ({ showCloseBtn = false }) => (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center border border-slate-100 shrink-0">
            <img src={logoUIN} alt="UIN Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-slate-800 font-display tracking-tight leading-none mb-0.5">Lab MaTiSi</h1>
            <p className="text-[8.5px] text-slate-400 font-semibold leading-normal max-w-[170px]">
              Laboratorium Komputer Prodi Matematika, Teknik Informatika dan Sistem Informasi
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {showCloseBtn && (
          <button 
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5 flex-1">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Help Card */}
      <div className="mt-auto bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
            <Headphones size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs leading-none mb-1">Butuh Bantuan?</h4>
            <p className="text-[10px] text-slate-400 font-medium">Hubungi Admin Lab</p>
          </div>
        </div>
        <a
          href="https://wa.me/#"
          onClick={() => setSidebarOpen(false)}
          className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-1 transition"
        >
          Hubungi Sekarang <span className="font-mono text-[10px]">&gt;</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:flex w-72 min-h-screen bg-white border-r border-slate-100 flex-col p-6 shrink-0">
        <SidebarContent showCloseBtn={false} />
      </aside>

      {/* Mobile Drawer Sidebar */}
      <div 
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setSidebarOpen(false)}
      >
        <aside 
          className={`fixed inset-y-0 left-0 w-72 bg-white p-6 flex flex-col transition-transform duration-300 ease-out z-50 shadow-2xl ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`} 
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent showCloseBtn={true} />
        </aside>
      </div>
    </>
  );
}
