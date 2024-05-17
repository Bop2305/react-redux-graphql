import React from "react";
import { IconButton, Menu as MenuMaterial, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type MenuProps = {
  options: { value: string; label: string }[];
  onAction: any;
};

const Menu = (props: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <MenuIcon color="secondary" />
      </IconButton>
      <MenuMaterial
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {props.options?.map((op) => (
          <MenuItem
            key={op?.value}
            onClick={() => {
              props.onAction(op);
              handleClose();
            }}
          >
            {op?.label}
          </MenuItem>
        ))}
      </MenuMaterial>
    </div>
  );
};

export default Menu;
