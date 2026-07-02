import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Info, CircleHelp, Phone, Headphones, X, CalendarDays, ShieldCheck, ArrowLeft } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import logoUIN from "../../assets/logoUIN_new.png";
import Swal from "sweetalert2";

// Extracted outside Sidebar to avoid re-creation during render
const SidebarContent = ({ showCloseBtn = false, setSidebarOpen }) => {
  const { isAdminAuthenticated } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const rumpunList = ["tisimat", "biologi", "fisika", "kimia", "agribisnis", "tambang", "pangan", "lingkungan"];
  let currentRumpun = null;

  if (pathParts[0] && rumpunList.includes(pathParts[0].toLowerCase())) {
    currentRumpun = pathParts[0].toLowerCase();
  } else if (pathParts[0] === "admin" && pathParts[1] && rumpunList.includes(pathParts[1].toLowerCase())) {
    currentRumpun = pathParts[1].toLowerCase();
  } else {
    // Cek parameter query ?rumpun=...
    const searchParams = new URLSearchParams(location.search);
    const urlRumpun = searchParams.get("rumpun");
    if (urlRumpun && rumpunList.includes(urlRumpun.toLowerCase())) {
      currentRumpun = urlRumpun.toLowerCase();
    }
  }

  const menus = [
    { name: "Dashboard", path: currentRumpun ? `/${currentRumpun}` : "/dashboard", icon: LayoutDashboard },
    ...(currentRumpun ? [
      { 
        name: "Pemesanan Ruang", 
        path: `/booking?rumpun=${currentRumpun}`, 
        icon: CalendarDays 
      }
    ] : []),
    { 
      name: "Panel Admin", 
      path: currentRumpun ? `/admin/${currentRumpun}` : "/admin", 
      icon: ShieldCheck, 
      requiresAdmin: true 
    },
    ...(!currentRumpun ? [
      { name: "Informasi Rumpun", path: "/laboratories", icon: Info }
    ] : []),
    { name: "Panduan Penggunaan", path: currentRumpun ? `/guide?rumpun=${currentRumpun}` : "/guide", icon: CircleHelp },
    { name: "Kontak & Bantuan", path: currentRumpun ? `/contact?rumpun=${currentRumpun}` : "/contact", icon: Phone },
    ...(currentRumpun ? [
      { 
        name: "Kembali Ke Utama", 
        path: "/dashboard", 
        icon: ArrowLeft 
      }
    ] : []),
  ];

  return (
    <div className="sidebar-container flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="sidebar-header flex items-center justify-between mb-8">
          <div className="sidebar-brand flex items-center gap-3">
            <div className="sidebar-logo-container w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-slate-100/80 shadow-xs shrink-0 transition-transform duration-300 hover:scale-105">
              <img src={logoUIN} alt="UIN Logo" className="sidebar-logo w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <h1 className="sidebar-title text-base font-extrabold text-slate-800 font-display tracking-tight leading-none mb-0.5">
                PLT UIN Jakarta
              </h1>
              <p className="sidebar-subtitle text-[8.5px] text-slate-400 font-semibold leading-normal max-w-[170px]">
                Portal Laboratorium Terpadu
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          {showCloseBtn && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="sidebar-close-btn w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition duration-150 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav space-y-1">
          {menus.map((item) => {
            // Sembunyikan item admin jika belum terautentikasi
            if (item.requiresAdmin && !isAdminAuthenticated) {
              return null;
            }

            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={(e) => {
                  if (item.name === "Kembali Ke Utama") {
                    e.preventDefault();
                    Swal.fire({
                      title: "Kembali ke Halaman Utama?",
                      text: "Anda akan keluar dari rumpun aktif saat ini.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0f3484",
                      cancelButtonColor: "#e11d48",
                      confirmButtonText: "Ya, Kembali",
                      cancelButtonText: "Batal",
                      customClass: {
                        popup: 'rounded-3xl p-6',
                        title: 'text-lg font-extrabold text-slate-800',
                        confirmButton: 'rounded-xl px-5 py-2.5 text-xs font-bold',
                        cancelButton: 'rounded-xl px-5 py-2.5 text-xs font-bold'
                      }
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setSidebarOpen(false);
                        navigate(item.path);
                      }
                    });
                  } else {
                    setSidebarOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-xs font-bold hover:translate-x-1 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-700 to-indigo-850 text-white shadow-md shadow-blue-700/15"
                      : "text-slate-500 hover:bg-slate-50 hover:text-blue-700"
                  }`
                }
              >
                <Icon size={16} className="shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Help Card */}
      <div className="sidebar-help-card bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-100/40 rounded-2xl p-4 flex flex-col gap-3 mt-8">
        <div className="sidebar-help-header flex items-center gap-3">
          <div className="sidebar-help-icon w-8 h-8 rounded-xl bg-blue-100/70 flex items-center justify-center text-blue-700 shrink-0">
            <Headphones size={15} />
          </div>
          <div className="text-left">
            <h4 className="sidebar-help-title font-extrabold text-slate-800 text-[11px] leading-none mb-1">
              Butuh Bantuan?
            </h4>
            <p className="sidebar-help-subtitle text-[9px] text-slate-400 font-semibold">
              Hubungi Admin Lab
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/628123456789"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setSidebarOpen(false)}
          className="sidebar-help-btn w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-center text-[10px] font-extrabold flex items-center justify-center gap-1 transition duration-150 shadow-xs"
        >
          Hubungi Sekarang <span className="font-mono text-[9px]">&gt;</span>
        </a>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useContext(AppContext);

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="sidebar">
        <SidebarContent showCloseBtn={false} setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* Mobile Drawer Sidebar */}
      <div 
        className={`sidebar-drawer-overlay ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={() => setSidebarOpen(false)}
      >
        <aside 
          className={`sidebar-drawer-aside ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`} 
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent showCloseBtn={true} setSidebarOpen={setSidebarOpen} />
        </aside>
      </div>
    </>
  );
}
