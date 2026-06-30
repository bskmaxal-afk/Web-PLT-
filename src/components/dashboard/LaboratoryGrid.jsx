import {
  ArrowRight,
  Code,
  Play,
  Server,
  Anvil,
  Beaker,
  Router,
  Clapperboard,
  Computer,
  ChartNoAxesColumn,
  ChartBar,
  Podcast,
  SquareLibrary,
  BookOpenText,
  Syringe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

/**
 * LaboratoryGrid — Displays all 15 lab cards on the dashboard.
 * When a card is clicked, saves the selected lab to context and
 * navigates to the booking form (TUGAS 2).
 */
export default function LaboratoryGrid() {
  const navigate = useNavigate();
  const { setSelectedLaboratory, laboratories } = useContext(AppContext);

  const labsData = [
    {
      id: 1,
      name: "Laboratorium Penelitian Katalis dan Polimer",
      description: "Laboratorium untuk sintesis polimer, karakterisasi katalis, penelitian reaksi kimia, dan pengembangan material baru.",
      icon: "Syringe",
      colorClass: "bg-emerald-500",
      textClass: "text-emerald-600",
      borderClass: "border-emerald-500/20 hover:border-emerald-500",
      hoverBtnClass: "hover:bg-emerald-500 hover:text-white",
    },
    {
      id: 2,
      name: "Laboratorium Penelitian Lingkungan",
      description: "Laboratorium untuk pengujian kualitas air, udara, dan tanah, analisis polutan, serta pengembangan teknologi pengolahan limbah.",
      icon: "sqrt",
      colorClass: "bg-blue-500",
      textClass: "text-blue-600",
      borderClass: "border-blue-500/20 hover:border-blue-500",
      hoverBtnClass: "hover:bg-blue-500 hover:text-white",
    },
    {
      id: 3,
      name: "Ruang Analisis Makanan",
      description: "Laboratorium untuk analisis zat gizi makro dan mikro, pengujian keamanan pangan, dan pengawasan mutu produk pangan.",
      icon: "Beaker",
      colorClass: "bg-teal-500",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 5,
      name: "Ruang Administrasi",
      description: "Pusat layanan administrasi, pengelolaan persuratan, penjadwalan praktikum, dan koordinasi operasional seluruh laboratorium PLT.",
      icon: "server",
      colorClass: "bg-indigo-600",
      textClass: "text-indigo-600",
      borderClass: "border-indigo-500/20 hover:border-indigo-500",
      hoverBtnClass: "hover:bg-indigo-600 hover:text-white",
    },
    {
      id: 8,
      name: "Pusat Inkubator Bisnis",
      description: "Fasilitas kolaboratif untuk inkubasi bisnis mahasiswa, pengembangan startup, mentoring usaha, dan komersialisasi produk riset sains.",
      icon: "Anvil",
      colorClass: "bg-orange-500",
      textClass: "text-orange-600",
      borderClass: "border-orange-500/20 hover:border-orange-500",
      hoverBtnClass: "hover:bg-orange-500 hover:text-white",
    },
    {
      id: 9,
      name: "Laboratorium Uji Material",
      description: "Laboratorium untuk pengujian mekanis material, uji tarik, uji keras, karakterisasi fisik logam, polimer, dan komposit.",
      icon: "Syringe",
      colorClass: "bg-rose-500",
      textClass: "text-rose-600",
      borderClass: "border-rose-500/20 hover:border-rose-500",
      hoverBtnClass: "hover:bg-rose-500 hover:text-white",
    },
    {
      id: 11,
      name: "Laboratorium Geofisika",
      description: "Laboratorium untuk pemodelan data seismik, analisis medan gravitasi, geomagnetik, dan metode geolistrik untuk eksplorasi bumi.",
      icon: "BookOpenText",
      colorClass: "bg-amber-500",
      textClass: "text-amber-600",
      borderClass: "border-amber-500/20 hover:border-amber-500",
      hoverBtnClass: "hover:bg-amber-500 hover:text-white",
    },
    {
      id: 12,
      name: "Laboratorium Fisika Instrumentasi",
      description: "Laboratorium untuk perancangan sistem sensor, akuisisi data, pemrograman mikrokontroler, serta kalibrasi alat ukur elektronik.",
      icon: "Router",
      colorClass: "bg-lime-600",
      textClass: "text-lime-600",
      borderClass: "border-lime-500/20 hover:border-lime-500",
      hoverBtnClass: "hover:bg-lime-600 hover:text-white",
    },
    {
      id: 13,
      name: "Laboratorium Fisika Material & Komputasi",
      description: "Fasilitas riset pemodelan struktur atom, simulasi sifat mekanis/listrik material baru, dan perhitungan fisika zat padat.",
      icon: "Computer",
      colorClass: "bg-sky-500",
      textClass: "text-sky-600",
      borderClass: "border-sky-500/20 hover:border-sky-500",
      hoverBtnClass: "hover:bg-sky-500 hover:text-white",
    },
    {
      id: 14,
      name: "Laboratorium Fisika Dasar",
      description: "Laboratorium untuk praktikum fisika dasar mahasiswa TPB, eksperimen mekanika klasik, kalor, optik, dan listrik magnet.",
      icon: "BookOpenText",
      colorClass: "bg-cyan-500",
      textClass: "text-cyan-600",
      borderClass: "border-cyan-500/20 hover:border-cyan-500",
      hoverBtnClass: "hover:bg-cyan-500 hover:text-white",
    },
    {
      id: 15,
      name: "Laboratorium Fisika Lanjut",
      description: "Laboratorium untuk eksperimen fisika modern, fisika nuklir tingkat dasar, optika koheren, dan efek fotoelektrik.",
      icon: "Anvil",
      colorClass: "bg-violet-500",
      textClass: "text-violet-600",
      borderClass: "border-violet-500/20 hover:border-violet-500",
      hoverBtnClass: "hover:bg-violet-500 hover:text-white",
    },
    {
      id: 16,
      name: "Laboratorium Kimia Analitik",
      description: "Laboratorium untuk pengujian kimia instrumen, analisis kuantitatif kation-anion, dan spektroskopi.",
      icon: "Beaker",
      colorClass: "bg-pink-500",
      textClass: "text-pink-600",
      borderClass: "border-pink-500/20 hover:border-pink-500",
      hoverBtnClass: "hover:bg-pink-500 hover:text-white",
    },
    {
      id: 17,
      name: "Laboratorium Kimia Anorganik",
      description: "Laboratorium untuk praktikum sintesis senyawa koordinasi kompleks logam transisi, karakterisasi padatan, dan kristalografi.",
      icon: "Beaker",
      colorClass: "bg-fuchsia-500",
      textClass: "text-fuchsia-600",
      borderClass: "border-fuchsia-500/20 hover:border-fuchsia-500",
      hoverBtnClass: "hover:bg-fuchsia-500 hover:text-white",
    },
    {
      id: 18,
      name: "Laboratorium Penelitian Kimia Komputasi",
      description: "Fasilitas riset pemodelan molekul organik/anorganik, simulasi docking obat-reseptor, dan perhitungan mekanika kuantum.",
      icon: "Computer",
      colorClass: "bg-purple-500",
      textClass: "text-purple-600",
      borderClass: "border-purple-500/20 hover:border-purple-500",
      hoverBtnClass: "hover:bg-purple-500 hover:text-white",
    },
    {
      id: 19,
      name: "Laboratorium Biokimia",
      description: "Laboratorium untuk analisis biomolekul, fraksionasi protein, uji aktivitas enzim, dan analisis karbohidrat, lipid, & asam nukleat.",
      icon: "Syringe",
      colorClass: "bg-rose-600",
      textClass: "text-rose-600",
      borderClass: "border-rose-500/20 hover:border-rose-500",
      hoverBtnClass: "hover:bg-rose-600 hover:text-white",
    },
    {
      id: 20,
      name: "Laboratorium Kimia Organik",
      description: "Laboratorium untuk praktikum sintesis senyawa organik, distilasi fraksionasi, ekstraksi cair-cair, dan analisis gugus fungsi.",
      icon: "Beaker",
      colorClass: "bg-red-500",
      textClass: "text-red-600",
      borderClass: "border-red-500/20 hover:border-red-500",
      hoverBtnClass: "hover:bg-red-500 hover:text-white",
    },
    {
      id: 21,
      name: "Laboratorium Ekologi",
      description: "Laboratorium untuk analisis sampel lapangan bio-lingkungan, keanekaragaman hayati flora-fauna, dan pemetaan ekosistem darat/perairan.",
      icon: "BookOpenText",
      colorClass: "bg-emerald-600",
      textClass: "text-emerald-700",
      borderClass: "border-emerald-600/20 hover:border-emerald-600",
      hoverBtnClass: "hover:bg-emerald-600 hover:text-white",
    },
    {
      id: 22,
      name: "Laboratorium Biologi Dasar",
      description: "Laboratorium praktikum biologi dasar untuk pengenalan mikroskopi sel tumbuhan/hewan, pengenalan jaringan hidup, dan genetika mendel.",
      icon: "Syringe",
      colorClass: "bg-teal-600",
      textClass: "text-teal-700",
      borderClass: "border-teal-600/20 hover:border-teal-600",
      hoverBtnClass: "hover:bg-teal-600 hover:text-white",
    },
    {
      id: 23,
      name: "Laboratorium Fisiologi",
      description: "Laboratorium untuk studi fisiologi hewan dan tumbuhan, pengukuran laju fotosintesis, respirasi hewan, dan uji hormon tanaman.",
      icon: "Beaker",
      colorClass: "bg-cyan-600",
      textClass: "text-cyan-700",
      borderClass: "border-cyan-600/20 hover:border-cyan-600",
      hoverBtnClass: "hover:bg-cyan-600 hover:text-white",
    },
    {
      id: 24,
      name: "Laboratorium Mikrobiologi",
      description: "Laboratorium steril untuk pembiakan bakteri/jamur, sterilisasi media, pewarnaan gram mikroba, dan uji efikasi antibiotik.",
      icon: "Syringe",
      colorClass: "bg-green-600",
      textClass: "text-green-700",
      borderClass: "border-green-600/20 hover:border-green-600",
      hoverBtnClass: "hover:bg-green-600 hover:text-white",
    },
  ];

  const handleSelectLaboratory = (lab) => {
    // Find the full lab data from context (labs.js) for richer info
    const labFromContext = laboratories.find(
      (l) => l.id === lab.id
    );
    setSelectedLaboratory(labFromContext || { id: lab.id, name: lab.name });
    navigate("/booking");
  };

  const renderIcon = (type) => {
    switch (type) {
      case "sqrt":
        return (
          <span className="text-xl font-bold font-display leading-none select-none">
            √σ
          </span>
        );
      case "code":
        return <Code size={22} className="stroke-[2.5]" />;
      case "play":
        return (
          <Play
            size={20}
            fill="currentColor"
            className="stroke-[2] translate-x-[1px]"
          />
        );
      case "server":
        return <Server size={22} className="stroke-[2.5]" />;
      case "Anvil":
        return <Anvil size={22} className="stroke-[2.5]" />;
      case "Beaker":
        return <Beaker size={22} className="stroke-[2.5]" />;
      case "Router":
        return <Router size={22} className="stroke-[2.5]" />;
      case "Clapperboard":
        return <Clapperboard size={22} className="stroke-[2.5]" />;
      case "Computer":
        return <Computer size={22} className="stroke-[2.5]" />;
      case "ChartNoAxesColumn":
        return <ChartNoAxesColumn size={22} className="stroke-[2.5]" />;
      case "ChartBar":
        return <ChartBar size={22} className="stroke-[2.5]" />;
      case "Podcast":
        return <Podcast size={22} className="stroke-[2.5]" />;
      case "SquareLibrary":
        return <SquareLibrary size={22} className="stroke-[2.5]" />;
      case "BookOpenText":
        return <BookOpenText size={22} className="stroke-[2.5]" />;
      case "Syringe":
        return <Syringe size={22} className="stroke-[2.5]" />;
      default:
        return null;
    }
  };

  const renderCard = (lab) => (
    <div
      key={lab.id}
      onClick={() => handleSelectLaboratory(lab)}
      className="lab-card group"
    >
      {/* Icon */}
      <div className={`lab-icon-container ${lab.colorClass}`}>
        {renderIcon(lab.icon)}
      </div>

      {/* Info */}
      <div className="lab-info">
        <h4 className="lab-name">{lab.name}</h4>
        <p className="lab-description">{lab.description}</p>
      </div>

      {/* Action Button */}
      <div className="lab-card-action">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSelectLaboratory(lab);
          }}
          className={`lab-action-btn ${lab.borderClass} ${lab.textClass} ${lab.hoverBtnClass}`}
        >
          <ArrowRight size={14} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="labs-section">
      {/* Header Info */}
      <div className="labs-header">
        <span className="labs-section-tag">
          — Pilih Ruang Laboratorium —
        </span>
        <h3 className="labs-section-title">
          Silahkan Pilih Ruang Laboratorium
        </h3>
        <p className="labs-section-subtitle">
          Pilih ruang laboratorium yang akan digunakan sesuai kebutuhan Anda
        </p>
      </div>

      {/* Lab Cards Grid */}
      <div className="labs-grid">
        {labsData.map((lab) => renderCard(lab))}
      </div>
    </section>
  );
}
