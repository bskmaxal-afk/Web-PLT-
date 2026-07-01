import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import DashboardLayout from "../../layouts/DashboardLayout";

import heroImg from "../../assets/hero.png";
import logoUIN from "../../assets/logoUIN_new.png";
import Swal from "sweetalert2";
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
  Share2,
  DoorOpen,
  Users,
  ThumbsUp
} from "lucide-react";

export default function PanganDashboard() {
  const navigate = useNavigate();
  const { setSelectedLaboratory, laboratories } = useContext(AppContext);

  // Filter laboratories to only show Pangan labs
  const panganLaboratories = useMemo(() => {
    return (laboratories || []).filter((l) => {
      const name = (l.name || "").toLowerCase();
      return name.includes("pangan") && !name.includes("kimia");
    });
  }, [laboratories]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PANGAN UIN Jakarta - Laboratorium Pangan',
        text: 'Akses berbagai ruang laboratorium pangan untuk mendukung kegiatan praktikum, penelitian, dan pembelajaran Anda.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Tautan disalin ke papan klip!',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleSelectLaboratory = (lab) => {
    setSelectedLaboratory(lab);
    navigate("/booking?rumpun=pangan");
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
        return <Beaker size={22} className="stroke-[2.5]" />;
    }
  };

  const renderCard = (lab) => (
    <div
      key={lab.id}
      onClick={() => handleSelectLaboratory(lab)}
      className="lab-card group"
    >
      {/* Icon */}
      <div className={`lab-icon-container ${lab.colorClass || "bg-teal-500"}`}>
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
          className={`lab-action-btn ${lab.borderClass || "border-teal-500/20 hover:border-teal-500"} ${lab.textClass || "text-teal-600"} ${lab.hoverBtnClass || "hover:bg-teal-500 hover:text-white"}`}
        >
          <ArrowRight size={14} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {/* ====== HERO BANNER (PANGAN CUSTOMIZED) ====== */}
      <section className="hero-section">
        <div 
          className="hero-banner"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15, 32, 67, 0.95) 45%, rgba(15, 32, 67, 0.7) 70%, rgba(15, 32, 67, 0.3) 100%), url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right'
          }}
        >
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="hero-share-btn"
            title="Bagikan"
          >
            <Share2 size={18} />
          </button>

          {/* Text Contents */}
          <div className="hero-content">
            <h2 className="hero-title">
              PLT Pangan UIN Jakarta
            </h2>
            <h3 className="hero-subtitle">
              Rumpun Laboratorium Pangan
            </h3>
            <p className="hero-description">
              Akses berbagai fasilitas laboratorium pangan untuk mendukung kegiatan praktikum, penelitian, dan pembelajaran dengan peralatan berstandar tinggi.
            </p>
          </div>
        </div>

        {/* Overlapping UIN Logo Badge */}
        <div className="hero-badge-logo">
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <img src={logoUIN} alt="UIN Logo" className="w-12 h-12 object-contain" />
          </div>
        </div>

        {/* Overlapping Statistics Card */}
        <div className="hero-stats-card">
          {/* Stat item 1 */}
          <div className="hero-stat-item">
            <div className="hero-stat-icon-wrapper bg-teal-50 text-teal-600">
              <DoorOpen size={20} />
            </div>
            <div className="text-left">
              <div className="hero-stat-value">{panganLaboratories.length}</div>
              <div className="hero-stat-label">Lab Pangan</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hero-stats-divider"></div>

          {/* Stat item 2 */}
          <div className="hero-stat-item">
            <div className="hero-stat-icon-wrapper bg-blue-50 text-blue-600">
              <Users size={20} />
            </div>
            <div className="text-left">
              <div className="hero-stat-value">25+</div>
              <div className="hero-stat-label">Pengguna Aktif</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hero-stats-divider"></div>

          {/* Stat item 3 */}
          <div className="hero-stat-item">
            <div className="hero-stat-icon-wrapper bg-purple-50 text-purple-600">
              <ThumbsUp size={20} />
            </div>
            <div className="text-left">
              <div className="hero-stat-value">97%</div>
              <div className="hero-stat-label">Tingkat Kepuasan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== LABORATORY GRID ====== */}
      <section className="labs-section">
        {/* Header Info */}
        <div className="labs-header">
          <span className="labs-section-tag">
            — Pilih Ruang Laboratorium Pangan —
          </span>
          <h3 className="labs-section-title">
            Silahkan Pilih Ruang Laboratorium Pangan
          </h3>
          <p className="labs-section-subtitle">
            Pilih ruang laboratorium pangan yang akan digunakan sesuai kebutuhan Anda
          </p>
        </div>

        {/* Lab Cards Grid */}
        <div className="labs-grid">
          {panganLaboratories.map((lab) => renderCard(lab))}
        </div>
      </section>
    </DashboardLayout>
  );
}
