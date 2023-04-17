import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const NavListItems = ({ itemTitle, itemIcon, onClick, expand, sx }) => {
  return (
    <ListItemButton sx={sx} onClick={onClick}>
      <ListItemIcon>{itemIcon}</ListItemIcon>
      <ListItemText primary={itemTitle} />
      {expand}
    </ListItemButton>
  );
};

export default NavListItems;
