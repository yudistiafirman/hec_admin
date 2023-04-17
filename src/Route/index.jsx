import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Career from "../pages/Career/Career";
import Gallery from "../pages/Gallery";
import Navbar from "../pages/Navbar/Navbar";
import Training from "../pages/Training";
import Facility from "../pages/Facility";
import Services from "../pages/Services";
import Sale from "../pages/Sale";
import Login from "../pages/Login";

const AdminRoute = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/career" element={<Career />} />
        <Route path="/adminfasilitas" element={<Facility />} />
        <Route path="/admingaleri" element={<Gallery />} />
        <Route path="/adminpelatihan" element={<Training />} />
        <Route path="/adminjasa" element={<Services />} />
        <Route path="/adminpenjualan" element={<Sale />} />
      </Routes>
    </Router>
  );
};

export default AdminRoute;
