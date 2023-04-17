import React, { useState } from "react";
import "./AdminNavbar.css";
// import HecLogo from "../Navbar/assets/heclogo.png";
import {
  AiFillPicture,
  AiOutlineLogout,
  AiOutlineRead,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { RiBuilding2Line, RiServiceLine } from "react-icons/ri";
import { FaTruckMonster } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import UserMenuDialog from "./UserMenuDialog";
const AdminNavbar = () => {
  const location = useLocation();
  const [openUser, setOpenuser] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const onLogoutAdmin = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };
  const onAddUser = () => {
    setOpenForm(true);
    setTitle("add");
  };

  const onChangePassword = () => {
    setOpenForm(true);
    setTitle("change");
  };
  return (
    <div>
      <div className="admin-navbar">
        {/* <img style={{ marginLeft: "40px" }} src={HecLogo} width="140px" /> */}
        <div
          onClick={() => setOpenuser(!openUser)}
          style={{
            marginRight: "40px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{ fontWeight: "600", fontSize: "14px", color: "#6B7280" }}
          >
            hai, {localStorage.getItem("user")}
          </div>
          <AiFillCaretDown style={{ marginTop: "auto" }} color="#6B7280" />
        </div>
        {openUser && localStorage.getItem("role") == "superAdmin" && (
          <div className="user-menu-container">
            <div
              className="user-menu-content"
              onClick={onAddUser}
              style={{
                borderBottom: "1px solid #FFFFFF",
                justifyContent: "center",
              }}
            >
              <div>Add User</div>
            </div>
            <div
              className="user-menu-content"
              onClick={onChangePassword}
              style={{ justifyContent: "center" }}
            >
              <div>Change Password</div>
            </div>
          </div>
        )}
        <UserMenuDialog
          open={openForm}
          title={title}
          onClose={() => setOpenForm(false)}
        />
      </div>
      <div className="admin-menu">
        <ul>
          <li>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "200px",
                color: location.pathname === "/" ? "#FDC232" : "",
              }}
              to="/"
            >
              <AiOutlineUsergroupAdd
                style={{ width: "25px", height: "25px", marginLeft: "50px" }}
              />
              <div style={{ marginRight: "70px" }}>Career</div>
            </Link>
          </li>

          <li>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "200px",
                color: location.pathname === "/admingaleri" ? "#FDC232" : "",
              }}
              to="/admingaleri"
            >
              <AiFillPicture
                style={{ width: "25px", height: "25px", marginLeft: "50px" }}
              />
              <div style={{ marginRight: "75px" }}>Galeri</div>
            </Link>
          </li>
          <li>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "200px",
                color: location.pathname === "/adminpelatihan" ? "#FDC232" : "",
              }}
              to="/adminpelatihan"
            >
              <AiOutlineRead
                style={{ width: "25px", height: "25px", marginLeft: "50px" }}
              />
              <div style={{ marginRight: "52px" }}>Pelatihan</div>
            </Link>
          </li>
          <li>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "200px",
                color: location.pathname === "/adminfasilitas" ? "#FDC232" : "",
              }}
              to="/adminfasilitas"
            >
              <RiBuilding2Line
                style={{ width: "25px", height: "25px", marginLeft: "50px" }}
              />
              <div style={{ marginRight: "58px" }}>Fasilitas</div>
            </Link>
          </li>
          <li>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "250px",
                color: location.pathname === "/adminjasa" ? "#FDC232" : "",
              }}
              to="/adminjasa"
            >
              <RiServiceLine
                style={{ width: "25px", height: "25px", marginLeft: "50px" }}
              />
              <div style={{ marginRight: "78px" }}>Jasa Service</div>
            </Link>
          </li>
          <li>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "200px",
                color: location.pathname === "/adminpenjualan" ? "#FDC232" : "",
              }}
              to="/adminpenjualan"
            >
              <FaTruckMonster
                style={{ width: "25px", height: "25px", marginLeft: "50px" }}
              />
              <div style={{ marginRight: "48px" }}>Penjualan</div>
            </Link>
          </li>
          <li>
            <a
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "200px",
                cursor: "pointer",
              }}
              onClick={onLogoutAdmin}
            >
              <AiOutlineLogout
                style={{ width: "25px", height: "25px", marginLeft: "50px" }}
              />
              <div style={{ marginRight: "65px" }}>Logout</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
