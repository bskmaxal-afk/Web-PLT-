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
 * Clicking a card redirects to the rumpun's external dashboard if configured.
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
      fullName: "Teknologi Informasi, Sistem Informasi, Matematika",
      description: "Kluster riset komputasi sains, rekayasa perangkat lunak, sistem siber, dan analisis data terintegrasi.",
      icon: Laptop,
      colorClass: "bg-indigo-600",
      textClass: "text-indigo-600",
      borderClass: "border-indigo-500/20 hover:border-indigo-500",
      hoverBtnClass: "hover:bg-indigo-600 hover:text-white",
      link: "#" // Hubungkan ke URL dashboard matisi (misal: "http://localhost:5173/")
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

    return (
      <div
        key={rumpun.id}
        onClick={() => handleSelectRumpun(rumpun)}
        className="lab-card group"
      >
        {/* Icon */}
        <div className={`lab-icon-container ${rumpun.colorClass}`}>
          <Icon size={22} className="stroke-[2.5]" />
        </div>

        {/* Info */}
        <div className="lab-info">
          <h4 className="lab-name">{rumpun.name}</h4>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 leading-none">
            {rumpun.fullName}
          </span>
          <p className="lab-description mb-4">{rumpun.description}</p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 w-fit mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>{labCount} Laboratorium</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="lab-card-action">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectRumpun(rumpun);
            }}
            className={`lab-action-btn ${rumpun.borderClass} ${rumpun.textClass} ${rumpun.hoverBtnClass}`}
          >
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="labs-section">
      {/* Header Info */}
      <div className="labs-header">
        <span className="labs-section-tag">
          — Pilih Rumpun Fakultas —
        </span>
        <h3 className="labs-section-title">
          Daftar Rumpun Laboratorium
        </h3>
        <p className="labs-section-subtitle">
          Silahkan pilih rumpun keilmuan untuk melihat daftar laboratorium dan melakukan layanan
        </p>
      </div>

      {/* Rumpun Cards Grid */}
      <div className="labs-grid">
        {rumpunData.map((rumpun) => renderCard(rumpun))}
      </div>
    </section>
  );
}
