import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import DashboardLayout from "./layouts/DashboardLayout";
import HeroBanner from "./components/dashboard/HeroBanner";
import LaboratoryGrid from "./components/dashboard/LaboratoryGrid";

// Feature Pages
import LaboratoryBookingForm from "./pages/LaboratoryBookingForm";
import LaboratoryInformation from "./pages/LaboratoryInformation";
import UsageGuide from "./pages/UsageGuide";
import HelpAndSupport from "./pages/HelpAndSupport";
import AdminPanel from "./pages/AdminPanel";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Render Landing Page on root */}
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard Pages (Wrapped in DashboardLayout) */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <HeroBanner />
                <LaboratoryGrid />
              </DashboardLayout>
            }
          />
          <Route
            path="/booking"
            element={
              <DashboardLayout>
                <LaboratoryBookingForm />
              </DashboardLayout>
            }
          />
          <Route
            path="/laboratories"
            element={
              <DashboardLayout>
                <LaboratoryInformation />
              </DashboardLayout>
            }
          />
          <Route
            path="/guide"
            element={
              <DashboardLayout>
                <UsageGuide />
              </DashboardLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <DashboardLayout>
                <HelpAndSupport />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin"
            element={
              <DashboardLayout>
                <AdminPanel />
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;