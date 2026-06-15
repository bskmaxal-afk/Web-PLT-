import { useState, useEffect, useContext } from "react";
import { Menu, Bell, Calendar } from "lucide-react";
import { AppContext } from "../../context/AppContext";

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const { setSidebarOpen } = useContext(AppContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Permohonan booking Lab Aplikasi 1 disetujui oleh admin.", time: "10 menit yang lalu", read: false },
    { id: 2, text: "Pengingat: Jadwal praktikum Alpro besok jam 07.30 di Lab Matematika.", time: "2 jam yang lalu", read: false },
    { id: 3, text: "Selamat datang di portal pemesanan ruang Lab MaTiSi!", time: "1 hari yang lalu", read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleReadNotification = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

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

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-xs border border-slate-100 hover:bg-slate-50 transition shrink-0 cursor-pointer relative z-50"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <>
              {/* Backdrop to close dropdown on click outside */}
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setShowNotifications(false)} 
              />
              
              {/* Dropdown Card */}
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 p-4 transition-all duration-200">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2 mb-2">
                  <h4 className="font-extrabold text-slate-800 text-sm">Notifikasi</h4>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllAsRead}
                      className="text-[10px] text-blue-600 hover:text-blue-700 font-bold cursor-pointer bg-transparent border-none outline-none"
                    >
                      Tandai semua dibaca
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs font-medium">
                      Tidak ada notifikasi baru
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => handleReadNotification(n.id)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                          n.read 
                            ? 'bg-white border-transparent hover:bg-slate-50/50' 
                            : 'bg-blue-50/20 border-blue-50/50 hover:bg-blue-50/30'
                        }`}
                      >
                        <p className={`text-xs leading-normal ${n.read ? 'text-slate-500 font-medium' : 'text-slate-800 font-semibold'}`}>
                          {n.text}
                        </p>
                        <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                          {n.time}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
