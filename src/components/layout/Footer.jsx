import { Mail } from "lucide-react";
import logoUIN from "../../assets/logoUIN.jpg";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white py-6 px-10 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shrink-0">
          <img src={logoUIN} alt="UIN Logo" className="w-7 h-7 object-contain" />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-sm tracking-wide">Lab MaTiSi</h4>
          <p className="text-[10px] text-blue-200/80">Laboratorium Komputer dan Fasilitas Lainnya</p>
        </div>
      </div>

      {/* Center: Copyright */}
      <div className="text-xs text-blue-200/80 font-medium md:translate-x-4">
        © 2025 Lab MaTiSi - All rights reserved.
      </div>

      {/* Right: Social Media */}
      <div className="flex items-center gap-3">
        {/* Inline SVG Facebook */}
        <a
          href="#"
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        {/* Inline SVG Instagram */}
        <a
          href="#"
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        {/* Lucide Mail Icon */}
        <a
          href="#"
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition"
        >
          <Mail size={16} className="stroke-[2.2]" />
        </a>
      </div>
    </footer>
  );
}
