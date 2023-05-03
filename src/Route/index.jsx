import React, { useEffect } from "react";
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

const AdminRoute = () => {
  let [userData, setUserData] = useUserStore((state) => [
    state.userData,
    state.setUserData,
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserData(userData);
      navigate("/");
    }
  }, []);

  return (
    <div className="route-container">
      {location.pathname !== "/login" && userData && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Career />
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
