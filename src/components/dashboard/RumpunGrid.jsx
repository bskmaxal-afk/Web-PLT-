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
 * RumpunGrid — Displays the 8 Rumpun cards on the main PLT dashboard homepage.
 * Renders dynamic distribution progress bars, prodi tags, and external click redirects.
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
      fullName: "Rumpun TISIMAT",
      description: "Kluster riset komputasi sains, rekayasa perangkat lunak, sistem siber, elektro, dan analisis data terintegrasi.",
      icon: Laptop,
      colorClass: "bg-indigo-600",
      textClass: "text-indigo-600",
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
        className="lab-card group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 hover:border-slate-200"
      >
        <div>
          {/* Header Row: Icon & Action Arrow */}
          <div className="flex justify-between items-start w-full">
            <div className={`lab-icon-container ${rumpun.colorClass} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
              <Icon size={22} className="stroke-[2.5]" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectRumpun(rumpun);
              }}
              className={`w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center transition-all duration-300 ${rumpun.borderClass} ${rumpun.textClass} ${rumpun.hoverBtnClass} group-hover:translate-x-0.5`}
            >
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Info Details */}
          <div className="lab-info mt-5 text-left">
            <h4 className="lab-name text-slate-800 font-extrabold text-[16px] leading-tight mb-1 font-display group-hover:text-blue-900 transition-colors">
              {rumpun.name}
            </h4>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 leading-none">
              {rumpun.fullName}
            </span>
            <p className="lab-description mb-4 text-[11px] text-slate-400 font-semibold leading-relaxed">
              {rumpun.description}
            </p>
          </div>
        </div>

        {/* Bottom Section: Prodi Tags & Progress Bar */}
        <div className="mt-auto space-y-3.5">
          {/* Prodi Tag Badges */}
          <div className="flex flex-wrap gap-1">
            {rumpun.prodis.map((p, i) => (
              <span 
                key={i} 
                className="text-[8px] font-extrabold bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md leading-none uppercase tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Progress Distribution Indicator */}
          <div className="w-full pt-1.5 border-t border-slate-100/50">
            <div className="flex justify-between items-center text-[9px] font-extrabold text-slate-400 mb-1 leading-none uppercase tracking-wider">
              <span>Distribusi Lab</span>
              <span className="text-slate-600">{labCount} Lab ({distributionPercentage}%)</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${rumpun.colorClass} transition-all duration-500`}
                style={{ width: `${distributionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="labs-section">
      {/* Header Info */}
      <div className="labs-header max-w-xl mx-auto">
        <span className="labs-section-tag font-bold text-blue-600/80 bg-blue-50 px-3 py-1 rounded-full text-[9px]">
          — DIKTORAT RUMPUN KEILMUAN —
        </span>
        <h3 className="labs-section-title mt-3">
          Daftar Rumpun Laboratorium
        </h3>
        <p className="labs-section-subtitle">
          Silahkan pilih rumpun keilmuan untuk melihat daftar laboratorium, spesifikasi fasilitas, dan layanan akademik terpadu
        </p>
      </div>

      {/* Rumpun Cards Grid */}
      <div className="labs-grid mt-6">
        {rumpunData.map((rumpun) => renderCard(rumpun))}
      </div>
    </section>
  );
}
