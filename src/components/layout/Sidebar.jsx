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
    <div className="sidebar-container">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo-container">
            <img src={logoUIN} alt="UIN Logo" className="sidebar-logo" />
          </div>
          <div className="flex flex-col">
            <h1 className="sidebar-title">PLT UIN Jakarta</h1>
            <p className="sidebar-subtitle">
              Pusat Laboratorium Terpadu UIN Syarif Hidayatullah Jakarta
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {showCloseBtn && (
          <button 
            onClick={() => setSidebarOpen(false)}
            className="sidebar-close-btn"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
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
                    confirmButtonColor: "#2563eb",
                    cancelButtonColor: "#dc2626",
                    confirmButtonText: "Ya, Kembali",
                    cancelButtonText: "Batal",
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
      <div className="sidebar-help-card">
        <div className="sidebar-help-header">
          <div className="sidebar-help-icon">
            <Headphones size={18} />
          </div>
          <div>
            <h4 className="sidebar-help-title">Butuh Bantuan?</h4>
            <p className="sidebar-help-subtitle">Hubungi Admin Lab</p>
          </div>
        </div>
        <a
          href="https://wa.me/628123456789"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setSidebarOpen(false)}
          className="sidebar-help-btn"
        >
          Hubungi Sekarang <span className="font-mono text-[10px]">&gt;</span>
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
