import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Calendar,
  Search,
  Trash2,
  ChevronDown,
  ChevronUp,
  Users,
  Info,
  Phone,
  BookOpen,
} from "lucide-react";

/**
 * UserSchedule — Displays the user's lab booking schedule.
 * Ported from Dashboard B (MySchedule.jsx) with enhanced field display.
 */
export default function UserSchedule() {
  const { mySchedules, setMySchedules, laboratories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");
  const [expandedId, setExpandedId] = useState(null);

  // Get lab name from ID
  const getLabName = (namalab) => {
    if (typeof namalab === "string") return namalab;
    const lab = laboratories.find((l) => l.id === namalab);
    return lab ? lab.name : `Lab #${namalab}`;
  };

  const handleCancelBooking = (id, ruang) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin membatalkan pemesanan untuk ${ruang}?`
    );
    if (isConfirmed) {
      setMySchedules(mySchedules.filter((item) => item.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter & Search
  const filteredSchedules = mySchedules.filter((item) => {
    const displayName = item.ruang || getLabName(item.namalab);
    const matchesSearch =
      displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.keterangan &&
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.namaKetua &&
        item.namaKetua.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === "Semua") return matchesSearch;
    return item.status === activeTab && matchesSearch;
  });

  const countAll = mySchedules.length;
  const countApproved = mySchedules.filter(
    (s) => s.status === "Disetujui"
  ).length;
  const countPending = mySchedules.filter(
    (s) => s.status === "Pending"
  ).length;

  return (
    <div className="px-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Jadwal Penggunaan Saya
          </h2>
          <p className="text-gray-400 text-xs font-medium mt-1">
            Pantau status pengajuan pemesanan ruang laboratorium Anda.
          </p>
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          {/* Tabs */}
          <div className="flex bg-gray-50 p-1 rounded-xl w-full sm:w-auto">
            {["Semua", "Disetujui", "Pending"].map((tab) => {
              let count = countAll;
              if (tab === "Disetujui") count = countApproved;
              if (tab === "Pending") count = countPending;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari lab, ketua, atau keterangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Schedule list */}
        <div className="space-y-4">
          {filteredSchedules.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
              <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-400 font-semibold text-sm">
                Tidak ada jadwal yang ditemukan
              </p>
            </div>
          ) : (
            filteredSchedules.map((item) => {
              const isExpanded = expandedId === item.id;
              const displayName = item.ruang || getLabName(item.namalab);

              return (
                <div
                  key={item.id}
                  className={`border border-gray-100 rounded-2xl transition duration-200 overflow-hidden ${
                    isExpanded
                      ? "bg-blue-50/5 border-blue-100 shadow-sm"
                      : "bg-gray-50 hover:bg-gray-100/50"
                  }`}
                >
                  {/* Main Row */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800 text-base">
                          {displayName}
                        </h4>
                        <span className="text-gray-300">|</span>
                        <button className="text-[10px] text-blue-600 font-semibold flex items-center gap-0.5 hover:underline bg-transparent border-none cursor-pointer">
                          {isExpanded ? (
                            <>
                              Sembunyikan detail <ChevronUp size={12} />
                            </>
                          ) : (
                            <>
                              Lihat detail <ChevronDown size={12} />
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1.5 font-medium">
                        <span className="flex items-center gap-1">
                          📅 {item.tanggal || item.tanggalKegiatan}
                        </span>
                        {item.jamMasuk && (
                          <span className="flex items-center gap-1">
                            🕒 {item.jamMasuk}
                          </span>
                        )}
                        {item.namaKetua && (
                          <span className="flex items-center gap-1">
                            👤 {item.namaKetua}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          item.status === "Disetujui"
                            ? "bg-green-50 text-green-700 border border-green-200/50"
                            : "bg-yellow-50 text-yellow-700 border border-yellow-200/50"
                        }`}
                      >
                        {item.status}
                      </span>
                      {item.status === "Pending" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelBooking(item.id, displayName);
                          }}
                          className="p-2 rounded-xl text-red-500 hover:text-white hover:bg-red-500 border border-red-100 hover:border-red-500 transition cursor-pointer"
                          title="Batalkan Peminjaman"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-100/50 bg-white/50 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Info
                            size={14}
                            className="text-gray-400 mt-0.5 shrink-0"
                          />
                          <div>
                            <p className="text-gray-400 font-semibold uppercase text-[9px] tracking-wider">
                              Keterangan / Agenda
                            </p>
                            <p className="text-gray-700 font-medium mt-0.5">
                              {item.keterangan ||
                                item.keperluan ||
                                "Tidak ada detail"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users
                            size={14}
                            className="text-gray-400 mt-0.5 shrink-0"
                          />
                          <div>
                            <p className="text-gray-400 font-semibold uppercase text-[9px] tracking-wider">
                              Jumlah Peserta
                            </p>
                            <p className="text-gray-700 font-medium mt-0.5">
                              {item.jumlahPeserta
                                ? `${item.jumlahPeserta} orang`
                                : "Belum ditentukan"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {item.terjadwal && (
                          <div className="flex items-start gap-2">
                            <BookOpen
                              size={14}
                              className="text-gray-400 mt-0.5 shrink-0"
                            />
                            <div>
                              <p className="text-gray-400 font-semibold uppercase text-[9px] tracking-wider">
                                Status Terjadwal
                              </p>
                              <p className="text-gray-700 font-medium mt-0.5">
                                {item.terjadwal === "iya"
                                  ? `Terjadwal — ${item.matkul || "-"} (${item.dosen || "-"})`
                                  : "Insidental / Tidak Terjadwal"}
                              </p>
                            </div>
                          </div>
                        )}
                        {item.numberwa && (
                          <div className="flex items-start gap-2">
                            <Phone
                              size={14}
                              className="text-gray-400 mt-0.5 shrink-0"
                            />
                            <div>
                              <p className="text-gray-400 font-semibold uppercase text-[9px] tracking-wider">
                                WhatsApp Ketua
                              </p>
                              <p className="text-gray-700 font-medium mt-0.5">
                                {item.numberwa}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
