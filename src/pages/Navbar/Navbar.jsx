import React, { useState } from "react";
import "./Navbar.css";
import HecLogo from "../../assets/heclogo.png";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import CollectionsIcon from "@mui/icons-material/Collections";
import FoundationIcon from "@mui/icons-material/Foundation";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import NavListItems from "../../components/molecules/NavListItems";

import AddHomeIcon from "@mui/icons-material/AddHome";
import navStyle from "./navStyle";
import "./Navbar.css";
import { useUserStore } from "../../stores/useUserStore";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const onLogoutAdmin = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/login");
  };

  const handleOpenGallery = () => {
    setOpen(!open);
  };

  const [setUserData] = useUserStore((state) => [state.setUserData]);

  return (
    <List
      sx={navStyle.listContainer}
      component="nav"
      className="navbar-border navbar"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          className="bg-light"
          component="div"
          id="nested-list-subheader"
        >
          <img alt="#" src={HecLogo} width="140px" />
        </ListSubheader>
      }
    >
      <NavListItems
        selected={location.pathname === "/"}
        onClick={() => {
          navigate("/");
        }}
        itemIcon={<BusinessCenterIcon />}
        itemTitle="Lowongan Pekerjaan"
      />
      <NavListItems
        selected={location.pathname === "/fasilitas"}
        onClick={() => {
          navigate("/fasilitas");
        }}
        itemIcon={<FoundationIcon />}
        itemTitle="Fasilitas"
      />
      <NavListItems
        selected={location.pathname === "/galeri"}
        onClick={handleOpenGallery}
        itemIcon={<CollectionsIcon />}
        itemTitle="Galeri"
        expand={open ? <ExpandLess /> : <ExpandMore />}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavListItems
            selected={location.pathname === "/galeri"}
            sx={{ pl: 4 }}
            itemIcon={<AddHomeIcon />}
            itemTitle="Beranda Galeri"
          />
          <NavListItems
            selected={location.pathname === "/galeri"}
            sx={{ pl: 4 }}
            onClick={() => {
              navigate("/galeri");
            }}
            itemIcon={<OnDeviceTrainingIcon />}
            itemTitle="Pelatihan Galeri"
          />
        </List>
      </Collapse>
      <NavListItems
        selected={location.pathname === "/pelatihan"}
        onClick={() => {
          navigate("/pelatihan");
        }}
        itemIcon={<ModelTrainingIcon />}
        itemTitle="Pelatihan"
      />
      <NavListItems
        selected={location.pathname === "/jasa"}
        onClick={() => {
          navigate("/jasa");
        }}
        itemIcon={<RoomServiceIcon />}
        itemTitle="Jasa"
      />
      <NavListItems
        selected={location.pathname === "/penjualan"}
        onClick={() => {
          navigate("/penjualan");
        }}
        itemIcon={<MonetizationOnIcon />}
        itemTitle="Penjualan"
      />
      <NavListItems
        onClick={onLogoutAdmin}
        itemIcon={<LogoutIcon />}
        itemTitle="Keluar"
      />
    </List>
  );
};

export default AdminNavbar;
