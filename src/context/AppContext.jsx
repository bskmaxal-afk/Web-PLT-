/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { labs } from "../data/labs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [laboratories, setLaboratories] = useState(labs);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Admin authentication state for Riwayat Penggunaan access
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);

  // Selected laboratory from card click (TUGAS 2)
  const [selectedLaboratory, setSelectedLaboratory] = useState(null);

  // Notifications for students (when admin approves/rejects their booking)
  const [notifications, setNotifications] = useState([]);

  // Add a notification
  const addNotification = (notification) => {
    setNotifications(prev => [
      {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        isRead: false,
        ...notification
      },
      ...prev
    ]);
  };

  // Mark notification as read
  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // User logbook schedules / bookings
  const [mySchedules, setMySchedules] = useState([
    {
      id: 1,
      hari: "Senin",
      jam: "08:00",
      dosen: "Dr. Budi",
      prodi: "Teknik Informatika",
      kelas: "TI-4A",
      matkul: "Pemrograman Web",
      ruang: "Lab Programming",
      tanggalInput: "2026-06-22",
      mahasiswa: "Ahmad Rizki",
      nim: "1227050001",
      numberwa: "081234567890",
      jumlahHadir: 30,
      status: "pending"
    },
    {
      id: 2,
      hari: "Senin",
      jam: "10:00",
      dosen: "Dr. Ani",
      prodi: "Sains Data",
      kelas: "SD-2B",
      matkul: "Data Mining",
      ruang: "Lab Data Sains",
      tanggalInput: "2026-06-22",
      mahasiswa: "Siti Nurhaliza",
      nim: "1227050002",
      numberwa: "082198765432",
      jumlahHadir: 25,
      status: "pending"
    },
    {
      id: 3,
      hari: "Selasa",
      jam: "13:00",
      dosen: "Dr. Rina",
      prodi: "Teknik Informatika",
      kelas: "TI-6A",
      matkul: "Multimedia Lanjutan",
      ruang: "Lab Multimedia",
      tanggalInput: "2026-06-21",
      mahasiswa: "Fikri Haikal",
      nim: "1227050003",
      numberwa: "085345678901",
      jumlahHadir: 28,
      status: "diterima"
    },
    {
      id: 4,
      hari: "Rabu",
      jam: "08:30",
      dosen: "Riza Fahlevi, M.T.",
      prodi: "Sistem Informasi",
      kelas: "SI-4A",
      matkul: "Basis Data II",
      ruang: "Lab Sistem Informasi",
      tanggalInput: "2026-06-18",
      mahasiswa: "Dewi Lestari",
      nim: "1227050004",
      numberwa: "089876543210",
      jumlahHadir: 32,
      status: "pending"
    },
    {
      id: 5,
      hari: "Kamis",
      jam: "10:30",
      dosen: "Dr. Irwan Setiawan",
      prodi: "Matematika",
      kelas: "MTK-2A",
      matkul: "Kalkulus",
      ruang: "Lab Matematika",
      tanggalInput: "2026-06-15",
      mahasiswa: "Bagus Prasetyo",
      nim: "1227050005",
      numberwa: "087712345678",
      jumlahHadir: 20,
      status: "ditolak"
    },
    {
      id: 6,
      hari: "Jumat",
      jam: "14:00",
      dosen: "Dian Permata, M.Kom.",
      prodi: "Sistem Informasi",
      kelas: "SI-6B",
      matkul: "E-Commerce",
      ruang: "Lab Sistem Informasi",
      tanggalInput: "2026-06-10",
      mahasiswa: "Putri Amanda",
      nim: "1227050006",
      numberwa: "081398765432",
      jumlahHadir: 35,
      status: "diterima"
    },
    {
      id: 7,
      hari: "Sabtu",
      jam: "09:00",
      dosen: "Hendra Wijaya, M.T.",
      prodi: "Teknik Informatika",
      kelas: "TI-2C",
      matkul: "Jaringan Komputer",
      ruang: "Lab Jaringan Komputer",
      tanggalInput: "2026-06-05",
      mahasiswa: "Rian Hidayat",
      nim: "1227050007",
      numberwa: "081298765432",
      jumlahHadir: 27,
      status: "pending"
    },
    {
      id: 8,
      hari: "Senin",
      jam: "08:00",
      dosen: "Prof. Hermawan",
      prodi: "Teknik Informatika",
      kelas: "TI-4B",
      matkul: "Kecerdasan Buatan",
      ruang: "Lab Programming",
      tanggalInput: "2026-05-25",
      mahasiswa: "Farhan Maulana",
      nim: "1227050008",
      numberwa: "085298765432",
      jumlahHadir: 30,
      status: "diterima"
    },
    {
      id: 9,
      hari: "Selasa",
      jam: "10:00",
      dosen: "Siti Rahma, M.Sc.",
      prodi: "Matematika",
      kelas: "MTK-4B",
      matkul: "Metode Numerik",
      ruang: "Lab Matematika",
      tanggalInput: "2026-05-20",
      mahasiswa: "Annisa Fitriani",
      nim: "1227050009",
      numberwa: "082398765432",
      jumlahHadir: 24,
      status: "pending"
    },
    {
      id: 10,
      hari: "Rabu",
      jam: "13:00",
      dosen: "Dr. Ani",
      prodi: "Sains Data",
      kelas: "SD-4A",
      matkul: "Machine Learning",
      ruang: "Lab Data Sains",
      tanggalInput: "2026-05-15",
      mahasiswa: "Rizky Fauzi",
      nim: "1227050010",
      numberwa: "085798765432",
      jumlahHadir: 22,
      status: "pending"
    }
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
        isAdminAuthenticated,
        setAdminAuthenticated,
        notifications,
        setNotifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
