import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Career from "../pages/Career/Career";
import Gallery from "../pages/Gallery";
import Navbar from "../pages/Navbar/Navbar";
import Training from "../pages/Training";
import Facility from "../pages/Facility";
import Adminjasa from "../pages/Services";
import AdminPenjualan from "../pages/Sale";

const AdminRoute = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Career />} />
          <Route path="/adminfasilitas" element={<Facility />} />
          <Route path="/admingaleri" element={<Gallery />} />
          <Route path="/adminpelatihan" element={<Training />} />
          <Route path="/adminjasa" element={<Adminjasa />} />
          <Route path="/adminpenjualan" element={<AdminPenjualan />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AdminRoute;
