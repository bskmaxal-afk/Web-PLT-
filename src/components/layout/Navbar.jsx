import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Calendar } from "lucide-react";
import { AppContext } from "../../context/AppContext";

/**
 * Navbar — Top navigation bar with date/time display.
 */
export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const { setSidebarOpen, isAdminAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatIndonesianDate = (date) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[date.getDay()];
    const dayNum = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, "0");

    return `${dayName}, ${dayNum} ${monthName} ${year} | ${hoursStr}:${minutes} ${ampm}`;
  };

  return (
    <header className="navbar-container flex items-center justify-between">
      {/* Left side: Menu toggle for mobile, Calendar & Green Admin Panel button */}
      <div className="flex items-center gap-4">
        {/* Menu Button (mobile only) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="menu-toggle-btn"
        >
          <Menu size={18} />
        </button>

        {/* Date Time display */}
        <div className="datetime-display flex items-center gap-2 text-slate-650 font-semibold text-[13px] bg-transparent">
          <Calendar size={15} className="text-slate-500 shrink-0" />
          <span className="hidden sm:inline">{formatIndonesianDate(time)}</span>
          <span className="sm:hidden">{time.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Green Admin Panel button (only visible inside rumpun) */}
        {currentRumpun && (
          <button
            onClick={() => navigate(`/admin/${currentRumpun}`)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] md:text-xs font-bold transition-all shadow-md shadow-emerald-500/10 border-none cursor-pointer active:scale-95 shrink-0"
          >
            <span>Panel Admin</span>
          </button>
        )}
      </div>

      {/* Right side spacer */}
      <div className="navbar-right"></div>
    </header>
  );
}
