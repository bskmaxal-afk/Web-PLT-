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
  const { laboratories, searchQuery, setSearchQuery } = useContext(AppContext);

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
        title: 'FISIKA UIN Jakarta',
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
    <section className="relative mb-10 mx-8 mt-4 animate-fade-in-up">
      {/* Main Container with subtle radial gradient and modern grid lines */}
      <div className="w-full bg-gradient-to-br from-[#0f3484] to-[#0a225c] rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden border border-blue-900/30 shadow-xl flex flex-col gap-8 justify-between min-h-[380px]">
        
        {/* Background Grid Pattern & Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute right-[-10%] top-[-20%] w-[380px] h-[380px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute left-[10%] bottom-[-30%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none"></div>

        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/95 transition duration-200 cursor-pointer hover:scale-105 active:scale-95 z-25"
          title="Bagikan Tautan"
        >
          <Share2 size={14} />
        </button>

        {/* TOP ROW: Content Split */}
        <div className="flex flex-col lg:flex-row gap-8 items-center z-10 w-full">
          {/* LEFT SIDE: Heading, Subheading, and Search Box */}
          <div className="flex-1 text-left space-y-5">
            {/* Animated Time Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-extrabold text-blue-200">
              <Sparkles size={11} className="text-amber-300 animate-pulse" />
              <span>{getGreeting()}, Selamat Datang di Portal</span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-1.5">
              <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight leading-tight">
                PLT <span className="text-blue-200">UIN Jakarta</span>
              </h1>
              <p className="text-sm font-bold font-display text-blue-100/85 tracking-wide">
                Pusat Laboratorium Terpadu UIN Syarif Hidayatullah Jakarta
              </p>
            </div>

            <p className="text-xs text-blue-200/70 leading-relaxed max-w-lg font-medium">
              Akses pintu utama integrasi rumpun keilmuan fakultas. Jelajahi ketersediaan ruang laboratorium, jadwal pembelajaran, dan ajukan pemesanan ruang praktikum secara instan.
            </p>

            {/* Premium Search Box */}
            <div className="max-w-md w-full relative group">
              <div className="relative flex items-center bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-blue-200/70 shadow-inner transition duration-200 hover:border-white/20 focus-within:border-white/30 focus-within:bg-black/30">
                <Search size={14} className="text-blue-300/60 mr-2.5 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari rumpun, program studi, atau laboratorium..." 
                  className="w-full bg-transparent border-none text-[11px] text-white placeholder-blue-200/40 focus:outline-none focus:ring-0"
                />
                <div className="hidden sm:flex items-center gap-1 bg-white/10 border border-white/10 px-1.5 py-0.5 rounded-md text-[8px] font-bold text-blue-200/80 shrink-0">
                  <Command size={8} />
                  <span>K</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Floating Glassmorphic Graphic */}
          <div className="relative w-full lg:w-[320px] flex items-center justify-center shrink-0 py-2">
            <div className="w-[260px] h-[160px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl relative flex flex-col justify-between p-5 transform hover:rotate-1 hover:scale-102 transition duration-300 animate-float">
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-2xl pointer-events-none"></div>

              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-200 shrink-0">
                  <img src={logoUIN} alt="UIN Logo" className="w-6 h-6 object-contain" />
                </div>
                <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-emerald-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>System Active</span>
                </div>
              </div>

              <div className="text-left space-y-0.5">
                <span className="text-[9px] font-extrabold tracking-widest text-blue-300 uppercase leading-none block">
                  UIN Syarif Hidayatullah
                </span>
                <h4 className="text-base font-extrabold font-display tracking-tight text-white leading-none">
                  Homepage Portal Lab
                </h4>
                <p className="text-[9px] text-blue-200/70 leading-normal font-semibold">
                  Sains, Riset, & Inovasi Akademik
                </p>
              </div>
            </div>

            {/* Smaller floating card behind */}
            <div className="absolute top-0 right-6 w-[130px] h-[75px] bg-gradient-to-br from-blue-800 to-indigo-950 border border-white/5 rounded-xl shadow-xl -z-10 transform -rotate-6 translate-y-[-8px] opacity-75 flex items-center justify-center p-3 animate-float-delayed">
              <div className="flex items-center gap-2 text-white text-left">
                <Server size={14} className="text-blue-300 animate-pulse" />
                <div>
                  <div className="text-[10px] font-extrabold font-display leading-none">Cluster V2</div>
                  <div className="text-[8px] font-medium text-blue-200/80 mt-0.5">Live Database</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Integrated Statistics Panel */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-start gap-6 sm:gap-10 z-10 w-full">
          {/* Stat Item 1 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-emerald-300 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div className="text-left">
              <div className="text-sm font-extrabold text-white leading-none">{laboratories.length}</div>
              <div className="text-[8px] text-blue-200/70 font-extrabold mt-1 uppercase tracking-wider">Lab Terdaftar</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-[1px] bg-white/10"></div>

          {/* Stat Item 2 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-blue-200 flex items-center justify-center shrink-0">
              <Calendar size={15} />
            </div>
            <div className="text-left">
              <div className="text-sm font-extrabold text-white leading-none">8</div>
              <div className="text-[8px] text-blue-200/70 font-extrabold mt-1 uppercase tracking-wider">Rumpun Keilmuan</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-[1px] bg-white/10"></div>

          {/* Stat Item 3 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-purple-300 flex items-center justify-center shrink-0">
              <ThumbsUp size={14} />
            </div>
            <div className="text-left">
              <div className="text-sm font-extrabold text-white leading-none">98%</div>
              <div className="text-[8px] text-blue-200/70 font-extrabold mt-1 uppercase tracking-wider">Indeks Kepuasan</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
