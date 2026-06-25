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
      name: "Lab Aplikasi 1",
      description:
        "Laboratorium untuk praktikum pengembangan aplikasi dan implementasi teknologi perangkat lunak.",
      icon: "Computer",
      colorClass: "bg-emerald-500",
      textClass: "text-emerald-600",
      borderClass: "border-emerald-500/20 hover:border-emerald-500",
      hoverBtnClass: "hover:bg-emerald-500 hover:text-white",
    },
    {
      id: 2,
      name: "Lab Aplikasi 2",
      description:
        "Laboratorium untuk praktikum pengembangan aplikasi dan implementasi teknologi perangkat lunak.",
      icon: "Computer",
      colorClass: "bg-emerald-500",
      textClass: "text-blue-600",
      borderClass: "border-blue-500/20 hover:border-blue-500",
      hoverBtnClass: "hover:bg-blue-500 hover:text-white",
    },
    {
      id: 16,
      name: "Lab Aplikasi 3",
      description: "Laboratorium untuk praktikum pengembangan aplikasi dan implementasi teknologi perangkat lunak.",
      icon: "Computer",
      colorClass: "bg-emerald-500",
      textClass: "text-blue-600",
      borderClass: "border-blue-500/20 hover:border-blue-500",
      hoverBtnClass: "hover:bg-blue-500 hover:text-white",
    },
    {
      id: 3,
      name: "Lab Data Sains",
      description:
        "Laboratorium untuk praktikum analisis data, machine learning, dan penelitian data sains.",
      icon: "Beaker",
      colorClass: "bg-purple-500",
      textClass: "text-purple-600",
      borderClass: "border-purple-500/20 hover:border-purple-500",
      hoverBtnClass: "hover:bg-purple-500 hover:text-white",
    },
    {
      id: 4,
      name: "Lab Jaringan Komputer",
      description:
        "Laboratorium untuk praktikum jaringan komputer, konfigurasi perangkat, dan administrasi jaringan.",
      icon: "Router",
      colorClass: "bg-orange-500",
      textClass: "text-orange-600",
      borderClass: "border-orange-500/20 hover:border-orange-500",
      hoverBtnClass: "hover:bg-orange-500 hover:text-white",
    },
    {
      id: 5,
      name: "Lab Matematika",
      description:
        "Laboratorium untuk praktikum dan penelitian matematika",
      icon: "sqrt",
      colorClass: "bg-blue-400",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 6,
      name: "Lab Multimedia 1",
      description:
        "Laboratorium untuk praktikum desain grafis, editing multimedia, dan produksi konten digital.",
      icon: "Clapperboard",
      colorClass: "bg-red-400",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 7,
      name: "Lab Multimedia 2",
      description:
        "Laboratorium untuk praktikum desain grafis, editing multimedia, dan produksi konten digital.",
      icon: "Clapperboard",
      colorClass: "bg-red-400",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 8,
      name: "Lab Programming",
      description:
        "Laboratorium untuk praktikum pemrograman, pengembangan aplikasi, dan rekayasa perangkat lunak.",
      icon: "code",
      colorClass: "bg-blue-900",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 9,
      name: "Lab Sistem Digital",
      description:
        "Laboratorium untuk praktikum sistem digital, logika komputer, dan perancangan perangkat elektronik.",
      icon: "ChartNoAxesColumn",
      colorClass: "bg-lime-500",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 10,
      name: "Lab Sistem Informasi",
      description:
        "Laboratorium untuk praktikum analisis sistem, pengelolaan data, dan pengembangan sistem informasi.",
      icon: "ChartBar",
      colorClass: "bg-slate-500",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 11,
      name: "Ruang ELC 1",
      description:
        "Ruang untuk kegiatan pembelajaran, pelatihan, dan pengembangan kompetensi mahasiswa.",
      icon: "SquareLibrary",
      colorClass: "bg-amber-400",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 12,
      name: "Ruang ELC 2",
      description:
        "Ruang untuk kegiatan pembelajaran, pelatihan, dan pengembangan kompetensi mahasiswa.",
      icon: "SquareLibrary",
      colorClass: "bg-amber-400",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 13,
      name: "Ruang Podcast",
      description:
        "Ruang untuk kegiatan rekaman audio, podcast, dan produksi konten digital.",
      icon: "Podcast",
      colorClass: "bg-red-400",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 14,
      name: "Ruang Riset",
      description:
        "Ruang untuk kegiatan penelitian, diskusi akademik, dan pengembangan inovasi.",
      icon: "BookOpenText",
      colorClass: "bg-teal-500",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
    {
      id: 15,
      name: "Ruang Operasi",
      description:
        "Ruang untuk kegiatan operasional, monitoring sistem, dan koordinasi laboratorium.",
      icon: "Syringe",
      colorClass: "bg-emerald-400",
      textClass: "text-teal-600",
      borderClass: "border-teal-500/20 hover:border-teal-500",
      hoverBtnClass: "hover:bg-teal-500 hover:text-white",
    },
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
