/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { labs } from "../data/labs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [laboratories, setLaboratories] = useState(labs);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mySchedules, setMySchedules] = useState([
    { id: 1, ruang: 'Lab Aplikasi 1', tanggal: '2026-06-15', sesi: 'Sesi 2 (10.00 - 12.00)', status: 'Disetujui', color: 'bg-green-100 text-green-700', keperluan: 'Praktikum Pemrograman Web', jumlahPeserta: 30 },
    { id: 2, ruang: 'Lab Komputasi', tanggal: '2026-06-18', sesi: 'Sesi 4 (15.30 - 17.30)', status: 'Pending', color: 'bg-yellow-100 text-yellow-700', keperluan: 'Penelitian Komputasi Paralel', jumlahPeserta: 20 },
  ]);

  return (
    <AppContext.Provider value={{ laboratories, setLaboratories, isSidebarOpen, setSidebarOpen, mySchedules, setMySchedules }}>
      {children}
    </AppContext.Provider>
  );
};
