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
import { BrowserRouter, useNavigate } from "react-router-dom";
import NavListItems from "../../components/molecules/NavListItems";

import AddHomeIcon from "@mui/icons-material/AddHome";
import navStyle from "./navStyle";
import "./Navbar.css";
import { useUserStore } from "../../stores/useUserStore";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onLogoutAdmin = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/");
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
        selected={selectedIndex === 0}
        onClick={() => {
          navigate("/");
          setSelectedIndex(0);
        }}
        itemIcon={<BusinessCenterIcon />}
        itemTitle="Lowongan Pekerjaan"
      />
      <NavListItems
        selected={selectedIndex === 1}
        onClick={() => {
          navigate("/fasilitas");
          setSelectedIndex(1);
        }}
        itemIcon={<FoundationIcon />}
        itemTitle="Fasilitas"
      />
      <NavListItems
        selected={selectedIndex === 2}
        onClick={handleOpenGallery}
        itemIcon={<CollectionsIcon />}
        itemTitle="Galeri"
        expand={open ? <ExpandLess /> : <ExpandMore />}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavListItems
            selected={selectedIndex === 3}
            onClick={() => {
              setSelectedIndex(3);
            }}
            sx={{ pl: 4 }}
            itemIcon={<AddHomeIcon />}
            itemTitle="Beranda Galeri"
          />
          <NavListItems
            selected={selectedIndex === 4}
            sx={{ pl: 4 }}
            onClick={() => {
              navigate("/galeri");
              setSelectedIndex(4);
            }}
            itemIcon={<OnDeviceTrainingIcon />}
            itemTitle="Pelatihan Galeri"
          />
        </List>
      </Collapse>
      <NavListItems
        selected={selectedIndex === 5}
        onClick={() => {
          navigate("/pelatihan");
          setSelectedIndex(5);
        }}
        itemIcon={<ModelTrainingIcon />}
        itemTitle="Pelatihan"
      />
      <NavListItems
        selected={selectedIndex === 6}
        onClick={() => {
          navigate("/jasa");
          setSelectedIndex(6);
        }}
        itemIcon={<RoomServiceIcon />}
        itemTitle="Jasa"
      />
      <NavListItems
        selected={selectedIndex === 7}
        onClick={() => {
          navigate("/penjualan");
          setSelectedIndex(7);
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
