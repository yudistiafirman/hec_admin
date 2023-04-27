import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const NavListItems = ({
  itemTitle,
  itemIcon,
  onClick,
  expand,
  sx,
  selected,
}) => {
  return (
    <ListItemButton selected={selected} sx={sx} onClick={onClick}>
      <ListItemIcon sx={{ color: selected ? "var(--primary)" : "" }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        style={{
          color: selected ? "var(--primary)" : "",
        }}
        primary={itemTitle}
      />
      {expand}
    </ListItemButton>
  );
};

export default NavListItems;
