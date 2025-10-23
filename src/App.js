import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ==== import halaman existing ====
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Item from "./pages/Item";
import Vendor from "./pages/Vendor";
import Ahs from "./pages/Ahs";
import ItemForm from "./pages/ItemForm";
import Navbar from "./components/Navbar";
import AHSList from "./pages/AHSList";
import AHSDetail from "./pages/AHSDetail";
import NotFound from "./pages/NotFound";
import AhsForm from "./pages/Ahs/AhsForm"; // ← tambahkan ini di bagian import

// ==== import tambahan halaman baru (AhsList di folder Ahs) ====
import AhsList from "./pages/Ahs/AhsList";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Jangan tampilkan Navbar di halaman login dan dashboard
  const hideNavbarPaths = ["/", "/dashboard"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* ==== route existing ==== */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/new" element={<ItemForm />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/ahs" element={<Ahs />} />
        <Route path="/ahs/list" element={<AHSList />} />
        <Route path="/ahs/:id" element={<AHSDetail />} />
        <Route path="*" element={<NotFound />} />

        {/* ==== route tambahan untuk halaman AhsList baru ==== */}
        <Route path="/ahs/data" element={<AhsList />} />
        <Route path="/ahs/form" element={<AhsForm />} />   {/* ← route baru */}

      </Routes>
    </>
  );
}

export default App;
