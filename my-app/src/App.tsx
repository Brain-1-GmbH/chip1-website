import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { CompanyPage } from "./pages/Company/CompanyPage";
import { ServicesPage } from "./pages/Services/ServicesPage";
import { CapabilitiesPage } from "./pages/Capabilities/CapabilitiesPage";
import { ProductsPage } from "./pages/Products/ProductsPage";
import { IndustriesPage } from "./pages/Industries/IndustriesPage";
import { QualityPage } from "./pages/Quality/QualityPage";
import { InsightsPage } from "./pages/Insights/InsightsPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
