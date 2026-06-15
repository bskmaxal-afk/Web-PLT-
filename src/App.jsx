import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import DashboardLayout from "./layouts/DashboardLayout";
import HeroBanner from "./components/dashboard/HeroBanner";
import LaboratoryGrid from "./components/dashboard/LaboratoryGrid";

function PlaceholderPage({ title, description }) {
  return (
    <div className="mx-8 p-12 bg-white border border-slate-100 rounded-[2rem] shadow-xs text-center min-h-[400px] flex flex-col justify-center items-center">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-4 font-display">{title}</h2>
      <p className="text-sm text-slate-500 font-semibold max-w-md">{description}</p>
    </div>
  );
}

import React, { useState } from 'react';
import BookingForm from './components/dashboard/BookingForm';
import MySchedule from './components/dashboard/MySchedule';
import ContactSupport from './components/dashboard/ContactSupport';
import History from './components/dashboard/History';

function App() {
  // State untuk menentukan menu mana yang aktif
  const [activeMenu, setActiveMenu] = useState('booking');

  return (
    <div className="flex">
      {/* --- SIDEBAR SIMULASI --- */}
      <div className="w-64 bg-blue-600 text-white p-5 h-screen">
        <button onClick={() => setActiveMenu('booking')} className={`block w-full text-left p-3 rounded ${activeMenu === 'booking' ? 'bg-blue-800' : ''}`}>
          Pemesanan Ruang
        </button>
        <button onClick={() => setActiveMenu('jadwal')} className={`block w-full text-left p-3 rounded ${activeMenu === 'jadwal' ? 'bg-blue-800' : ''}`}>
          Jadwal Saya
        </button>
        <button onClick={() => setActiveMenu('kontak')} className={`block w-full text-left p-3 rounded ${activeMenu === 'kontak' ? 'bg-blue-800' : ''}`}>
          Kontak & Bantuan
        </button>
      </div>

      {/* --- KONTEN UTAMA (Kanan) --- */}
      <div className="flex-1 p-8 bg-gray-50">
        {/* Kondisi untuk ngerun komponen sesuai menu yang diklik */}
        {activeMenu === 'booking' && <BookingForm />}
        {activeMenu === 'jadwal' && <MySchedule />}
        {activeMenu === 'kontak' && <ContactSupport />}
      </div>
    </div>
  );
}

export default App;

function App() {
  return (
    <AppProvider>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <HeroBanner />
                  <LaboratoryGrid />
                </>
              } 
            />
            <Route 
              path="/booking" 
              element={
                <PlaceholderPage 
                  title="Pemesanan Ruang" 
                  description="Formulir dan pengajuan pemesanan ruang laboratorium komputer MaTiSi." 
                />
              } 
            />
            <Route 
              path="/schedule" 
              element={
                <PlaceholderPage 
                  title="Jadwal Saya" 
                  description="Jadwal penggunaan dan praktikum laboratorium komputer yang Anda ikuti." 
                />
              } 
            />
            <Route 
              path="/history" 
              element={
                <PlaceholderPage 
                  title="Riwayat Penggunaan" 
                  description="Riwayat lengkap log pemesanan dan pemakaian laboratorium komputer." 
                />
              } 
            />
            <Route 
              path="/laboratories" 
              element={
                <PlaceholderPage 
                  title="Informasi Laboratorium" 
                  description="Detail fasilitas, perangkat keras, perangkat lunak, dan kapasitas setiap lab komputer." 
                />
              } 
            />
            <Route 
              path="/guide" 
              element={
                <PlaceholderPage 
                  title="Panduan Penggunaan" 
                  description="Buku panduan dan video cara penggunaan dan pemesanan laboratorium komputer." 
                />
              } 
            />
            <Route 
              path="/contact" 
              element={
                <PlaceholderPage 
                  title="Kontak & Bantuan" 
                  description="Hubungi admin laboratorium atau asisten praktikum jika Anda mengalami kendala." 
                />
              } 
            />
          </Routes>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
}

export default App;