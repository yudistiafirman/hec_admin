import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Career from "../pages/Career/Career";
import Gallery from "../pages/Gallery";
import Navbar from "../pages/Navbar/Navbar";
import Training from "../pages/Training";
import Facility from "../pages/Facility";
import Services from "../pages/Services";
import Sale from "../pages/Sale";
import Login from "../pages/Login";
import { useUserStore } from "../stores/useUserStore";
import "./route.css";
import PrivateRoute from "./PrivateRoute";
import CareerDetail from "../pages/Career/CareerDetail";
import AddCareer from "../pages/Career/AddCareer";

const AdminRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || userData === "undefined") {
      setIsLoggedIn(false);

      return navigate("/login");
    }
    setIsLoggedIn(true);
  }, [isLoggedIn, navigate]);

  return (
    <div className="route-container">
      {location.pathname !== "/login" && isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          exact
          path="/career"
          element={
            <PrivateRoute>
              <Career />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/career/detail/:careerId"
          element={
            <PrivateRoute>
              <CareerDetail />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/career/add"
          element={
            <PrivateRoute>
              <AddCareer />
            </PrivateRoute>
          }
        />

        <Route
          path="/fasilitas"
          element={
            <PrivateRoute>
              <Facility />
            </PrivateRoute>
          }
        />

        <Route
          path="/galeri"
          element={
            <PrivateRoute>
              <Gallery />
            </PrivateRoute>
          }
        />

        <Route
          path="/pelatihan"
          element={
            <PrivateRoute>
              <Training />
            </PrivateRoute>
          }
        />

        <Route
          path="/jasa"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />

        <Route
          path="/penjualan"
          element={
            <PrivateRoute>
              <Sale />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRoute;
