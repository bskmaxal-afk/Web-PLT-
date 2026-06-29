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
      name: "Lab Biologi Agraria",
      description: "Laboratorium untuk praktikum biokimia klinis, kultur mikroba, isolasi enzim, dan analisis biomolekul.",
      icon: "Syringe",
      colorClass: "bg-emerald-500",
      textClass: "text-emerald-600",
      borderClass: "border-emerald-500/20 hover:border-emerald-500",
      hoverBtnClass: "hover:bg-emerald-500 hover:text-white",
    },
    {
      id: 2,
      name: "Lab Fisika Dasar & Material",
      description: "Laboratorium untuk praktikum fisika dasar, eksperimen mekanika, termodinamika, dan analisis material.",
      icon: "sqrt",
      colorClass: "bg-blue-500",
      textClass: "text-blue-600",
      borderClass: "border-blue-500/20 hover:border-blue-500",
      hoverBtnClass: "hover:bg-blue-500 hover:text-white",
    },
    {
      id: 3,
      name: "Lab Kimia Analitik & Lingkungan",
      description: "Laboratorium untuk pengujian kimia instrumen, analisis kuantitatif, dan pemantauan polutan lingkungan.",
      icon: "Beaker",
      colorClass: "bg-teal-500",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 5,
      name: "Lab Komputasi Sains & Pemodelan",
      description: "Laboratorium untuk komputasi numerik, pemodelan matematika, dan simulasi sistem fisika/kimia rumit.",
      icon: "server",
      colorClass: "bg-indigo-600",
      textClass: "text-indigo-600",
      borderClass: "border-indigo-500/20 hover:border-indigo-500",
      hoverBtnClass: "hover:bg-indigo-600 hover:text-white",
    },
    {
      id: 8,
      name: "Lab Elektronika & Robotika",
      description: "Laboratorium untuk perancangan rangkaian elektronik, mikrokontroler, IoT, dan sistem kontrol robotika.",
      icon: "Anvil",
      colorClass: "bg-orange-500",
      textClass: "text-orange-600",
      borderClass: "border-orange-500/20 hover:border-orange-500",
      hoverBtnClass: "hover:bg-orange-500 hover:text-white",
    },
    {
      id: 9,
      name: "Lab Biokimia & Mikrobiologi",
      description: "Laboratorium untuk praktikum biokimia klinis, kultur mikroba, isolasi enzim, dan analisis biomolekul.",
      icon: "Syringe",
      colorClass: "bg-rose-500",
      textClass: "text-rose-600",
      borderClass: "border-rose-500/20 hover:border-rose-500",
      hoverBtnClass: "hover:bg-rose-500 hover:text-white",
    },
    {
      id: 11,
      name: "Lab Geologi & Geofisika",
      description: "Laboratorium untuk analisis mineralogi, petrografi, pemetaan geologi, dan survei seismik.",
      icon: "BookOpenText",
      colorClass: "bg-amber-500",
      textClass: "text-amber-600",
      borderClass: "border-amber-500/20 hover:border-amber-500",
      hoverBtnClass: "hover:bg-amber-500 hover:text-white",
    },
    {
      id: 12,
      name: "Lab Jaringan Komputer & Siber",
      description: "Laboratorium untuk simulasi jaringan skala luas, uji penetrasi sistem, dan pertahanan siber.",
      icon: "Router",
      colorClass: "bg-lime-600",
      textClass: "text-lime-600",
      borderClass: "border-lime-500/20 hover:border-lime-500",
      hoverBtnClass: "hover:bg-lime-600 hover:text-white",
    }
  ];

  const handleSelectLaboratory = (lab) => {
    // Find the full lab data from context (labs.js) for richer info
    const labFromContext = laboratories.find(
      (l) => l.name.toLowerCase() === lab.name.toLowerCase()
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
