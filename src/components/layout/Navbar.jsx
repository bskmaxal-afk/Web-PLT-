import { useState, useEffect, useContext } from "react";
import { Menu, Bell, Calendar } from "lucide-react";
import { AppContext } from "../../context/AppContext";

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const { setSidebarOpen } = useContext(AppContext);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000); // Update every second for accuracy
    return () => clearInterval(timer);
  }, []);

  const formatIndonesianDate = (date) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    
    const dayName = days[date.getDay()];
    const dayNum = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, '0');
    
    return `${dayName}, ${dayNum} ${monthName} ${year} | ${hoursStr}:${minutes} ${ampm}`;
  };

  return (
    <header className="navbar-container">
      {/* Menu Button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="menu-toggle-btn"
      >
        <Menu size={18} />
      </button>

      {/* Spacer for desktop layout where desktop menu is hidden but layout remains aligned */}
      <div className="hidden lg:block"></div>

      {/* Date Time & Notifications */}
      <div className="navbar-right">
        <div className="datetime-display">
          <Calendar size={15} className="text-slate-500" />
          <span>{formatIndonesianDate(time)}</span>
        </div>

        <button className="notification-btn">
          <Bell size={18} />
          <span className="notification-badge"></span>
        </button>
      </div>
    </header>
  );
}
