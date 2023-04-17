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
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavListItems from "../../components/molecules/NavListItems";

import AddHomeIcon from "@mui/icons-material/AddHome";
import navStyle from "./navStyle";

const AdminNavbar = () => {
  const location = useLocation();
  const [openUser, setOpenuser] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = React.useState(true);
  const onLogoutAdmin = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };

  const handleOpenGallery = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={navStyle.listContainer}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <img alt="#" src={HecLogo} width="140px" />
        </ListSubheader>
      }
    >
      <NavListItems
        onClick={() => navigate("/career")}
        itemIcon={<BusinessCenterIcon />}
        itemTitle="Karir"
      />
      <NavListItems
        onClick={() => navigate("/adminfasilitas")}
        itemIcon={<FoundationIcon />}
        itemTitle="Fasilitas"
      />
      <NavListItems
        onClick={handleOpenGallery}
        itemIcon={<CollectionsIcon />}
        itemTitle="Galeri"
        expand={open ? <ExpandLess /> : <ExpandMore />}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavListItems
            sx={{ pl: 4 }}
            itemIcon={<AddHomeIcon />}
            itemTitle="Beranda Galeri"
          />
          <NavListItems
            sx={{ pl: 4 }}
            onClick={() => navigate("/admingaleri")}
            itemIcon={<OnDeviceTrainingIcon />}
            itemTitle="Pelatihan Galeri"
          />
        </List>
      </Collapse>
      <NavListItems
        onClick={() => navigate("/adminpelatihan")}
        itemIcon={<ModelTrainingIcon />}
        itemTitle="Pelatihan"
      />
      <NavListItems
        onClick={() => navigate("/adminjasa")}
        itemIcon={<RoomServiceIcon />}
        itemTitle="Jasa"
      />
      <NavListItems
        onClick={() => navigate("/adminpenjualan")}
        itemIcon={<MonetizationOnIcon />}
        itemTitle="Penjualan"
      />
      <NavListItems itemIcon={<LogoutIcon />} itemTitle="Keluar" />
    </List>
  );
};

export default AdminNavbar;
