import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 py-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
