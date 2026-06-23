import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Shield, Cpu, Clock, Users, ArrowUpRight } from "lucide-react";
import logoUIN from "../assets/logoUIN.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-500 selection:text-white font-sans">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center bg-white">
              <img src={logoUIN} alt="UIN Logo" className="w-7 h-7 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 tracking-tight text-sm sm:text-base">Lab MaTiSi</span>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">UIN Sunan Gunung Djati</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#fitur" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Fitur Utama</a>
            <a href="#statistik" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Statistik</a>
            <Link to="/laboratories" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Daftar Lab</Link>
            <Link to="/guide" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">Panduan</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/10"
            >
              Masuk Dashboard
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-400/10 blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Portal Resmi Laboratorium
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Optimalisasi Praktikum & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Riset Digital</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Selamat datang di **Sistem Informasi & Peminjaman Laboratorium Komputer MaTiSi**. Platform modern terintegrasi untuk mempermudah pemesanan ruang, melihat jadwal, dan mengakses fasilitas praktikum bagi prodi Matematika, Teknik Informatika, dan Sistem Informasi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl text-base font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-98 transition-all"
                >
                  Buka Dashboard Utama
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/guide"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-2xl text-base font-bold hover:bg-slate-50 hover:text-slate-900 active:scale-98 transition-all"
                >
                  <BookOpen size={18} className="text-slate-500" />
                  Panduan Penggunaan
                </Link>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-500 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-blue-500" />
                  <span>Untuk Mahasiswa & Dosen</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-1.5">
                  <Shield size={16} className="text-emerald-500" />
                  <span>Aman & Terverifikasi</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-xl opacity-20 animate-pulse"></div>
                
                {/* Visual Card Stack */}
                <div className="relative bg-white border border-slate-100 rounded-[2rem] p-6 shadow-2xl space-y-6">
                  {/* Card Header (Simulated System Interface) */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                      <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase bg-slate-50 px-2 py-0.5 rounded-md">Status Ruangan</span>
                  </div>

                  {/* Simulated Lab Item */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:scale-[1.02] transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          L1
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Lab Aplikasi 1</h4>
                          <p className="text-[10px] text-slate-400">Teknik Informatika</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Tersedia</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:scale-[1.02] transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                          DS
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Lab Data Sains</h4>
                          <p className="text-[10px] text-slate-400">Sains Data</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Tersedia</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:scale-[1.02] transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                          MM
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Lab Multimedia</h4>
                          <p className="text-[10px] text-slate-400">Sistem Informasi</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">Sedang Dipakai</span>
                    </div>
                  </div>

                  {/* Simple Call to Booking */}
                  <Link 
                    to="/booking"
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition active:scale-95"
                  >
                    <span>Ajukan Pemesanan Sekarang</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                {/* Overlapping badge */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-105 transition max-w-[200px]">
                  <div className="p-2.5 bg-white/10 rounded-xl">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold leading-none">100%</div>
                    <div className="text-[10px] text-blue-100 font-medium mt-0.5">Pemesanan Online Teratur</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20 bg-slate-100/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Fitur Portal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Kemudahan Manajemen Laboratorium</h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Nikmati fasilitas terintegrasi yang didesain khusus untuk mendukung kelancaran kegiatan belajar mengajar dan praktikum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Calendar size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Pemesanan Online</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Pesan ruang laboratorium secara mandiri dengan mengisi formulir secara digital tanpa birokrasi berbelit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Cpu size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Informasi Fasilitas</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Lihat kapasitas ruangan, spesifikasi komputer (hardware), dan software pendukung yang tersedia pada setiap lab.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Clock size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Jadwal Real-Time</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Pantau ketersediaan slot kosong dan riwayat pemesanan yang sedang berjalan secara langsung dan akurat.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <Shield size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Akses Terkontrol</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Manajemen admin yang aman untuk memverifikasi pemesanan, mengontrol data pengguna, serta mengelola riwayat praktikum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="statistik" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            {/* Background design accents */}
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center">
              <div className="space-y-2">
                <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold block">Total Fasilitas</span>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">15+ Ruangan</div>
                <p className="text-slate-400 text-xs sm:text-sm max-w-[200px] mx-auto">Laboratorium Komputer & Studio yang Tersebar</p>
              </div>

              <div className="space-y-2 md:border-l md:border-r md:border-slate-800">
                <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold block">Pengguna Aktif</span>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">120+ Mahasiswa</div>
                <p className="text-slate-400 text-xs sm:text-sm max-w-[200px] mx-auto">Menggunakan fasilitas setiap hari aktif akademis</p>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold block">Tingkat Kepuasan</span>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">98% Rating</div>
                <p className="text-slate-400 text-xs sm:text-sm max-w-[200px] mx-auto">Tingkat kepuasan mahasiswa & dosen pengguna lab</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Siap Memulai Kegiatan Praktikum Anda?</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Akses dashboard sekarang untuk melihat ketersediaan slot laboratorium komputer secara langsung atau ajukan pemesanan ruang dalam beberapa menit saja.
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl text-base font-bold hover:bg-slate-50 transition active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Masuk Dashboard Utama
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 flex items-center justify-center bg-white p-0.5">
              <img src={logoUIN} alt="UIN Logo" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-sm block">Lab MaTiSi</span>
              <span className="text-[10px] text-slate-500 font-medium">Universitas Islam Negeri</span>
            </div>
          </div>

          <div className="text-xs text-center md:text-right space-y-1">
            <p>© 2026 Lab MaTiSi - All rights reserved.</p>
            <p className="text-slate-600">Sistem Informasi Manajemen & Peminjaman Laboratorium Komputer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
