import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, History, Info, CircleHelp, Phone, Headphones, X, Lock, Eye, EyeOff, UserCheck, GraduationCap, ShieldCheck } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { loginAdmin } from "../../services/authService";
import logoUIN from "../../assets/logoUIN.jpg";

const menus = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Pemesanan Ruang", path: "/booking", icon: CalendarDays },
  { name: "Riwayat Penggunaan", path: "/history", icon: History, requiresAdmin: true },
  { name: "Informasi Lab", path: "/laboratories", icon: Info },
  { name: "Panduan Penggunaan", path: "/guide", icon: CircleHelp },
  { name: "Kontak & Bantuan", path: "/contact", icon: Phone },
];

/**
 * RoleSelectionModal — First modal: asks if user is Admin or Mahasiswa.
 */
function RoleSelectionModal({ isOpen, onClose, onSelectAdmin, onSelectMahasiswa }) {
  if (!isOpen) return null;

  return (
    <div className="admin-login-overlay" onClick={onClose}>
      <div className="admin-login-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "400px" }}>
        {/* Close button */}
        <button onClick={onClose} className="admin-login-close-btn">
          <X size={16} />
        </button>

        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-icon-wrapper">
            <UserCheck size={24} />
          </div>
          <h3 className="admin-login-title">Verifikasi Akses</h3>
          <p className="admin-login-subtitle">
            Pilih peran Anda untuk mengakses halaman Riwayat Penggunaan.
          </p>
        </div>

        {/* Role Buttons */}
        <div className="role-selection-buttons">
          <button onClick={onSelectAdmin} className="role-btn role-btn-admin">
            <div className="role-btn-icon role-btn-icon-admin">
              <ShieldCheck size={22} />
            </div>
            <div className="role-btn-text">
              <span className="role-btn-label">Admin</span>
              <span className="role-btn-desc">Akses penuh ke data riwayat</span>
            </div>
          </button>

          <button onClick={onSelectMahasiswa} className="role-btn role-btn-mahasiswa">
            <div className="role-btn-icon role-btn-icon-mahasiswa">
              <GraduationCap size={22} />
            </div>
            <div className="role-btn-text">
              <span className="role-btn-label">Mahasiswa</span>
              <span className="role-btn-desc">Peminjaman laboratorium</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * StudentDenialModal — Shown when Mahasiswa tries to access Riwayat.
 */
function StudentDenialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="admin-login-overlay" onClick={onClose}>
      <div className="admin-login-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "400px" }}>
        <button onClick={onClose} className="admin-login-close-btn">
          <X size={16} />
        </button>

        <div className="admin-login-header">
          <div style={{
            width: "56px", height: "56px", borderRadius: "1rem",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", margin: "0 auto 1rem",
            boxShadow: "0 8px 24px rgba(217, 119, 6, 0.3)",
          }}>
            <GraduationCap size={24} />
          </div>
          <h3 className="admin-login-title">Akses Terbatas</h3>
          <p className="admin-login-subtitle" style={{ marginTop: "8px", lineHeight: "1.6" }}>
            Riwayat penggunaan hanya dapat diakses oleh <strong>Admin</strong>.
          </p>
          <p className="admin-login-subtitle" style={{ marginTop: "4px" }}>
            Silakan hubungi admin laboratorium jika Anda memerlukan informasi terkait riwayat penggunaan.
          </p>
        </div>

        <button
          onClick={onClose}
          className="admin-login-submit-btn"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", marginTop: "0.5rem" }}
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}

/**
 * AdminLoginModal — Verifies admin credentials via backend API.
 */
function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await loginAdmin({ username, password });

      if (result.success) {
        console.log("Login admin sukses");
        onSuccess();
        setUsername("");
        setPassword("");
        setError("");
      } else {
        console.log("Login admin gagal:", result.message);
        setError(result.message);
      }
    } catch (error) {
      console.log("Login admin gagal (network error):", error);
      setError("Terjadi kesalahan jaringan. Pastikan server backend aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="admin-login-overlay" onClick={handleClose}>
      <div className="admin-login-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={handleClose} className="admin-login-close-btn">
          <X size={16} />
        </button>

        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-icon-wrapper">
            <Lock size={24} />
          </div>
          <h3 className="admin-login-title">Login Admin</h3>
          <p className="admin-login-subtitle">
            Masukkan kredensial admin untuk mengakses riwayat penggunaan laboratorium.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label className="admin-login-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="admin-login-input"
              autoFocus
              required
            />
          </div>

          <div className="admin-login-field">
            <label className="admin-login-label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="admin-login-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="admin-login-eye-btn"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="admin-login-submit-btn"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="admin-login-spinner"></span>
                Memverifikasi...
              </span>
            ) : (
              "Masuk sebagai Admin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Extracted outside Sidebar to avoid re-creation during render
const SidebarContent = ({ showCloseBtn = false, setSidebarOpen, onHistoryClick }) => (
  <div className="sidebar-container">
    {/* Brand Header */}
    <div className="sidebar-header">
      <div className="sidebar-brand">
        <div className="sidebar-logo-container">
          <img src={logoUIN} alt="UIN Logo" className="sidebar-logo" />
        </div>
        <div className="flex flex-col">
          <h1 className="sidebar-title">Lab MaTiSi</h1>
          <p className="sidebar-subtitle">
            Laboratorium Komputer Prodi Matematika, Teknik Informatika dan Sistem Informasi
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
        const Icon = item.icon;

        if (item.requiresAdmin) {
          return (
            <button
              key={item.name}
              onClick={() => {
                setSidebarOpen(false);
                onHistoryClick();
              }}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-blue-600 w-full text-left bg-transparent border-none cursor-pointer"
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.name}</span>
            </button>
          );
        }

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

export default function Sidebar() {
  const { isSidebarOpen, setSidebarOpen, isAdminAuthenticated, handleLogin } = useContext(AppContext);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDenialModal, setShowDenialModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    if (isAdminAuthenticated) {
      navigate("/history");
    } else {
      setShowRoleModal(true);
    }
  };

  const handleSelectAdmin = () => {
    setShowRoleModal(false);
    setShowLoginModal(true);
  };

  const handleSelectMahasiswa = () => {
    setShowRoleModal(false);
    setShowDenialModal(true);
  };

  const handleLoginSuccess = () => {
    handleLogin();
    setShowLoginModal(false);
    navigate("/history");
  };

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="sidebar">
        <SidebarContent showCloseBtn={false} setSidebarOpen={setSidebarOpen} onHistoryClick={handleHistoryClick} />
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
          <SidebarContent showCloseBtn={true} setSidebarOpen={setSidebarOpen} onHistoryClick={handleHistoryClick} />
        </aside>
      </div>

      {/* Step 1: Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelectAdmin={handleSelectAdmin}
        onSelectMahasiswa={handleSelectMahasiswa}
      />

      {/* Step 1b: Student Denial Modal */}
      <StudentDenialModal
        isOpen={showDenialModal}
        onClose={() => setShowDenialModal(false)}
      />

      {/* Step 2: Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
