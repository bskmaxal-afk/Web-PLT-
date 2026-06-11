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
    <header className="px-8 py-4 flex justify-between items-center bg-transparent">
      {/* Menu Button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 hover:bg-slate-50 transition shrink-0 cursor-pointer lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Spacer for desktop layout where desktop menu is hidden but layout remains aligned */}
      <div className="hidden lg:block"></div>

      {/* Date Time & Notifications */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-600 font-semibold text-[13px] bg-transparent">
          <Calendar size={15} className="text-slate-500" />
          <span>{formatIndonesianDate(time)}</span>
        </div>

        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 hover:bg-slate-50 transition shrink-0 cursor-pointer relative">
          <Bell size={18} />
          <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  );
}
