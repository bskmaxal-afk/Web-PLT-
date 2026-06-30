import { Share2, Search, Sparkles, Command, Server, CheckCircle2, ThumbsUp, Calendar } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import logoUIN from "../../assets/logoUIN_new.png";
import Swal from "sweetalert2";

/**
 * HeroBanner — A fresh, modern, state-of-the-art split layout header.
 * Features glassmorphic cards, gradient texts, dynamic stats, and a clean search-bar mockup.
 */
export default function HeroBanner() {
  const { laboratories } = useContext(AppContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PLT UIN Jakarta',
        text: 'Akses berbagai ruang laboratorium untuk mendukung kegiatan praktikum, penelitian, dan pembelajaran Anda.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: 'success',
        title: 'Tautan Disalin',
        text: 'Tautan dashboard telah berhasil disalin ke clipboard Anda.',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-3xl p-6',
          title: 'text-sm font-bold text-slate-800'
        }
      });
    }
  };

  return (
    <section className="relative mb-16 mx-8 mt-6">
      {/* Main Container with subtle radial gradient and modern grid lines */}
      <div className="w-full bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden border border-slate-800/80 shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[360px]">
        
        {/* Background Grid Pattern & Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute right-[-10%] top-[-20%] w-[380px] h-[380px] rounded-full bg-blue-600/20 blur-[90px] pointer-events-none"></div>
        <div className="absolute left-[20%] bottom-[-30%] w-[300px] h-[300px] rounded-full bg-teal-500/10 blur-[80px] pointer-events-none"></div>

        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:scale-105 active:scale-95 flex items-center justify-center text-white/90 transition duration-200 cursor-pointer z-20"
          title="Bagikan Tautan"
        >
          <Share2 size={16} />
        </button>

        {/* LEFT SIDE: Heading, Subheading, and Search Box */}
        <div className="flex-1 text-left relative z-10 space-y-6">
          {/* Animated Time Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-300">
            <Sparkles size={13} className="text-teal-400 animate-pulse" />
            <span>{getGreeting()}, Selamat Datang di Portal</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2.5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight">
              PLT <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">UIN Jakarta</span>
            </h1>
            <p className="text-lg md:text-xl font-bold font-display text-slate-300">
              Pusat Laboratorium Terpadu
            </p>
          </div>

          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-lg font-medium">
            Gerbang utama integrasi rumpun keilmuan fakultas. Jelajahi spesifikasi teknis ruangan, profil laboratorium, dan hubungkan langsung dengan dashboard spesifik rumpun Anda.
          </p>

          {/* Premium Search Mockup (Visual Enhancer) */}
          <div className="max-w-md w-full relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl blur-[4px] opacity-10 group-focus-within:opacity-20 transition duration-300"></div>
            <div className="relative flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-slate-400 shadow-inner">
              <Search size={16} className="text-slate-500 mr-3 shrink-0" />
              <input 
                type="text" 
                placeholder="Cari rumpun, laboratorium, atau program studi..." 
                className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-0 cursor-default"
                disabled
              />
              <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 border border-slate-700/50 px-2 py-0.5 rounded-lg text-[9px] font-bold text-slate-400 shrink-0">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Floating Glassmorphic Graphic */}
        <div className="relative w-full lg:w-[380px] flex items-center justify-center shrink-0 z-10 py-6">
          <div className="w-[280px] h-[190px] bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl relative flex flex-col justify-between p-6 transform hover:rotate-1 hover:scale-102 transition duration-300">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 shrink-0">
                <img src={logoUIN} alt="UIN Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>System Online</span>
              </div>
            </div>

            <div className="text-left space-y-1">
              <span className="text-[10px] font-extrabold tracking-widest text-indigo-400 uppercase leading-none">
                UIN Syarif Hidayatullah
              </span>
              <h4 className="text-lg font-black font-display tracking-tight text-white leading-none">
                Homepage PLT
              </h4>
              <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                Sains, Teknologi, dan Inovasi Akademik
              </p>
            </div>
          </div>

          {/* Smaller floating card behind */}
          <div className="absolute top-0 right-4 w-[160px] h-[90px] bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl -z-10 transform -rotate-6 translate-y-[-10px] opacity-80 flex items-center justify-center p-4">
            <div className="flex items-center gap-2 text-white text-left">
              <Server size={18} className="text-teal-300" />
              <div>
                <div className="text-xs font-extrabold font-display">Cluster V1</div>
                <div className="text-[8px] font-bold text-blue-100">Portal Terpadu</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Statistics overlay section */}
      <div className="w-[90%] md:w-auto md:absolute md:-bottom-8 md:left-[50%] md:transform md:-translate-x-[50%] bg-white/95 backdrop-blur-md shadow-xl border border-slate-100 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 z-20 mt-4 md:mt-0 mx-auto max-w-3xl">
        {/* Stat Item 1 */}
        <div className="flex items-center gap-3.5 px-2">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-100/50">
            <CheckCircle2 size={22} className="stroke-[2]" />
          </div>
          <div className="text-left">
            <div className="text-lg font-black text-slate-800 leading-none">{laboratories.length}</div>
            <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Total Lab Aktif</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-[1px] bg-slate-200/80"></div>

        {/* Stat Item 2 */}
        <div className="flex items-center gap-3.5 px-2">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-100/50">
            <Calendar size={20} className="stroke-[2]" />
          </div>
          <div className="text-left">
            <div className="text-lg font-black text-slate-800 leading-none">8</div>
            <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Rumpun Fakultas</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-[1px] bg-slate-200/80"></div>

        {/* Stat Item 3 */}
        <div className="flex items-center gap-3.5 px-2">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-sm shadow-purple-100/50">
            <ThumbsUp size={18} className="stroke-[2]" />
          </div>
          <div className="text-left">
            <div className="text-lg font-black text-slate-800 leading-none">98%</div>
            <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Indeks Kepuasan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
