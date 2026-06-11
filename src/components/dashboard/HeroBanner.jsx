import { Share2, DoorOpen, Users, ThumbsUp } from "lucide-react";
import heroImg from "../../assets/hero.png";
import logoUIN from "../../assets/logoUIN.jpg";

export default function HeroBanner() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lab MaTiSi',
        text: 'Akses berbagai ruang laboratorium untuk mendukung kegiatan praktikum, penelitian, dan pembelajaran Anda.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan disalin ke papan klip!');
    }
  };

  return (
    <section className="relative mb-16 mx-8">
      {/* Main Banner Card */}
      <div 
        className="w-full min-h-[300px] rounded-[2rem] overflow-hidden p-8 md:p-12 text-white flex flex-col justify-center relative shadow-sm"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 32, 67, 0.95) 45%, rgba(15, 32, 67, 0.7) 70%, rgba(15, 32, 67, 0.3) 100%), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right'
        }}
      >
        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition cursor-pointer"
          title="Bagikan"
        >
          <Share2 size={18} />
        </button>

        {/* Text Contents */}
        <div className="max-w-xl text-left z-5">
          <h2 className="text-4xl md:text-5xl font-extrabold font-display leading-tight mb-2 tracking-tight">
            Lab MaTiSi
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-blue-200/90 mb-4 font-display">
            Laboratorium Komputer dan Fasilitas Lainnya
          </h3>
          <p className="text-sm text-blue-100/90 leading-relaxed max-w-lg font-medium">
            Akses berbagai ruang laboratorium untuk mendukung kegiatan praktikum, penelitian, dan pembelajaran Anda dengan fasilitas terbaik.
          </p>
        </div>
      </div>

      {/* Overlapping UIN Logo Badge */}
      <div className="absolute -bottom-8 left-10 w-20 h-20 rounded-full bg-white shadow-lg border border-slate-100/80 p-2 flex items-center justify-center z-10 hidden md:flex">
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img src={logoUIN} alt="UIN Logo" className="w-12 h-12 object-contain" />
        </div>
      </div>

      {/* Overlapping Statistics Card */}
      <div className="w-full md:w-auto md:absolute md:-bottom-8 md:right-10 bg-white shadow-lg border border-slate-100 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 z-10 mt-4 md:mt-0">
        {/* Stat item 1 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <DoorOpen size={20} />
          </div>
          <div className="text-left">
            <div className="text-base font-extrabold text-slate-800 leading-none">5</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Total Ruang</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-[1px] bg-slate-100"></div>

        {/* Stat item 2 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Users size={20} />
          </div>
          <div className="text-left">
            <div className="text-base font-extrabold text-slate-800 leading-none">120+</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Pengguna Aktif</div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-[1px] bg-slate-100"></div>

        {/* Stat item 3 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <ThumbsUp size={18} />
          </div>
          <div className="text-left">
            <div className="text-base font-extrabold text-slate-800 leading-none">98%</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Tingkat Kepuasan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
