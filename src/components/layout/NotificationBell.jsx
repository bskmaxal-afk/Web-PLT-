import { useState, useContext, useRef, useEffect } from "react";
import { Bell, CheckCircle, XCircle, Clock, X, CheckCheck } from "lucide-react";
import { AppContext } from "../../context/AppContext";

/**
 * NotificationBell — Displays notifications for students
 * when admin approves or rejects their lab booking.
 */
export default function NotificationBell() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);

    if (diffMin < 1) return "Baru saja";
    if (diffMin < 60) return `${diffMin} menit lalu`;
    if (diffHour < 24) return `${diffHour} jam lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
        title="Notifikasi"
        id="notification-bell-btn"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] flex items-center justify-center bg-red-500 text-white text-[9px] font-black rounded-full px-1 shadow-sm animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
          style={{ animation: "notifSlideIn 0.18s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-blue-600" />
              <span className="font-bold text-sm text-slate-800">Notifikasi</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full">
                  {unreadCount} baru
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllNotificationsRead()}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                  title="Tandai semua dibaca"
                >
                  <CheckCheck size={12} />
                  Baca semua
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-50">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                  <Bell size={24} className="text-slate-300" />
                </div>
                <p className="text-sm font-semibold text-slate-400">Belum ada notifikasi</p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Notifikasi akan muncul saat admin memproses pemesanan lab Anda.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`flex gap-3 px-4 py-3.5 cursor-pointer transition hover:bg-slate-50/80 ${
                    !notif.isRead ? "bg-blue-50/40" : "bg-white"
                  }`}
                >
                  {/* Icon */}
                  <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                    notif.type === "diterima"
                      ? "bg-emerald-100 text-emerald-600"
                      : notif.type === "ditolak"
                      ? "bg-red-100 text-red-500"
                      : "bg-amber-100 text-amber-600"
                  }`}>
                    {notif.type === "diterima" ? (
                      <CheckCircle size={16} />
                    ) : notif.type === "ditolak" ? (
                      <XCircle size={16} />
                    ) : (
                      <Clock size={16} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs font-bold leading-tight ${
                        notif.type === "diterima" ? "text-emerald-700" : notif.type === "ditolak" ? "text-red-600" : "text-amber-700"
                      }`}>
                        {notif.title}
                      </p>
                      {!notif.isRead && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-3">
                      {notif.message}
                    </p>
                    {/* Details chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {notif.ruang && (
                        <span className="px-1.5 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 rounded text-[9px] font-bold">
                          {notif.ruang}
                        </span>
                      )}
                      {notif.hari && notif.jam && (
                        <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 rounded text-[9px] font-bold">
                          {notif.hari}, {notif.jam}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-300 font-semibold mt-1.5">
                      {formatTime(notif.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 text-center">
              <p className="text-[10px] text-slate-400">
                {notifications.length} total notifikasi · {unreadCount} belum dibaca
              </p>
            </div>
          )}
        </div>
      )}

      {/* Animation keyframes via inline style */}
      <style>{`
        @keyframes notifSlideIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
