import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { CompanyPage } from "./pages/Company/CompanyPage";
import { ServicesPage } from "./pages/Services/ServicesPage";
import { CapabilitiesPage } from "./pages/Capabilities/CapabilitiesPage";
import { ProductsPage } from "./pages/Products/ProductsPage";
import { IndustriesPage } from "./pages/Industries/IndustriesPage";
import { QualityPage } from "./pages/Quality/QualityPage";
import { InsightsPage } from "./pages/Insights/InsightsPage";
import { CareersPage } from "./pages/Careers/CareersPage";
import { JobDetailPage } from "./pages/Careers/JobDetailPage";
import { ContactPage } from "./pages/Contact/ContactPage";
import { UploadBOMPage } from "./pages/UploadBOM/UploadBOMPage";
import { SellExcessPage } from "./pages/SellExcess/SellExcessPage";
import { ByCategoryPage } from "./pages/ByCategory/ByCategoryPage";
import { CategoryResultsPage } from "./pages/CategoryResults/CategoryResultsPage";
import { ProductDetailPage } from "./pages/ProductDetail/ProductDetailPage";
import { ScrollToTop } from "./components/ScrollToTop";

import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<JobDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/upload-bom" element={<UploadBOMPage />} />
        <Route path="/sell-excess" element={<SellExcessPage />} />
        <Route path="/by-category" element={<ByCategoryPage />} />
        <Route path="/category/:type/:category/:subtype" element={<CategoryResultsPage />} />
        <Route path="/product" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
