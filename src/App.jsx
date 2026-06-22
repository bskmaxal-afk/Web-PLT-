import { HashRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <AppProvider>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroBanner />
                  <LaboratoryGrid />
                </>
              }
              
            />
            <Route path="/booking" element={<LaboratoryBookingForm />} />

            <Route path="/laboratories" element={<LaboratoryInformation />} />
            <Route path="/guide" element={<UsageGuide />} />
            <Route path="/contact" element={<HelpAndSupport />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </AppProvider>
  );
}

export default App;