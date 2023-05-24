import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Career from "../pages/Career/Career";
import Navbar from "../pages/Navbar/Navbar";
import Training from "../pages/Training";
import Facility from "../pages/Facility";
import Services from "../pages/Services";
import Sale from "../pages/Sale";
import Login from "../pages/Login";
import "./route.css";
import PrivateRoute from "./PrivateRoute";
import CareerDetail from "../pages/Career/CareerDetail";
import AddCareer from "../pages/Career/AddCareer";
import TrainingDetail from "../pages/Training/TrainingDetail";
import AddTraining from "../pages/Training/AddTraining";
import AddFacility from "../pages/Facility/AddFacility";
import FacilityDetail from "../pages/Facility/FacilityDetail";
import TrainingGallery from "../pages/TrainingGallery";
import AddTrainingGallery from "../pages/TrainingGallery/AddTrainingGallery";
import TrainingGalleryDetail from "../pages/TrainingGallery/TrainingGalleryDetail";
import HomeGallery from "../pages/HomeGallery";
import AddHomeGallery from "../pages/HomeGallery/AddHomeGallery";
import HomeGalleryDetail from "../pages/HomeGallery/HomeGalleryDetail";
import PartnershipGallery from "../pages/PartnershipGallery";
import AddPartnershipGallery from "../pages/PartnershipGallery/AddPartnershipGallery";
import PartnershipGalleryDetail from "../pages/PartnershipGallery/DetailPartnershipGallery";

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
        {isLoggedIn ? (
          <>
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
              path="/facility"
              element={
                <PrivateRoute>
                  <Facility />
                </PrivateRoute>
              }
            />
            <Route
              path="/facility/add"
              element={
                <PrivateRoute>
                  <AddFacility />
                </PrivateRoute>
              }
            />
            <Route
              path="/facility/detail/:facilityId"
              element={
                <PrivateRoute>
                  <FacilityDetail />
                </PrivateRoute>
              }
            />

            <Route
              path="/training-gallery"
              element={
                <PrivateRoute>
                  <TrainingGallery />
                </PrivateRoute>
              }
            />
            <Route
              path="/training-gallery/add"
              element={
                <PrivateRoute>
                  <AddTrainingGallery />
                </PrivateRoute>
              }
            />
            <Route
              path="/training-gallery/detail/:trainingGalleryId"
              element={
                <PrivateRoute>
                  <TrainingGalleryDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/home-gallery"
              element={
                <PrivateRoute>
                  <HomeGallery />
                </PrivateRoute>
              }
            />
            <Route
              path="/home-gallery/add"
              element={
                <PrivateRoute>
                  <AddHomeGallery />
                </PrivateRoute>
              }
            />
            <Route
              path="/home-gallery/detail/:homeGalleryId"
              element={
                <PrivateRoute>
                  <HomeGalleryDetail />
                </PrivateRoute>
              }
            />

            <Route
              path="/partnership-gallery"
              element={
                <PrivateRoute>
                  <PartnershipGallery />
                </PrivateRoute>
              }
            />
            <Route
              path="/partnership-gallery/add"
              element={
                <PrivateRoute>
                  <AddPartnershipGallery />
                </PrivateRoute>
              }
            />
            <Route
              path="/partnership-gallery/detail/:partnershipGalleryId"
              element={
                <PrivateRoute>
                  <PartnershipGalleryDetail />
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
              path="/pelatihan/detail/:trainingId"
              element={
                <PrivateRoute>
                  <TrainingDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/pelatihan/add"
              element={
                <PrivateRoute>
                  <AddTraining />
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
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default AdminRoute;
