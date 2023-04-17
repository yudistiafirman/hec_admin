import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminCareer from "../pages/Admin/AdminCareer";
import AdminGaleri from "../pages/AdminGaleri/AdminGaleri";
import AdminNavbar from "../pages/AdminNavbar/AdminNavbar";
import AdminPelatihan from "../pages/AdminPelatihan/AdminPelatihan";
import AdminFasilitas from "../pages/AdminFasilitas";
import Adminjasa from "../pages/AdminJasa";
import AdminPenjualan from "../pages/AdminPenjualan";

const AdminRoute = () => {
  return (
    <Router>
      <div>
        <AdminNavbar />
        <Routes>
          <Route exact path="/" element={<AdminCareer />} />
          <Route path="/adminfasilitas" element={<AdminFasilitas />} />
          <Route path="/admingaleri" element={<AdminGaleri />} />
          <Route path="/adminpelatihan" element={<AdminPelatihan />} />
          <Route path="/adminjasa" element={<Adminjasa />} />
          <Route path="/adminpenjualan" element={<AdminPenjualan />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AdminRoute;
