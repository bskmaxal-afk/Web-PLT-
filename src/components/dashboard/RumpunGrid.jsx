import {
  Laptop,
  FlaskConical,
  Dna,
  Atom,
  Sprout,
  Pickaxe,
  Cookie,
  Globe,
  ArrowRight
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

/**
 * RumpunGrid — A brand new, ultra-premium glassmorphic card layout.
 * Features dynamic distribution badges, prodi pills, progress indicators, and rich visual interactive cues.
 */
export default function RumpunGrid() {
  const { laboratories } = useContext(AppContext);

  // Dynamic laboratory count helper
  const getLabCount = (rumpunId) => {
    return laboratories.filter((lab) => lab.rumpun === rumpunId).length;
  };

  const rumpunData = [
    {
      id: "tisimat",
      name: "TISIMAT",
      fullName: "Teknologi Informasi, SI, Matematika",
      description: "Kluster riset komputasi sains, rekayasa perangkat lunak, sistem siber, elektro, dan analisis data terintegrasi.",
      icon: Laptop,
      colorClass: "bg-indigo-600",
      textClass: "text-indigo-600",
      glowClass: "group-hover:shadow-indigo-500/20",
      borderClass: "border-indigo-500/20 hover:border-indigo-500",
      hoverBtnClass: "hover:bg-indigo-600 hover:text-white",
      prodis: ["Informatika", "Sistem Informasi", "Matematika", "Elektro"],
      link: "#"
    },
    {
      id: "kimia",
      name: "KIMIA",
      fullName: "Rumpun Kimia",
      description: "Pengujian kimia instrumentasi modern, analisis analitik, kimia lingkungan, dan sintesis senyawa organik.",
      icon: FlaskConical,
      colorClass: "bg-teal-500",
      textClass: "text-teal-600",
      glowClass: "group-hover:shadow-teal-500/20",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
      prodis: ["Kimia Murni", "Pendidikan Kimia"],
      link: "#"
    },
    {
      id: "biologi",
      name: "BIOLOGI",
      fullName: "Rumpun Biologi",
      description: "Eksplorasi bioteknologi modern, mikrobiologi, kultur jaringan tumbuhan, dan analisis biomolekul.",
      icon: Dna,
      colorClass: "bg-emerald-500",
      textClass: "text-emerald-600",
      glowClass: "group-hover:shadow-emerald-500/20",
      borderClass: "border-emerald-500/20 hover:border-emerald-500",
      hoverBtnClass: "hover:bg-emerald-500 hover:text-white",
      prodis: ["Biologi", "Bioteknologi"],
      link: "#"
    },
    {
      id: "fisika",
      name: "FISIKA",
      fullName: "Rumpun Fisika",
      description: "Praktikum fisika dasar, eksperimen material, kalibrasi instrumentasi digital, dan fisika medikal.",
      icon: Atom,
      colorClass: "bg-blue-500",
      textClass: "text-blue-600",
      glowClass: "group-hover:shadow-blue-500/20",
      borderClass: "border-blue-500/20 hover:border-blue-500",
      hoverBtnClass: "hover:bg-blue-500 hover:text-white",
      prodis: ["Fisika Murni", "Geofisika"],
      link: "#"
    },
    {
      id: "agribisnis",
      name: "AGRIBISNIS",
      fullName: "Rumpun Agribisnis",
      description: "Inkubasi bisnis pertanian terpadu, analisis sosial ekonomi pertanian, dan simulasi kelayakan pasar.",
      icon: Sprout,
      colorClass: "bg-amber-500",
      textClass: "text-amber-600",
      glowClass: "group-hover:shadow-amber-500/20",
      borderClass: "border-amber-500/20 hover:border-amber-500",
      hoverBtnClass: "hover:bg-amber-500 hover:text-white",
      prodis: ["Agribisnis", "Agroteknologi"],
      link: "#"
    },
    {
      id: "tambang",
      name: "TAMBANG",
      fullName: "Rumpun Tambang & Geologi",
      description: "Studi mekanika batuan, pengujian mineralogi galian, pemetaan geologi lapangan, dan survei seismik.",
      icon: Pickaxe,
      colorClass: "bg-orange-500",
      textClass: "text-orange-600",
      glowClass: "group-hover:shadow-orange-500/20",
      borderClass: "border-orange-500/20 hover:border-orange-500",
      hoverBtnClass: "hover:bg-orange-500 hover:text-white",
      prodis: ["Teknik Pertambangan", "Teknik Geologi"],
      link: "#"
    },
    {
      id: "pangan",
      name: "PANGAN",
      fullName: "Rumpun Pangan",
      description: "Evaluasi nilai gizi sensoris makanan, proses pengolahan bahan pangan, dan rekayasa pengemasan produk.",
      icon: Cookie,
      colorClass: "bg-rose-500",
      textClass: "text-rose-600",
      glowClass: "group-hover:shadow-rose-500/20",
      borderClass: "border-rose-500/20 hover:border-rose-500",
      hoverBtnClass: "hover:bg-rose-500 hover:text-white",
      prodis: ["Teknologi Pangan"],
      link: "#"
    },
    {
      id: "lingkungan",
      name: "LINGKUNGAN",
      fullName: "Rumpun Lingkungan",
      description: "Analisis pengolahan limbah domestik/industri, rekayasa ekosistem, hidrologi air, dan mitigasi bencana.",
      icon: Globe,
      colorClass: "bg-lime-600",
      textClass: "text-lime-600",
      glowClass: "group-hover:shadow-lime-500/20",
      borderClass: "border-lime-500/20 hover:border-lime-500",
      hoverBtnClass: "hover:bg-lime-600 hover:text-white",
      prodis: ["Teknik Lingkungan"],
      link: "#"
    },
  ];

  const handleSelectRumpun = (rumpun) => {
    if (rumpun.link && rumpun.link !== "#") {
      window.location.href = rumpun.link;
    } else {
      console.log(`Rumpun ${rumpun.name} diklik. Hubungkan ke URL dashboard matisi/rumpun di RumpunGrid.jsx.`);
    }
  };

  const renderCard = (rumpun) => {
    const Icon = rumpun.icon;
    const labCount = getLabCount(rumpun.id);
    const totalLabs = laboratories.length || 1;
    const distributionPercentage = Math.round((labCount / totalLabs) * 100);

    return (
      <div
        key={rumpun.id}
        onClick={() => handleSelectRumpun(rumpun)}
        className={`group bg-white/70 backdrop-blur-md border border-slate-100 hover:border-slate-200/80 rounded-[2.2rem] p-7 shadow-sm hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between min-h-[220px] w-full md:max-w-[310px] hover:-translate-y-2 cursor-pointer ${rumpun.glowClass}`}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top,_var(--tw-gradient-stops)) from-white via-white/40 to-white/0 rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header Row: Icon and Distribution Badge */}
          <div className="flex justify-between items-start w-full">
            <div className={`w-12 h-12 rounded-[1.2rem] ${rumpun.colorClass} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={22} className="stroke-[2.5]" />
            </div>
            
            <div className="bg-slate-50 border border-slate-100 text-[10px] font-extrabold text-slate-500 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{labCount} Lab</span>
            </div>
          </div>

          {/* Info Details */}
          <div className="text-left mt-6">
            <h4 className="font-extrabold text-slate-800 text-[17px] leading-tight mb-1.5 font-display group-hover:text-blue-900 transition-colors">
              {rumpun.name}
            </h4>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-3.5 leading-none">
              {rumpun.fullName}
            </span>
            <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mb-4">
              {rumpun.description}
            </p>
          </div>
        </div>

        {/* Bottom Section: Prodi Pills, Progress Bar, and Action Trigger */}
        <div className="relative z-10 mt-auto space-y-4">
          {/* Prodi pills */}
          <div className="flex flex-wrap gap-1">
            {rumpun.prodis.map((p, i) => (
              <span 
                key={i} 
                className="text-[8px] font-bold bg-slate-50 border border-slate-100 text-slate-500 px-2 py-1 rounded-lg leading-none uppercase tracking-wide shrink-0"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Progress bar and redirection arrow */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center text-[9px] font-extrabold text-slate-400 mb-1 leading-none uppercase tracking-wider">
                <span>Distribusi</span>
                <span className="text-slate-600">{distributionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${rumpun.colorClass} transition-all duration-500`}
                  style={{ width: `${distributionPercentage}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectRumpun(rumpun);
              }}
              className={`w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0 ${rumpun.borderClass} ${rumpun.textClass} ${rumpun.hoverBtnClass} group-hover:translate-x-0.5 shadow-2xs`}
            >
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="mt-14 px-8 flex flex-col items-center">
      {/* Header Info */}
      <div className="text-center mb-10 max-w-xl">
        <span className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-100/50 px-3.5 py-1 rounded-full text-[9px] font-extrabold text-blue-600 uppercase tracking-widest leading-none">
          Directory Rumpun Fakultas
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-display mt-3.5 mb-2">
          Daftar Rumpun Keilmuan
        </h3>
        <p className="text-xs text-slate-400 font-semibold leading-relaxed">
          Silahkan pilih rumpun keilmuan untuk melihat daftar laboratorium, spesifikasi fasilitas, dan layanan akademik terpadu
        </p>
      </div>

      {/* Rumpun Cards Grid */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mb-6">
        {rumpunData.map((rumpun) => renderCard(rumpun))}
      </div>
    </section>
  );
}
