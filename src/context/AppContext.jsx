/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { labs } from "../data/labs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [laboratories, setLaboratories] = useState(labs);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

  // Notifications state (ported from Dashboard B Navbar)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Permohonan booking Lab Aplikasi 1 disetujui oleh admin.",
      time: "10 menit yang lalu",
      read: false,
    },
    {
      id: 2,
      text: "Pengingat: Jadwal praktikum Alpro besok jam 07.30 di Lab Matematika.",
      time: "2 jam yang lalu",
      read: false,
    },
    {
      id: 3,
      text: "Selamat datang di portal pemesanan ruang Lab MaTiSi!",
      time: "1 hari yang lalu",
      read: true,
    },
  ]);

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
        notifications,
        setNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
