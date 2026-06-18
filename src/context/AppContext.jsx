/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from "react";
import { labs } from "../data/labs";
import { isAuthenticated as checkAuth, logoutAdmin } from "../services/authService";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [laboratories, setLaboratories] = useState(labs);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Admin authentication state — initialized from localStorage for persistence
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(() => checkAuth());

  // Selected laboratory from card click (TUGAS 2)
  const [selectedLaboratory, setSelectedLaboratory] = useState(null);

  // User schedules / bookings (TUGAS 1 - ported from Dashboard B)
  const [mySchedules, setMySchedules] = useState([
    {
      id: 1,
      namalab: 2,
      ruang: "Lab Aplikasi 1",
      tanggal: "2026-06-15",
      sesi: "Sesi 2 (10.00 - 12.00)",
      status: "Disetujui",
      namaKetua: "Ahmad Rizki",
      numberwa: "081234567890",
      terjadwal: "iya",
      matkul: "Pemrograman Web",
      dosen: "Dr. Budi Santoso",
      jumlahPeserta: 30,
      jamMasuk: "10:00",
      keterangan: "Praktikum Pemrograman Web Lanjutan",
    },
    {
      id: 2,
      namalab: 5,
      ruang: "Lab Komputasi",
      tanggal: "2026-06-18",
      sesi: "Sesi 4 (15.30 - 17.30)",
      status: "Pending",
      namaKetua: "Siti Nurhaliza",
      numberwa: "082198765432",
      terjadwal: "tidak",
      matkul: "",
      dosen: "",
      jumlahPeserta: 20,
      jamMasuk: "15:30",
      keterangan: "Penelitian Komputasi Paralel",
    },
  ]);

  // Sync auth state changes to localStorage
  const handleLogin = useCallback(() => {
    setAdminAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    logoutAdmin();
    setAdminAuthenticated(false);
  }, []);

  // Check auth state on mount and when storage changes (multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "matisi_admin_auth") {
        setAdminAuthenticated(checkAuth());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AppContext.Provider
      value={{
        laboratories,
        setLaboratories,
        isSidebarOpen,
        setSidebarOpen,
        selectedLaboratory,
        setSelectedLaboratory,
        mySchedules,
        setMySchedules,
        isAdminAuthenticated,
        setAdminAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
