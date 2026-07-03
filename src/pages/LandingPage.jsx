import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Users, 
  Microscope, 
  BookOpen, 
  HelpCircle, 
  FlaskConical, 
  ArrowRight
} from "lucide-react";
import logoUIN from "../assets/logoUIN_new.png";
import logoSimpul from "../assets/logoSimpul.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* BACKGROUND ELEMENTS */}
      
      {/* Right Background Waves Ribbon */}
      <svg 
        className="absolute right-0 top-0 h-full w-[65vw] pointer-events-none -z-10 hidden md:block" 
        viewBox="0 0 1000 1000" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="80%" stopColor="#60a5fa" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <pattern id="dot-grid-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="#3b82f6" fillOpacity="0.25" />
          </pattern>
        </defs>
        
        {/* Wave ribbons */}
        <path d="M1000,0 C850,150 700,200 600,380 C500,560 550,720 850,900 C920,940 960,970 1000,1000" stroke="url(#wave-gradient-1)" strokeWidth="2.5" />
        <path d="M1000,50 C870,190 730,230 630,400 C530,570 580,740 870,910 C930,945 970,975 1000,1000" stroke="url(#wave-gradient-1)" strokeWidth="1.5" />
        <path d="M1000,-50 C830,110 670,170 570,360 C470,550 520,700 830,890 C910,935 950,965 1000,1000" stroke="url(#wave-gradient-1)" strokeWidth="1" />
        
        <path d="M1000,150 C900,260 800,300 720,440 C640,580 660,700 880,880 C930,920 970,960 1000,1000" stroke="url(#wave-gradient-2)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M1000,200 C920,300 830,340 750,470 C670,600 690,720 900,890 C945,925 975,965 1000,1000" stroke="url(#wave-gradient-2)" strokeWidth="1" />

        {/* Decorative Grid Dots (Top-Right) */}
        <rect x="680" y="120" width="216" height="96" fill="url(#dot-grid-pattern)" />
      </svg>
      
      {/* Bottom Left Background Waves */}
      <svg 
        className="absolute left-0 bottom-0 h-[45vh] w-[40vw] pointer-events-none -z-10 hidden md:block" 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,500 C120,420 180,360 160,260 C140,160 60,100 0,0" stroke="#3b82f6" strokeOpacity="0.06" strokeWidth="2" />
        <path d="M0,500 C130,430 195,375 175,270 C155,165 70,105 0,10" stroke="#3b82f6" strokeOpacity="0.04" strokeWidth="1.5" />
        <path d="M0,500 C110,410 165,345 145,250 C125,155 50,95 0,-10" stroke="#3b82f6" strokeOpacity="0.03" strokeWidth="1" />
      </svg>

      {/* Floating subtle background blur circles */}
      <div className="absolute top-[25%] right-[35%] w-4 h-4 rounded-full bg-blue-400/20 blur-xs"></div>
      <div className="absolute top-[40%] right-[22%] w-2.5 h-2.5 rounded-full bg-blue-300/30 blur-2xs"></div>
      <div className="absolute bottom-[35%] left-[28%] w-3.5 h-3.5 rounded-full bg-blue-400/10 blur-xs"></div>

      {/* HEADER / NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-3 md:py-4 flex items-center justify-between z-10">
        {/* Logo and Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0">
            <img src={logoUIN} alt="UIN Logo" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs md:text-sm font-black text-[#0f3484] tracking-wider leading-none uppercase font-display">
              UIN SYARIF HIDAYATULLAH
            </h1>
            <h2 className="text-xs md:text-sm font-black text-[#0f3484] tracking-wider leading-none uppercase font-display mt-0.5">
              JAKARTA
            </h2>
            <div className="mt-0.5">
              <span className="inline-block px-2 py-0.5 bg-[#0f3484] text-white text-[9px] md:text-[10px] font-bold rounded-md">
                2026
              </span>
            </div>
          </div>
        </div>

        {/* Right Help Button */}
        <div>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 hover:border-blue-200 text-[#0f3484] rounded-xl text-xs font-bold bg-white/50 backdrop-blur-xs hover:bg-blue-50/50 transition-all duration-200 active:scale-95 shadow-xs"
          >
            <HelpCircle size={14} className="text-[#0f3484]" />
            <span>Pusat Bantuan</span>
          </Link>
        </div>
      </header>

      {/* MAIN HERO CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center py-4 lg:py-6 space-y-6 z-10">
        
        {/* Hero Title & Description */}
        <div className="max-w-3xl space-y-3">
          <h2 
            className="text-5xl md:text-7xl font-extrabold text-[#0f3484] tracking-wide select-none"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            <img src={logoSimpul} alt="SIMPUL Logo" className="mx-auto h-14 md:h-49 w-auto object-contain" />
          </h2>
          <h3 className="text-base md:text-xl font-extrabold text-[#0d307d] tracking-normal uppercase leading-tight">
            Sistem Manajemen Penggunaan Laboratorium
          </h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-semibold">
            Pusat Laboratorium Terpadu UIN Syarif Hidayatullah Jakarta
          </p>
        </div>

        {/* Features Grid 4 Columns Centered & Compact */}
        <div className="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Feature 1: Terintegrasi */}
          <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:shadow-slate-100/50 transition duration-200 text-left">
            <div className="w-9 h-9 rounded-full bg-[#0f3484] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/10">
              <ShieldCheck size={16} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-[11px] md:text-xs leading-tight mb-0.5">
                Terintegrasi
              </h3>
              <p className="text-slate-400 text-[9px] md:text-[10px]">
                Sistem lab terpadu
              </p>
            </div>
          </div>

          {/* Feature 2: Profesional */}
          <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:shadow-slate-100/50 transition duration-200 text-left">
            <div className="w-9 h-9 rounded-full bg-[#0f3484] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/10">
              <Users size={16} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-[11px] md:text-xs leading-tight mb-0.5">
                Profesional
              </h3>
              <p className="text-slate-400 text-[9px] md:text-[10px]">
                Tenaga ahli kompeten
              </p>
            </div>
          </div>

          {/* Feature 3: Akurat */}
          <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:shadow-slate-100/50 transition duration-200 text-left">
            <div className="w-9 h-9 rounded-full bg-[#0f3484] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/10">
              <Microscope size={16} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-[11px] md:text-xs leading-tight mb-0.5">
                Akurat
              </h3>
              <p className="text-slate-400 text-[9px] md:text-[10px]">
                Peralatan standar
              </p>
            </div>
          </div>

          {/* Feature 4: Melayani */}
          <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:shadow-slate-100/50 transition duration-200 text-left">
            <div className="w-9 h-9 rounded-full bg-[#0f3484] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/10">
              <BookOpen size={16} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-[11px] md:text-xs leading-tight mb-0.5">
                Melayani
              </h3>
              <p className="text-slate-400 text-[9px] md:text-[10px]">
                Riset & masyarakat
              </p>
            </div>
          </div>
        </div>

        {/* Central Entry Access Card - Sleek & Compact */}
        <div className="max-w-sm w-full bg-white rounded-3xl border border-slate-100/80 shadow-md p-5 flex flex-col items-center text-center relative z-10 transition-all duration-300 hover:shadow-lg">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 border border-blue-100/50 shadow-inner">
            <FlaskConical size={18} className="stroke-[1.8] text-blue-600" />
          </div>

          <h3 className="text-xs md:text-sm font-bold text-slate-800 mb-1 font-display">
            Akses Layanan Laboratorium
          </h3>
          
          <p className="text-slate-400 text-[10px] md:text-[11px] leading-relaxed max-w-xs mb-4 font-semibold">
            Masuk untuk melihat daftar laboratorium, informasi layanan, serta melakukan pemesanan dan konsultasi.
          </p>

          <Link
            to="/dashboard"
            className="w-full py-2.5 bg-[#0a48b3] hover:bg-[#0f3484] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98"
          >
            <span>Masuk</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#031d4d] text-white z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left copyright info */}
          <div className="text-center md:text-left space-y-0.5">
            <p className="text-xs md:text-sm font-bold text-slate-100">
              © 2026 UIN Syarif Hidayatullah Jakarta
            </p>
            <p className="text-[10px] md:text-xs text-blue-200/70 font-semibold uppercase tracking-wider">
              Pusat Laboratorium Terpadu (PLT)
            </p>
          </div>

          {/* Center Motto */}
          <div className="flex items-center gap-2 text-center py-1 px-4 border border-white/10 rounded-full bg-white/5">
            {/* Left Star Accent */}
            <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
            <span className="text-[10px] md:text-xs font-semibold italic text-blue-100 tracking-wide">
              Unggul dalam Integrasi Ilmu, Iman dan Peradaban
            </span>
            {/* Right Star Accent */}
            <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          </div>

          {/* Right Socials & URL */}
          <div className="flex items-center gap-4 text-xs font-bold text-blue-200">
            <a 
              href="https://uinjkt.ac.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-150 tracking-wider text-[11px] md:text-xs"
            >
              uinjkt.ac.id
            </a>
            
            <div className="h-4 w-px bg-white/20"></div>

            {/* Social Icons list */}
            <div className="flex items-center gap-2.5">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all duration-150 text-blue-200 hover:text-white"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all duration-150 text-blue-200 hover:text-white"
                title="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <path d="m10 15 5-3-5-3v6z" fill="currentColor" />
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all duration-150 text-blue-200 hover:text-white"
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all duration-150 text-blue-200 hover:text-white"
                title="X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all duration-150 text-blue-200 hover:text-white"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.21-.42-.45-.61-.7v5.13c.03 2.9-.92 5.86-3.1 7.69-2.24 1.88-5.56 2.37-8.25 1.25-2.92-1.2-5.07-4.22-5.18-7.44-.17-3.95 2.76-7.79 6.72-8.3 1.05-.13 2.13-.03 3.17.29v4.14c-1.04-.46-2.27-.47-3.29.12-1.37.78-2.07 2.45-1.76 4.32 1.68 1.97 2.87 3.69 2.64 1.48-.19 2.69-1.37 2.83-2.86.07-1.37.03-2.73.04-4.1V.02z"/>
                </svg>
              </a>
              
              {/* Star Emblem Accent */}
              <div 
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-blue-300"
                title="PLT UIN"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.22 5.22l13.56 13.56M5.22 18.78L18.78 5.22" />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
