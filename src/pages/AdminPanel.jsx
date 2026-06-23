import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { 
  Lock, Eye, EyeOff, LayoutDashboard, FileText, BarChart2, LogOut,
  Search, Filter, Plus, Edit, Trash2, Info, X, Check, Download, Printer, Calendar, Clock, Award,
  Upload, FileSpreadsheet, FileDown, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function AdminPanel() {
  const { 
    isAdminAuthenticated, 
    setAdminAuthenticated, 
    mySchedules, 
    setMySchedules,
    laboratories,
    addNotification
  } = useContext(AppContext);

  // Auth local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Tab state: "dashboard", "data-penggunaan", "laporan", "buat-jadwal"
  const [activeTab, setActiveTab] = useState("dashboard");

  // Jadwal Kuliah Form States
  const [inputLab, setInputLab] = useState("");
  const [inputProdi, setInputProdi] = useState("");
  const [inputMatkul, setInputMatkul] = useState("");
  const [inputDosen, setInputDosen] = useState("");
  const [inputTanggal, setInputTanggal] = useState("");
  const [inputJamMulai, setInputJamMulai] = useState("");
  const [inputJamSelesai, setInputJamSelesai] = useState("");

  // Mobile sidebar visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // States for Import Excel/CSV
  const getMondayOfCurrentWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    const y = monday.getFullYear();
    const m = String(monday.getMonth() + 1).padStart(2, "0");
    const d = String(monday.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const [importedSchedules, setImportedSchedules] = useState([]);
  const [importFileName, setImportFileName] = useState("");
  const [importError, setImportError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [importWeekStartDate, setImportWeekStartDate] = useState(getMondayOfCurrentWeek());
  const [importDefaultLab, setImportDefaultLab] = useState("");

  // Dropdown options
  const listHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const listProdi = ["Teknik Informatika", "Sistem Informasi", "Matematika", "Sains Data", "Fisika", "Biologi"];

  // Search, Filter states for Data Penggunaan
  const [searchQuery, setSearchQuery] = useState("");
  const [filterHari, setFilterHari] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Laporan Date Range States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Detail Modal State
  const [selectedLog, setSelectedLog] = useState(null);

  // Edit Modal State
  const [editingLog, setEditingLog] = useState(null);
  const [editFormData, setEditFormData] = useState({
    hari: "",
    jam: "",
    dosen: "",
    prodi: "",
    kelas: "",
    matkul: "",
    ruang: "",
    tanggalInput: "",
    mahasiswa: "",
    nim: "",
    numberwa: "",
    jumlahHadir: ""
  });

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";
  const BASE_TODAY = "2026-06-22"; // baseline date for today in the mock system

  // Date math utilities
  const isWithinLastDays = (dateStr, days) => {
    const today = new Date(BASE_TODAY);
    const target = new Date(dateStr);
    const diffTime = today - target;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays < days;
  };

  const isThisMonth = (dateStr) => {
    const today = new Date(BASE_TODAY);
    const target = new Date(dateStr);
    return today.getMonth() === target.getMonth() && today.getFullYear() === target.getFullYear();
  };

  // 1. STATS CALCULATIONS
  const totalUsage = mySchedules.length;
  const usageToday = mySchedules.filter(s => s.tanggalInput === BASE_TODAY).length;
  const usageThisWeek = mySchedules.filter(s => isWithinLastDays(s.tanggalInput, 7)).length;
  const usageThisMonth = mySchedules.filter(s => isThisMonth(s.tanggalInput)).length;

  // Recent bookings for Dashboard tab
  const recentUsage = [...mySchedules].slice(0, 5);

  // Handle Login submission
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setAdminAuthenticated(true);
        setUsername("");
        setPassword("");
      } else {
        setError("Username atau password salah!");
      }
      setIsLoading(false);
    }, 600);
  };

  // Handle Add Schedule (Jadwal Kuliah)
  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!inputLab || !inputProdi || !inputMatkul || !inputDosen || !inputTanggal || !inputJamMulai || !inputJamSelesai) {
      alert("Semua field wajib diisi!");
      return;
    }

    // 1. Calculate day name in Indonesian
    const dateObj = new Date(inputTanggal);
    const daysIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayName = daysIndo[dateObj.getDay()];

    // 2. Format time
    const timeFormatted = `${inputJamMulai} - ${inputJamSelesai}`;

    // 3. Create schedule object
    const newSchedule = {
      id: Date.now(),
      hari: dayName,
      jam: timeFormatted,
      dosen: inputDosen,
      prodi: inputProdi,
      kelas: "-",
      matkul: inputMatkul,
      ruang: inputLab,
      tanggalInput: inputTanggal,
      mahasiswa: "Admin (Penjadwalan)",
      nim: "-",
      numberwa: "-",
      jumlahHadir: 0
    };

    setMySchedules([newSchedule, ...mySchedules]);
    alert("Jadwal Kuliah berhasil dibuat!");

    // Reset form states
    setInputLab("");
    setInputProdi("");
    setInputMatkul("");
    setInputDosen("");
    setInputTanggal("");
    setInputJamMulai("");
    setInputJamSelesai("");

    // Redirect to Data Penggunaan (History log)
    setActiveTab("data-penggunaan");
  };

  // Handle Logout
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari Panel Admin?")) {
      setAdminAuthenticated(false);
      setActiveTab("dashboard");
    }
  };

  // Delete Log
  const handleDeleteLog = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data log ini?")) {
      setMySchedules(mySchedules.filter(s => s.id !== id));
      alert("Data berhasil dihapus.");
    }
  };

  // Approve booking (Terima) - adds notification to student
  const handleApprove = (log) => {
    setMySchedules(mySchedules.map(s =>
      s.id === log.id ? { ...s, status: "diterima" } : s
    ));
    addNotification({
      type: "diterima",
      title: "Pemesanan Laboratorium Diterima! ✅",
      message: `Halo ${log.mahasiswa || "Mahasiswa"}! Pemesanan ${log.ruang} untuk mata kuliah "${log.matkul}" pada ${log.hari}, ${log.jam} telah DITERIMA oleh admin. Selamat menggunakan laboratorium!`,
      mahasiswa: log.mahasiswa,
      nim: log.nim,
      ruang: log.ruang,
      matkul: log.matkul,
      hari: log.hari,
      jam: log.jam,
    });
    alert(`✅ Pemesanan ${log.mahasiswa || "mahasiswa"} berhasil DITERIMA. Notifikasi telah dikirim.`);
  };

  // Reject booking (Tolak) - adds notification to student
  const handleReject = (log) => {
    const alasan = prompt(`Masukkan alasan penolakan untuk ${log.mahasiswa || "mahasiswa"} (opsional):`) ?? "";
    setMySchedules(mySchedules.map(s =>
      s.id === log.id ? { ...s, status: "ditolak" } : s
    ));
    addNotification({
      type: "ditolak",
      title: "Pemesanan Laboratorium Ditolak ❌",
      message: `Halo ${log.mahasiswa || "Mahasiswa"}! Mohon maaf, pemesanan ${log.ruang} untuk mata kuliah "${log.matkul}" pada ${log.hari}, ${log.jam} telah DITOLAK oleh admin.${alasan ? ` Alasan: ${alasan}` : ""} Silakan hubungi admin untuk informasi lebih lanjut.`,
      mahasiswa: log.mahasiswa,
      nim: log.nim,
      ruang: log.ruang,
      matkul: log.matkul,
      hari: log.hari,
      jam: log.jam,
      alasan: alasan || "",
    });
    alert(`❌ Pemesanan ${log.mahasiswa || "mahasiswa"} berhasil DITOLAK. Notifikasi telah dikirim.`);
  };

  // Open Edit Modal
  const openEditModal = (log) => {
    setEditingLog(log);
    setEditFormData({
      hari: log.hari || "",
      jam: log.jam || "",
      dosen: log.dosen || "",
      prodi: log.prodi || "",
      kelas: log.kelas || "",
      matkul: log.matkul || "",
      ruang: log.ruang || "",
      tanggalInput: log.tanggalInput || "",
      mahasiswa: log.mahasiswa || "",
      nim: log.nim || "",
      numberwa: log.numberwa || "",
      jumlahHadir: log.jumlahHadir || ""
    });
  };

  // Handle Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setMySchedules(
      mySchedules.map(log => log.id === editingLog.id ? { 
        ...log, 
        ...editFormData,
        jumlahHadir: parseInt(editFormData.jumlahHadir, 10) || 0
      } : log)
    );
    setEditingLog(null);
    alert("Data berhasil diperbarui.");
  };

  // Data Penggunaan Filtered Output
  const filteredUsage = mySchedules.filter((log) => {
    const matchesSearch = 
      log.dosen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.matkul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.kelas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.mahasiswa && log.mahasiswa.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.nim && log.nim.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesHari = filterHari ? log.hari === filterHari : true;
    const matchesProdi = filterProdi ? log.prodi === filterProdi : true;

    return matchesSearch && matchesHari && matchesProdi;
  });

  // Data Penggunaan Pagination
  const totalPages = Math.ceil(filteredUsage.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsage.slice(indexOfFirstItem, indexOfLastItem);

  // Laporan Filtered Output
  const reportFilteredUsage = mySchedules.filter((log) => {
    if (!startDate && !endDate) return true;
    const logDate = new Date(log.tanggalInput);
    
    if (startDate && !endDate) {
      return logDate >= new Date(startDate);
    }
    if (!startDate && endDate) {
      return logDate <= new Date(endDate);
    }
    return logDate >= new Date(startDate) && logDate <= new Date(endDate);
  });

  // Export Report to Excel (.xlsx) using SheetJS
  const exportExcel = () => {
    if (reportFilteredUsage.length === 0) {
      alert("Tidak ada data untuk diekspor!");
      return;
    }
    const headers = ["Hari", "Jam", "Nama Dosen", "Prodi", "Kelas", "Mata Kuliah", "Laboratorium", "Tanggal Input", "Nama Mahasiswa", "NIM", "No WA", "Jumlah Hadir"];
    const rows = reportFilteredUsage.map(s => [
      s.hari, 
      s.jam, 
      s.dosen, 
      s.prodi, 
      s.kelas, 
      s.matkul, 
      s.ruang, 
      s.tanggalInput,
      s.mahasiswa || "-",
      s.nim || "-",
      s.numberwa || "-",
      s.jumlahHadir || 0
    ]);
    
    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Auto-fit columns
    const maxCols = headers.length;
    const colWidths = [];
    for (let colIdx = 0; colIdx < maxCols; colIdx++) {
      let maxLen = headers[colIdx].length;
      for (let rowIdx = 0; rowIdx < wsData.length; rowIdx++) {
        const cellValue = wsData[rowIdx][colIdx];
        if (cellValue != null) {
          maxLen = Math.max(maxLen, String(cellValue).length);
        }
      }
      colWidths.push({ wch: maxLen + 3 });
    }
    ws["!cols"] = colWidths;
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan Logbook");
    
    const dateStr = `${startDate || "semua"}_sd_${endDate || "semua"}`;
    XLSX.writeFile(wb, `laporan_logbook_${dateStr}.xlsx`);
  };

  // Export Report to PDF using jsPDF and jspdf-autotable
  const exportPDF = () => {
    if (reportFilteredUsage.length === 0) {
      alert("Tidak ada data untuk diekspor!");
      return;
    }
    
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });
    
    // Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("LAPORAN LOG BOOK PENGGUNAAN LABORATORIUM", 14, 18);
    
    // Subtitle / Date range
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100);
    const dateRangeStr = `Periode: ${startDate || "Semua Tanggal"} s.d. ${endDate || "Sekarang"}`;
    doc.text(dateRangeStr, 14, 24);
    
    const tableHeaders = [
      ["No", "Tanggal", "Hari", "Jam", "Ruang/Lab", "Dosen", "Mata Kuliah", "Prodi / Kelas", "Mahasiswa (PJ)", "NIM", "No WA", "Hadir"]
    ];
    
    const tableRows = reportFilteredUsage.map((s, idx) => [
      idx + 1,
      s.tanggalInput,
      s.hari,
      s.jam,
      s.ruang,
      s.dosen,
      s.matkul,
      `${s.prodi} (${s.kelas})`,
      s.mahasiswa || "-",
      s.nim || "-",
      s.numberwa || "-",
      s.jumlahHadir || 0
    ]);
    
    doc.autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 28,
      theme: "striped",
      headStyles: {
        fillColor: [75, 143, 202], // #4b8fca
        textColor: 255,
        fontSize: 8,
        fontStyle: "bold"
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: 50
      },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 20 },
        2: { cellWidth: 15 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 },
        6: { cellWidth: 35 },
        7: { cellWidth: 30 },
        8: { cellWidth: 30 },
        9: { cellWidth: 20 },
        10: { cellWidth: 25 },
        11: { cellWidth: 12 }
      },
      margin: { top: 28, left: 14, right: 14 },
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.setTextColor(150);
        const str = `Halaman ${doc.internal.getNumberOfPages()}`;
        doc.text(str, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
      }
    });
    
    const dateStr = `${startDate || "semua"}_sd_${endDate || "semua"}`;
    doc.save(`laporan_logbook_${dateStr}.pdf`);
  };

  // Browser print layout trigger
  const printReport = () => {
    window.print();
  };

  // Download Excel Template for importing
  const downloadTemplate = () => {
    const headers = [
      "Hari", 
      "Jam", 
      "Nama Dosen", 
      "Prodi", 
      "Kelas", 
      "Mata Kuliah", 
      "Laboratorium", 
      "Tanggal (YYYY-MM-DD)", 
      "Nama Mahasiswa", 
      "NIM", 
      "No WA", 
      "Jumlah Hadir"
    ];
    
    const sampleRow1 = [
      "Senin", 
      "08:00 - 10:00", 
      "Dr. Budi", 
      "Teknik Informatika", 
      "TI-4A", 
      "Pemrograman Web", 
      "Lab Programming", 
      "2026-06-22", 
      "Ahmad Rizki", 
      "1227050001", 
      "081234567890", 
      "30"
    ];
    
    const sampleRow2 = [
      "Selasa", 
      "13:00 - 15:30", 
      "Dr. Ani", 
      "Sains Data", 
      "SD-2B", 
      "Data Mining", 
      "Lab Data Sains", 
      "2026-06-23", 
      "Siti Nurhaliza", 
      "1227050002", 
      "082198765432", 
      "25"
    ];
    
    const wsData = [headers, sampleRow1, sampleRow2];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    const colWidths = headers.map((h, i) => {
      let maxLen = h.length;
      [sampleRow1, sampleRow2].forEach(row => {
        maxLen = Math.max(maxLen, String(row[i]).length);
      });
      return { wch: maxLen + 3 };
    });
    ws["!cols"] = colWidths;
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "template_import_jadwal.xlsx");
  };

  // Parse Excel / CSV files upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0] || (e.dataTransfer && e.dataTransfer.files[0]);
    if (!file) return;
    
    setImportFileName(file.name);
    setImportError("");
    setImportedSchedules([]);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (rows.length === 0) {
          setImportError("File kosong!");
          return;
        }
        
        // 1. Find the header row (the row containing column names like Hari, Jam, Mata Kuliah, Dosen)
        let headerRowIdx = -1;
        for (let r = 0; r < rows.length; r++) {
          const row = rows[r];
          if (!row || row.length === 0) continue;
          
          const rowStrings = row.map(cell => String(cell || "").toLowerCase().trim());
          const hasHari = rowStrings.some(s => s === "hari");
          const hasJam = rowStrings.some(s => s === "jam" || s === "waktu");
          const hasMatkul = rowStrings.some(s => s.includes("matkul") || s.includes("mata kuliah") || s.includes("matakuliah"));
          
          if (hasHari && (hasJam || hasMatkul)) {
            headerRowIdx = r;
            break;
          }
        }
        
        if (headerRowIdx === -1) {
          setImportError("Format berkas tidak sesuai. Pastikan ada baris kepala tabel dengan kolom 'Hari' dan 'Jam' atau 'Mata Kuliah'.");
          return;
        }
        
        const headers = rows[headerRowIdx].map(h => String(h || "").trim().toLowerCase());
        const dataRows = rows.slice(headerRowIdx + 1);
        
        const getColIdx = (aliases) => {
          return headers.findIndex(h => aliases.some(alias => h.includes(alias)));
        };
        
        const indices = {
          hari: getColIdx(["hari"]),
          jam: getColIdx(["jam", "waktu"]),
          dosen: getColIdx(["dosen", "pengampu", "nama dosen"]),
          prodi: getColIdx(["prodi", "program studi", "jurusan"]),
          kelas: getColIdx(["kelas"]),
          matkul: getColIdx(["mata kuliah", "matkul", "matakuliah"]),
          ruang: getColIdx(["laboratorium", "ruangan", "ruang", "lab"]),
          tanggalInput: getColIdx(["tanggal"]),
          mahasiswa: getColIdx(["mahasiswa", "penanggung jawab", "pj"]),
          nim: getColIdx(["nim"]),
          numberwa: getColIdx(["wa", "whatsapp", "nomor wa", "no hp"]),
          jumlahHadir: getColIdx(["jumlah hadir", "kehadiran", "hadir"])
        };
        
        // 2. Scan rows BEFORE headerRowIdx for the Laboratory name
        let detectedLabName = "";
        for (let r = 0; r < headerRowIdx; r++) {
          const row = rows[r];
          if (!row) continue;
          for (let c = 0; c < row.length; c++) {
            const cellVal = String(row[c] || "");
            if (cellVal.toLowerCase().includes("laboratorium") || cellVal.toLowerCase().includes("lab")) {
              if (cellVal.includes(":")) {
                const parts = cellVal.split(":");
                if (parts.length > 1 && parts[1].trim()) {
                  detectedLabName = parts[1].trim();
                  break;
                }
              } else if (c + 1 < row.length && row[c + 1]) {
                detectedLabName = String(row[c + 1]).trim();
                break;
              }
            }
          }
          if (detectedLabName) break;
        }
        
        // Normalize lab name
        let finalLab = importDefaultLab || "";
        if (detectedLabName) {
          const lowerLab = detectedLabName.toLowerCase();
          const matched = laboratories.find(l => 
            l.name.toLowerCase().includes(lowerLab) || lowerLab.includes(l.name.toLowerCase())
          );
          if (matched) {
            finalLab = matched.name;
          } else {
            finalLab = detectedLabName;
          }
        }
        
        if (!finalLab && laboratories.length > 0) {
          finalLab = laboratories[0].name;
        }
        
        // Helper to get offset date from selected starting date
        const getActualDate = (dayName, startDateStr) => {
          if (!startDateStr) return BASE_TODAY;
          
          const daysMapping = {
            "senin": 0, "monday": 0,
            "selasa": 1, "tuesday": 1,
            "rabu": 2, "wednesday": 2,
            "kamis": 3, "thursday": 3,
            "jumat": 4, "friday": 4,
            "sabtu": 5, "saturday": 5,
            "minggu": 6, "sunday": 6
          };
          
          const normalizedDay = String(dayName).toLowerCase().trim();
          const offset = daysMapping[normalizedDay] ?? 0;
          
          const date = new Date(startDateStr);
          date.setDate(date.getDate() + offset);
          
          const y = date.getFullYear();
          const m = String(date.getMonth() + 1).padStart(2, "0");
          const d = String(date.getDate()).padStart(2, "0");
          return `${y}-${m}-${d}`;
        };
        
        // Helper to normalize time format dot -> colon
        const normalizeTime = (timeStr) => {
          return String(timeStr).replace(/(\d{2})\.(\d{2})/g, "$1:$2").trim();
        };
        
        const parsed = [];
        let lastHari = "Senin";
        
        dataRows.forEach((row, rowIndex) => {
          if (row.length === 0 || row.every(cell => cell == null || cell === "")) return;
          
          const val = (idx, fallback = "-") => {
            if (idx === -1 || idx >= row.length || row[idx] == null) return fallback;
            return String(row[idx]).trim();
          };
          
          let hariVal = val(indices.hari, "").trim();
          if (hariVal) {
            lastHari = hariVal;
          } else {
            hariVal = lastHari;
          }
          
          const jamVal = val(indices.jam, "").trim();
          const matkulVal = val(indices.matkul, "").trim();
          const dosenVal = val(indices.dosen, "").trim();
          
          if (!jamVal || !matkulVal || matkulVal === "-" || jamVal === "-") return;
          if (matkulVal.toLowerCase().includes("koordinator") || matkulVal.toLowerCase().includes("laboran")) return;
          if (dosenVal.toLowerCase().includes("nip.") || dosenVal.toLowerCase().includes("nip ")) return;
          
          let tanggalInput = val(indices.tanggalInput, "");
          if (!tanggalInput) {
            tanggalInput = getActualDate(hariVal, importWeekStartDate);
          } else {
            if (!isNaN(tanggalInput) && Number(tanggalInput) > 30000) {
              const dateObj = new Date((Number(tanggalInput) - 25569) * 86400 * 1000);
              if (dateObj) {
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                tanggalInput = `${year}-${month}-${day}`;
              }
            } else if (tanggalInput.includes("/")) {
              const parts = tanggalInput.split("/");
              if (parts.length === 3) {
                if (parts[2].length === 4) {
                  tanggalInput = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                } else if (parts[0].length === 4) {
                  tanggalInput = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
                }
              }
            }
          }
          
          let prodiVal = val(indices.prodi, "Umum");
          const prodiMapping = {
            "ti": "Teknik Informatika",
            "si": "Sistem Informasi",
            "sd": "Sains Data",
            "mtk": "Matematika",
            "fis": "Fisika",
            "bio": "Biologi"
          };
          const normProdi = prodiVal.toLowerCase().trim();
          if (prodiMapping[normProdi]) {
            prodiVal = prodiMapping[normProdi];
          }
          
          const hadirVal = parseInt(val(indices.jumlahHadir, "0")) || 0;
          
          parsed.push({
            id: Date.now() + rowIndex + Math.floor(Math.random() * 1000),
            hari: hariVal,
            jam: normalizeTime(jamVal),
            dosen: dosenVal || "Dosen Tanpa Nama",
            prodi: prodiVal,
            kelas: val(indices.kelas, "-"),
            matkul: matkulVal,
            ruang: finalLab,
            tanggalInput: tanggalInput,
            mahasiswa: val(indices.mahasiswa, "Admin (Penjadwalan)"),
            nim: val(indices.nim, "-"),
            numberwa: val(indices.numberwa, "-"),
            jumlahHadir: hadirVal
          });
        });
        
        if (parsed.length === 0) {
          setImportError("Tidak ada data jadwal valid yang berhasil dibaca.");
        } else {
          setImportedSchedules(parsed);
        }
      } catch (err) {
        console.error(err);
        setImportError("Gagal memparsing file. Silakan periksa kembali berkas Anda.");
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  // Save imported rows to context schedules state
  const confirmImport = () => {
    if (importedSchedules.length === 0) return;
    
    setMySchedules([...importedSchedules, ...mySchedules]);
    alert(`${importedSchedules.length} Jadwal Kuliah berhasil diimpor otomatis!`);
    setImportedSchedules([]);
    setImportFileName("");
    setActiveTab("data-penggunaan");
  };

  // RENDER LOGIN SCREEN (Logged Out state)
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 transition-all hover:shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-md shadow-blue-500/10"
              style={{ backgroundColor: "#4b8fca" }}
            >
              <Lock size={30} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 font-display">Login Administrator</h2>
            <p className="text-sm text-slate-500 mt-1.5 text-center">
              Aplikasi Log Book Penggunaan Laboratorium. Silakan masuk untuk mengelola data.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white rounded-xl font-bold text-sm shadow-md transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: "#4b8fca" }}
            >
              {isLoading ? "Masuk..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // RENDER ADMIN PANEL (Logged In state)
  return (
    <div className="flex flex-col lg:flex-row min-h-[85vh] bg-slate-50/30 rounded-3xl overflow-hidden border border-slate-100 print:border-none print:bg-white">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "#4b8fca" }}>
            <BarChart2 size={16} />
          </div>
          <span className="font-extrabold text-sm text-slate-800 font-display">Admin LogLab</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 border border-slate-200 rounded-lg text-slate-700 text-xs font-bold"
        >
          Menu
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside 
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between print:hidden shrink-0`}
      >
        <div className="space-y-8">
          {/* Logo Header */}
          <div className="hidden lg:flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/10" style={{ backgroundColor: "#4b8fca" }}>
              <BarChart2 size={20} />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-800 font-display leading-tight">Admin Portal</h2>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Log Book Lab</span>
            </div>
          </div>

          {/* Menus */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setActiveTab("dashboard"); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                activeTab === "dashboard"
                  ? "text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
              style={{ backgroundColor: activeTab === "dashboard" ? "#4b8fca" : "transparent" }}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>

            <button
              onClick={() => { setActiveTab("data-penggunaan"); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                activeTab === "data-penggunaan"
                  ? "text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
              style={{ backgroundColor: activeTab === "data-penggunaan" ? "#4b8fca" : "transparent" }}
            >
              <FileText size={16} />
              Data Penggunaan
            </button>

            <button
              onClick={() => { setActiveTab("laporan"); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                activeTab === "laporan"
                  ? "text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
              style={{ backgroundColor: activeTab === "laporan" ? "#4b8fca" : "transparent" }}
            >
              <BarChart2 size={16} />
              Laporan
            </button>

            <button
              onClick={() => { setActiveTab("buat-jadwal"); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition ${
                activeTab === "buat-jadwal"
                  ? "text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
              style={{ backgroundColor: activeTab === "buat-jadwal" ? "#4b8fca" : "transparent" }}
            >
              <Plus size={16} />
              Buat Jadwal Kuliah
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-8 flex items-center gap-3.5 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <LogOut size={16} />
          Keluar (Logout)
        </button>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto print:p-0">
        
        {/* ==================== TAB: DASHBOARD ==================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 print:hidden">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 font-display">Dashboard Admin</h1>
              <p className="text-xs text-slate-500 mt-1">Gambaran umum log penggunaan laboratorium terbaru.</p>
            </div>

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: "#4b8fca" }}>
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Penggunaan</p>
                  <h3 className="text-xl font-bold text-slate-800 font-display mt-0.5">{totalUsage}</h3>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: "#4bc9bf" }}>
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hari Ini</p>
                  <h3 className="text-xl font-bold text-slate-800 font-display mt-0.5">{usageToday}</h3>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: "#5ea6d6" }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Minggu Ini</p>
                  <h3 className="text-xl font-bold text-slate-800 font-display mt-0.5">{usageThisWeek}</h3>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: "#4b8fca" }}>
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bulan Ini</p>
                  <h3 className="text-xl font-bold text-slate-800 font-display mt-0.5">{usageThisMonth}</h3>
                </div>
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-800 font-display">Aktivitas Terbaru</h2>
                <p className="text-[11px] text-slate-400 font-medium">Penggunaan laboratorium teranyar yang tercatat di sistem.</p>
              </div>

              <div className="divide-y divide-slate-100">
                {recentUsage.length > 0 ? (
                  recentUsage.map((log) => (
                    <div key={log.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#4bc9bf" }}></div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {log.dosen} <span className="text-slate-400 font-normal">menggunakan</span> {log.ruang}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                            Matkul: {log.matkul} | Kelas: {log.kelas} | P.J. Mhs: {log.mahasiswa || "-"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-50 text-slate-400 px-2 py-1 rounded font-bold uppercase">
                        {log.hari}, {log.jam}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="py-6 text-center text-xs text-slate-400 font-semibold">Belum ada aktivitas penggunaan laboratorium.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: DATA PENGGUNAAN ==================== */}
        {activeTab === "data-penggunaan" && (
          <div className="space-y-6 print:hidden">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 font-display">Data Penggunaan Laboratorium</h1>
              <p className="text-xs text-slate-500 mt-1">Daftar lengkap seluruh log pencatatan penggunaan laboratorium.</p>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Cari Dosen, Matkul, Mhs, NIM..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={12} className="text-slate-400 shrink-0" />
                <select
                  value={filterHari}
                  onChange={(e) => {
                    setFilterHari(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white cursor-pointer"
                >
                  <option value="">Semua Hari</option>
                  {listHari.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <select
                value={filterProdi}
                onChange={(e) => {
                  setFilterProdi(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white cursor-pointer"
              >
                <option value="">Semua Prodi</option>
                {listProdi.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left border-collapse text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Waktu & Ruang</th>
                      <th className="px-6 py-4">Dosen & Perkuliahan</th>
                      <th className="px-6 py-4">Mahasiswa (P.J.) & NIM</th>
                      <th className="px-6 py-4">Kontak & Kehadiran</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentItems.length > 0 ? (
                      currentItems.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{log.hari}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Clock size={10} className="text-slate-400" />
                              {log.jam}
                            </div>
                            <div className="text-[10px] text-blue-600 font-bold mt-1 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5 inline-block">
                              {log.ruang}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800 text-sm">{log.dosen}</div>
                            <div className="text-[11px] text-slate-600 mt-0.5 font-medium">{log.matkul}</div>
                            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                              <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 rounded text-[9px] font-bold">
                                {log.prodi}
                              </span>
                              <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded text-[9px] font-mono font-bold">
                                {log.kelas}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{log.mahasiswa || "-"}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.nim || "-"}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-700">{log.numberwa || "-"}</div>
                            <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                              <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded text-[9px] font-bold">
                                {log.jumlahHadir || 0} Orang
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {log.status === "diterima" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[10px] font-bold">
                                <CheckCircle size={11} /> Diterima
                              </span>
                            ) : log.status === "ditolak" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-600 rounded-full text-[10px] font-bold">
                                <XCircle size={11} /> Ditolak
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-[10px] font-bold">
                                <AlertCircle size={11} /> Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                              <button
                                onClick={() => setSelectedLog(log)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                title="Detail Data"
                              >
                                <Info size={14} />
                              </button>
                              <button
                                onClick={() => openEditModal(log)}
                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                                title="Edit Data"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteLog(log.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                title="Hapus Data"
                              >
                                <Trash2 size={14} />
                              </button>
                              {/* Terima/Tolak - only show if not already decided */}
                              {log.status !== "diterima" && (
                                <button
                                  onClick={() => handleApprove(log)}
                                  className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                                  title="Terima Pemesanan"
                                >
                                  <CheckCircle size={14} />
                                </button>
                              )}
                              {log.status !== "ditolak" && (
                                <button
                                  onClick={() => handleReject(log)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                  title="Tolak Pemesanan"
                                >
                                  <XCircle size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-semibold">
                          Tidak ada data penggunaan ditemukan. (Empty State)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-100 p-4 bg-slate-50/50">
                  <span className="text-xs text-slate-500">
                    Menampilkan <strong className="font-semibold text-slate-700">{indexOfFirstItem + 1}</strong> - <strong className="font-semibold text-slate-700">{Math.min(indexOfLastItem, filteredUsage.length)}</strong> dari <strong className="font-semibold text-slate-700">{filteredUsage.length}</strong> data
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-600 disabled:opacity-40 transition cursor-pointer"
                    >
                      Sebelumnya
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                          currentPage === idx + 1
                            ? "text-white shadow-xs"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                        style={{ backgroundColor: currentPage === idx + 1 ? "#4b8fca" : "transparent" }}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-600 disabled:opacity-40 transition cursor-pointer"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB: LAPORAN ==================== */}
        {activeTab === "laporan" && (
          <div className="space-y-6">
            <div className="print:hidden">
              <h1 className="text-2xl font-extrabold text-slate-800 font-display">Laporan Log Book Laboratorium</h1>
              <p className="text-xs text-slate-500 mt-1">Cetak laporan data atau ekspor data ke format spreadsheet Excel.</p>
            </div>

            {/* Filter Date Range (Hidden in print layout) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4 print:hidden">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filter Laporan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2 w-full col-span-1 sm:col-span-2 md:col-span-1">
                  <button
                    onClick={exportExcel}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <FileSpreadsheet size={14} />
                    Excel
                  </button>
                  <button
                    onClick={exportPDF}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <Download size={14} />
                    PDF
                  </button>
                  <button
                    onClick={printReport}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
                    style={{ backgroundColor: "#4b8fca" }}
                  >
                    <Printer size={14} />
                    Cetak
                  </button>
                </div>
              </div>
            </div>

            {/* Print Document Header (Visible only in print layout) */}
            <div className="hidden print:block text-center border-b-2 border-slate-900 pb-5 mb-6">
              <h1 className="text-xl font-bold text-slate-950 font-display">LAPORAN LOG BOOK PENGGUNAAN LABORATORIUM</h1>
              <p className="text-xs text-slate-600 mt-1">
                Laporan tanggal: {startDate || "Awal"} s.d. {endDate || "Sekarang"}
              </p>
            </div>

            {/* Report Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs print:border-none print:shadow-none">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border-collapse text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px] print:bg-white print:border-b-2 print:border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Tanggal Input</th>
                      <th className="px-6 py-4">Waktu & Ruang</th>
                      <th className="px-6 py-4">Dosen & Perkuliahan</th>
                      <th className="px-6 py-4">Mahasiswa (P.J.) & NIM</th>
                      <th className="px-6 py-4">Kontak & Kehadiran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportFilteredUsage.length > 0 ? (
                      reportFilteredUsage.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/50 transition print:break-inside-avoid">
                          <td className="px-6 py-4 font-medium text-slate-700">{log.tanggalInput}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{log.hari}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{log.jam}</div>
                            <div className="text-[10px] text-blue-600 font-semibold mt-1">{log.ruang}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800">{log.dosen}</div>
                            <div className="text-[10px] text-slate-600 mt-0.5">{log.matkul}</div>
                            <div className="text-[9px] text-slate-400 mt-1">{log.prodi} | Kelas {log.kelas}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800">{log.mahasiswa || "-"}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.nim || "-"}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-slate-700">{log.numberwa || "-"}</div>
                            <div className="text-[9px] text-emerald-600 font-bold mt-1">{log.jumlahHadir || 0} Orang</div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-semibold">
                          Tidak ada data log book pada rentang tanggal tersebut.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: BUAT JADWAL KULIAH ==================== */}
        {activeTab === "buat-jadwal" && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 font-display">Buat Jadwal Kuliah</h1>
              <p className="text-xs text-slate-500 mt-1">
                Tambahkan jadwal perkuliahan massal melalui impor file atau isi form entri manual di bawah ini.
              </p>
            </div>

            {/* Grid Layout for Import & Manual Entry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT PANEL: IMPORT MASSAL (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 space-y-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <FileSpreadsheet size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 font-display">Import Massal (Excel/CSV)</h3>
                      <p className="text-[10px] text-slate-400">Impor banyak jadwal sekaligus secara otomatis</p>
                    </div>
                  </div>

                  {/* Template Download Link */}
                  <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between gap-3 border border-slate-100">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-700 block">Belum punya format?</span>
                      <span className="text-[9px] text-slate-400 block">Gunakan template resmi kami</span>
                    </div>
                    <button
                      type="button"
                      onClick={downloadTemplate}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition cursor-pointer"
                    >
                      <FileDown size={12} />
                      Unduh Template
                    </button>
                  </div>

                  {/* Import Configuration (Starting Date & Default Lab) */}
                  <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 block">Pengaturan Impor Jadwal</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Tanggal Awal Minggu (Senin)
                        </label>
                        <input
                          type="date"
                          value={importWeekStartDate}
                          onChange={(e) => setImportWeekStartDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs bg-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Default Lab (Jika tidak di berkas)
                        </label>
                        <select
                          value={importDefaultLab}
                          onChange={(e) => setImportDefaultLab(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-xs bg-white"
                        >
                          <option value="">-- Pilih Laboratorium --</option>
                          {laboratories.map((lab) => (
                            <option key={lab.id} value={lab.name}>
                              {lab.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      handleFileUpload(e);
                    }}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition flex flex-col items-center justify-center gap-2.5 cursor-pointer relative ${
                      isDragOver ? "border-blue-500 bg-blue-50/20" : "border-slate-200 hover:border-slate-300 bg-slate-50/20"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Upload size={22} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-700 block">
                        {importFileName ? importFileName : "Pilih file Excel / CSV"}
                      </span>
                      <span className="text-[9px] text-slate-400 block">
                        Drag & drop berkas Anda di sini, atau klik untuk mencari
                      </span>
                    </div>
                  </div>

                  {/* Import Error Message */}
                  {importError && (
                    <div className="p-3.5 bg-red-50 text-red-700 rounded-2xl text-[10px] font-semibold border-l-4 border-red-500">
                      {importError}
                    </div>
                  )}

                  {/* Preview Section */}
                  {importedSchedules.length > 0 && (
                    <div className="space-y-3.5 pt-3 border-t border-slate-100">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">Total Baris Dideteksi:</span>
                        <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {importedSchedules.length} Jadwal
                        </span>
                      </div>

                      {/* Small preview table */}
                      <div className="border border-slate-100 rounded-xl overflow-hidden max-h-40 overflow-y-auto">
                        <table className="w-full text-left text-[9px] text-slate-500 border-collapse">
                          <thead className="bg-slate-50 text-slate-400 font-bold sticky top-0 border-b border-slate-100">
                            <tr>
                              <th className="p-2">Hari/Tgl</th>
                              <th className="p-2">Matkul</th>
                              <th className="p-2">Ruang</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {importedSchedules.map((s, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-2 font-medium">
                                  {s.hari}, {s.tanggalInput}
                                </td>
                                <td className="p-2 truncate max-w-[100px]" title={s.matkul}>
                                  {s.matkul}
                                </td>
                                <td className="p-2 truncate max-w-[80px]" title={s.ruang}>
                                  {s.ruang}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setImportedSchedules([]);
                            setImportFileName("");
                          }}
                          className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-bold transition cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={confirmImport}
                          className="flex-1 px-4 py-2 text-white rounded-xl text-[10px] font-bold transition cursor-pointer shadow-md"
                          style={{ backgroundColor: "#4bc9bf" }}
                        >
                          Simpan Semua
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT PANEL: FORM ENTRI MANUAL (lg:col-span-7) */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                  {/* Header Banner */}
                  <div className="p-6 text-white flex items-center gap-3" style={{ backgroundColor: "#4b8fca" }}>
                    <div className="p-2 bg-white/10 rounded-xl">
                      <Calendar size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base font-display">Form Entri Jadwal Kuliah</h3>
                      <p className="text-[10px] text-white/80">Silakan lengkapi seluruh kolom di bawah ini</p>
                    </div>
                  </div>

                  {/* Form Content */}
                  <form onSubmit={handleAddSchedule} className="p-6 space-y-5">
                    {/* Lab Apa Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Laboratorium / Ruangan
                      </label>
                      <select
                        required
                        value={inputLab}
                        onChange={(e) => setInputLab(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                      >
                        <option value="">-- Pilih Laboratorium --</option>
                        {laboratories.map((lab) => (
                          <option key={lab.id} value={lab.name}>
                            {lab.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Prodi & Matkul */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Program Studi (Prodi)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Teknik Informatika"
                          value={inputProdi}
                          onChange={(e) => setInputProdi(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Mata Kuliah
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Pemrograman Berorientasi Objek"
                          value={inputMatkul}
                          onChange={(e) => setInputMatkul(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                        />
                      </div>
                    </div>

                    {/* Dosen & Tanggal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Nama Dosen Pengampu
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Dr. Irwan, M.T."
                          value={inputDosen}
                          onChange={(e) => setInputDosen(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Tanggal Pelaksanaan
                        </label>
                        <input
                          type="date"
                          required
                          value={inputTanggal}
                          onChange={(e) => setInputTanggal(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                        />
                      </div>
                    </div>

                    {/* Jam Mulai & Jam Selesai */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Jam Mulai
                        </label>
                        <input
                          type="time"
                          required
                          value={inputJamMulai}
                          onChange={(e) => setInputJamMulai(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Jam Selesai
                        </label>
                        <input
                          type="time"
                          required
                          value={inputJamSelesai}
                          onChange={(e) => setInputJamSelesai(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-sm transition bg-slate-50/50"
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setInputLab("");
                          setInputProdi("");
                          setInputMatkul("");
                          setInputDosen("");
                          setInputTanggal("");
                          setInputJamMulai("");
                          setInputJamSelesai("");
                          setActiveTab("data-penggunaan");
                        }}
                        className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-bold transition text-xs cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 text-white rounded-xl font-bold transition text-xs shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                        style={{ backgroundColor: "#4bc9bf" }}
                      >
                        Buat Jadwal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================== MODAL: DETAIL DATA ==================== */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 text-white flex items-center justify-between" style={{ backgroundColor: "#4b8fca" }}>
              <div className="flex items-center gap-3">
                <Info size={20} />
                <h3 className="font-bold text-base font-display">Detail Penggunaan Laboratorium</h3>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hari</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedLog.hari}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Jam</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedLog.jam}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nama Dosen</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.dosen}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mata Kuliah</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.matkul}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Program Studi</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.prodi}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Kelas</span>
                  <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">{selectedLog.kelas}</span>
                </div>
              </div>

              {/* MAHASISWA FIELDS */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 bg-slate-50/50 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nama Penanggung Jawab Mhs</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.mahasiswa || "-"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">NIM</span>
                  <span className="font-mono font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.nim || "-"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">No WhatsApp</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.numberwa || "-"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Jumlah Hadir</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.jumlahHadir || "-"} Orang</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Laboratorium</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.ruang || "-"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tanggal Input</span>
                  <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{selectedLog.tanggalInput}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-bold transition text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: EDIT DATA ==================== */}
      {editingLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8">
            {/* Header */}
            <div className="p-6 text-white flex items-center justify-between" style={{ backgroundColor: "#4b8fca" }}>
              <div className="flex items-center gap-3">
                <Edit size={20} />
                <h3 className="font-bold text-base font-display">Edit Penggunaan Laboratorium</h3>
              </div>
              <button 
                onClick={() => setEditingLog(null)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4 text-xs max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari</label>
                    <select
                      value={editFormData.hari}
                      onChange={(e) => setEditFormData({ ...editFormData, hari: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                    >
                      {listHari.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jam</label>
                    <input
                      type="time"
                      value={editFormData.jam}
                      onChange={(e) => setEditFormData({ ...editFormData, jam: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Dosen</label>
                  <input
                    type="text"
                    value={editFormData.dosen}
                    onChange={(e) => setEditFormData({ ...editFormData, dosen: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Prodi</label>
                    <select
                      value={editFormData.prodi}
                      onChange={(e) => setEditFormData({ ...editFormData, prodi: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                    >
                      {listProdi.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kelas</label>
                    <input
                      type="text"
                      value={editFormData.kelas}
                      onChange={(e) => setEditFormData({ ...editFormData, kelas: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                  />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mata Kuliah</label>
                  <input
                    type="text"
                    value={editFormData.matkul}
                    onChange={(e) => setEditFormData({ ...editFormData, matkul: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Mahasiswa</label>
                    <input
                      type="text"
                      value={editFormData.mahasiswa}
                      onChange={(e) => setEditFormData({ ...editFormData, mahasiswa: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIM</label>
                    <input
                      type="text"
                      value={editFormData.nim}
                      onChange={(e) => setEditFormData({ ...editFormData, nim: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No WhatsApp</label>
                    <input
                      type="text"
                      value={editFormData.numberwa}
                      onChange={(e) => setEditFormData({ ...editFormData, numberwa: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jumlah Hadir</label>
                    <input
                      type="number"
                      value={editFormData.jumlahHadir}
                      onChange={(e) => setEditFormData({ ...editFormData, jumlahHadir: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Input</label>
                  <input
                    type="date"
                    value={editFormData.tanggalInput}
                    onChange={(e) => setEditFormData({ ...editFormData, tanggalInput: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLog(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-bold transition text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-xl font-bold transition text-xs shadow-md cursor-pointer"
                  style={{ backgroundColor: "#4bc9bf" }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
