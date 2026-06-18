import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getHistory, deleteEntry } from "../services/historyService";
import { labs } from "../data/labs";
import {
  History,
  FileText,
  FileSpreadsheet,
  Search,
  Trash2,
  X,
  AlertTriangle,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

/**
 * Get lab name from namalab ID.
 */
const getLabName = (namalab) => {
  if (typeof namalab === "string") return namalab;
  const lab = labs.find((l) => l.id === namalab);
  return lab ? lab.name : `Lab #${namalab}`;
};

/**
 * Delete Confirmation Modal
 */
function DeleteModal({ isOpen, onClose, onConfirm, isDeleting, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="admin-login-overlay" onClick={onClose}>
      <div
        className="admin-login-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "400px" }}
      >
        <button onClick={onClose} className="admin-login-close-btn">
          <X size={16} />
        </button>

        <div className="admin-login-header">
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "1rem",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              margin: "0 auto 1rem",
              boxShadow: "0 8px 24px rgba(220, 38, 38, 0.3)",
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <h3 className="admin-login-title">Konfirmasi Hapus</h3>
          <p
            className="admin-login-subtitle"
            style={{ marginTop: "8px", lineHeight: "1.6" }}
          >
            Apakah Anda yakin ingin menghapus data pengajuan{" "}
            <strong>{itemName}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <div className="flex gap-3" style={{ marginTop: "0.5rem" }}>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer bg-white"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl border-none text-sm font-semibold text-white transition cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              opacity: isDeleting ? 0.7 : 1,
            }}
          >
            {isDeleting ? (
              <>
                <span className="admin-login-spinner"></span>
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 size={14} />
                Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * UsageHistory — Admin-only page displaying lab booking history from API.
 * Features: search, pagination, delete, export PDF/Excel.
 */
export default function UsageHistory() {
  const { isAdminAuthenticated, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();

  // Data state
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Export state
  const [isExporting, setIsExporting] = useState(null);

  // Notification
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Route guard — redirect if not admin
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate("/");
    }
  }, [isAdminAuthenticated, navigate]);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await getHistory();

    if (result.success) {
      setHistoryData(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchData();
    }
  }, [isAdminAuthenticated, fetchData]);

  // Search filter
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return historyData;

    const term = searchTerm.toLowerCase();
    return historyData.filter((item) => {
      const labName = getLabName(item.namalab).toLowerCase();
      return (
        labName.includes(term) ||
        (item.namaKetua && item.namaKetua.toLowerCase().includes(term)) ||
        (item.numberWa && item.numberWa.toLowerCase().includes(term)) ||
        (item.matkul && item.matkul.toLowerCase().includes(term)) ||
        (item.dosen && item.dosen.toLowerCase().includes(term)) ||
        (item.keterangan && item.keterangan.toLowerCase().includes(term))
      );
    });
  }, [historyData, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Delete handler
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    const result = await deleteEntry(deleteTarget.id);

    if (result.success) {
      setHistoryData((prev) =>
        prev.filter((item) => item.id !== deleteTarget.id)
      );
      showNotification("success", "Data berhasil dihapus.");
    } else {
      showNotification("error", result.message);
    }

    setIsDeleting(false);
    setDeleteTarget(null);
  };

  // Logout handler
  const handleAdminLogout = () => {
    handleLogout();
    navigate("/");
  };

  // Export to PDF using jsPDF + autoTable
  const handleExportPDF = async () => {
    setIsExporting("pdf");

    try {
      const { default: jsPDF } = await import("jspdf");
      await import("jspdf-autotable");

      const doc = new jsPDF("landscape", "mm", "a4");

      // Header
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Riwayat Penggunaan Laboratorium", 14, 20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(
        `Lab MaTiSi — Dicetak: ${new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`,
        14,
        27
      );
      doc.text(`Total: ${filteredData.length} data`, 14, 33);

      // Table
      const tableData = filteredData.map((item, idx) => [
        idx + 1,
        getLabName(item.namalab),
        item.namaKetua || "-",
        item.numberWa || item.numberwa || "-",
        item.Terjadwal || item.terjadwal || "-",
        item.matkul || "-",
        item.dosen || "-",
        item.jumlahPeserta || "-",
        item.jamMasuk || "-",
        item.keterangan || "-",
        item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("id-ID")
          : item.timestamp || "-",
      ]);

      doc.autoTable({
        startY: 38,
        head: [
          [
            "No",
            "Nama Lab",
            "Nama Ketua",
            "No. WA",
            "Terjadwal",
            "Mata Kuliah",
            "Dosen",
            "Peserta",
            "Jam Masuk",
            "Keterangan",
            "Waktu",
          ],
        ],
        body: tableData,
        styles: {
          fontSize: 7,
          cellPadding: 2,
          font: "helvetica",
        },
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: "bold",
          fontSize: 7,
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        margin: { left: 14, right: 14 },
      });

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Lab MaTiSi — Halaman ${i} dari ${pageCount}`,
          14,
          doc.internal.pageSize.height - 10
        );
      }

      doc.save(
        `Riwayat_Penggunaan_Lab_${new Date().toISOString().slice(0, 10)}.pdf`
      );
      showNotification("success", "PDF berhasil diunduh!");
    } catch (err) {
      console.error("Export PDF error:", err);
      showNotification("error", "Gagal mengekspor ke PDF. Silakan coba lagi.");
    }

    setIsExporting(null);
  };

  // Export to Excel using xlsx
  const handleExportExcel = async () => {
    setIsExporting("excel");

    try {
      const XLSX = await import("xlsx");

      const wsData = filteredData.map((item, idx) => ({
        No: idx + 1,
        "Nama Lab": getLabName(item.namalab),
        "Nama Ketua": item.namaKetua || "-",
        "Nomor WA": item.numberWa || item.numberwa || "-",
        Terjadwal: item.Terjadwal || item.terjadwal || "-",
        "Mata Kuliah": item.matkul || "-",
        Dosen: item.dosen || "-",
        "Jumlah Peserta": item.jumlahPeserta || "-",
        "Jam Masuk": item.jamMasuk || "-",
        Keterangan: item.keterangan || "-",
        "Waktu Pengajuan": item.createdAt
          ? new Date(item.createdAt).toLocaleString("id-ID")
          : item.timestamp || "-",
      }));

      const ws = XLSX.utils.json_to_sheet(wsData);

      // Set column widths
      ws["!cols"] = [
        { wch: 5 },
        { wch: 20 },
        { wch: 20 },
        { wch: 16 },
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 12 },
        { wch: 10 },
        { wch: 30 },
        { wch: 20 },
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Riwayat Penggunaan");
      XLSX.writeFile(
        wb,
        `Riwayat_Penggunaan_Lab_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
      showNotification("success", "Excel berhasil diunduh!");
    } catch (err) {
      console.error("Export Excel error:", err);
      showNotification(
        "error",
        "Gagal mengekspor ke Excel. Silakan coba lagi."
      );
    }

    setIsExporting(null);
  };

  // Don't render if not admin
  if (!isAdminAuthenticated) return null;

  return (
    <div className="px-8 max-w-7xl mx-auto">
      {/* Notification */}
      {notification && (
        <div
          className={`mb-4 flex items-center gap-3 px-5 py-4 rounded-2xl border text-sm font-semibold transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
          style={{ animation: "slideUp 0.3s ease-out" }}
        >
          <span>{notification.type === "success" ? "✅" : "❌"}</span>
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto opacity-50 hover:opacity-100 transition cursor-pointer bg-transparent border-none text-current"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header with Export Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Riwayat Penggunaan
              </h2>
              <p className="text-gray-400 text-xs font-medium">
                Data pengajuan peminjaman laboratorium dari backend.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Export Buttons */}
            <button
              onClick={handleExportPDF}
              disabled={
                isExporting === "pdf" || filteredData.length === 0 || isLoading
              }
              className="export-btn export-btn-pdf"
              title="Cetak ke PDF"
            >
              {isExporting === "pdf" ? (
                <span className="export-spinner"></span>
              ) : (
                <FileText size={15} />
              )}
              <span>PDF</span>
            </button>

            <button
              onClick={handleExportExcel}
              disabled={
                isExporting === "excel" ||
                filteredData.length === 0 ||
                isLoading
              }
              className="export-btn export-btn-excel"
              title="Unduh sebagai Excel"
            >
              {isExporting === "excel" ? (
                <span className="export-spinner"></span>
              ) : (
                <FileSpreadsheet size={15} />
              )}
              <span>Excel</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="export-btn"
              style={{
                color: "#3b82f6",
                background: "#eff6ff",
                borderColor: "#bfdbfe",
              }}
              title="Refresh data"
            >
              <RefreshCw
                size={15}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>

            {/* Logout */}
            <button
              onClick={handleAdminLogout}
              className="export-btn"
              style={{
                color: "#64748b",
                background: "#f8fafc",
                borderColor: "#e2e8f0",
              }}
              title="Logout Admin"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative w-full sm:w-80">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, lab, dosen, matkul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-2xl">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw
                size={36}
                className="text-blue-400 animate-spin"
              />
              <p className="text-gray-500 font-semibold text-sm">
                Memuat data riwayat...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center py-16 border-2 border-dashed border-red-100 rounded-2xl bg-red-50/30">
            <div className="flex flex-col items-center gap-3">
              <AlertTriangle size={36} className="text-red-400" />
              <p className="text-red-600 font-semibold text-sm">{error}</p>
              <button
                onClick={fetchData}
                className="mt-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredData.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-2xl">
            <div className="flex flex-col items-center gap-2">
              <Download size={36} className="text-gray-300" />
              <p className="text-gray-400 font-semibold text-sm">
                {searchTerm
                  ? `Tidak ada data yang cocok dengan "${searchTerm}"`
                  : "Belum ada data riwayat penggunaan."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 px-4 py-2 text-xs text-blue-600 bg-blue-50 rounded-lg font-semibold hover:bg-blue-100 transition cursor-pointer"
                >
                  Hapus pencarian
                </button>
              )}
            </div>
          </div>
        )}

        {/* Data Table */}
        {!isLoading && !error && filteredData.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-wider">
                    <th className="p-3">No</th>
                    <th className="p-3">Nama Lab</th>
                    <th className="p-3">Nama Ketua</th>
                    <th className="p-3">No. WA</th>
                    <th className="p-3">Terjadwal</th>
                    <th className="p-3">Mata Kuliah</th>
                    <th className="p-3">Dosen</th>
                    <th className="p-3">Peserta</th>
                    <th className="p-3">Jam Masuk</th>
                    <th className="p-3">Keterangan</th>
                    <th className="p-3">Waktu</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-700 divide-y divide-gray-50">
                  {paginatedData.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-gray-50/50 transition"
                    >
                      <td className="p-3 text-gray-400 font-mono">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="p-3 font-semibold text-gray-800 whitespace-nowrap">
                        {getLabName(item.namalab)}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {item.namaKetua || "-"}
                      </td>
                      <td className="p-3 text-gray-500 whitespace-nowrap">
                        {item.numberWa || item.numberwa || "-"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            (item.Terjadwal || item.terjadwal) === "iya"
                              ? "text-green-700 bg-green-50"
                              : "text-orange-700 bg-orange-50"
                          }`}
                        >
                          {(item.Terjadwal || item.terjadwal) === "iya"
                            ? "Ya"
                            : "Tidak"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">
                        {item.matkul || "-"}
                      </td>
                      <td className="p-3 text-gray-500">
                        {item.dosen || "-"}
                      </td>
                      <td className="p-3 text-center font-semibold">
                        {item.jumlahPeserta || "-"}
                      </td>
                      <td className="p-3 text-gray-500">
                        {item.jamMasuk || "-"}
                      </td>
                      <td
                        className="p-3 text-gray-500 max-w-[180px] truncate"
                        title={item.keterangan}
                      >
                        {item.keterangan || "-"}
                      </td>
                      <td className="p-3 text-gray-400 whitespace-nowrap text-[10px]">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : item.timestamp || "-"}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500 border border-red-100 hover:border-red-500 transition cursor-pointer bg-transparent"
                          title="Hapus data"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination & Info */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 font-medium px-1">
              <span>
                Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}{" "}
                dari {filteredData.length} data
                {searchTerm && ` (filter: "${searchTerm}")`}
              </span>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 5) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (
                        page >= currentPage - 1 &&
                        page <= currentPage + 1
                      )
                        return true;
                      return false;
                    })
                    .map((page, idx, arr) => {
                      // Add ellipsis
                      const showEllipsis =
                        idx > 0 && page - arr[idx - 1] > 1;
                      return (
                        <span key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="px-1 text-gray-300">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`pagination-btn ${
                              currentPage === page
                                ? "pagination-btn-active"
                                : ""
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      );
                    })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        itemName={
          deleteTarget
            ? `${getLabName(deleteTarget.namalab)} — ${deleteTarget.namaKetua || "Unknown"}`
            : ""
        }
      />
    </div>
  );
}
