import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";

type MenuItem = {
  label: string;
  path: string;
};

type Props = {
  children: React.ReactNode;
  menuItems: MenuItem[];
};

const LinkWrapper = styled("div")({
  display: "flex",
  gap: "5px",
  marginTop: "10px",
});

const MyLink = styled(Link)({
  position: "relative",
  display: "flex",
  color: "black",
  "& .rectangle": {
    width: 200,
    height: 40,
    background: "grey",
  },
  "& .triangle": {
    width: 0,
    height: 0,
    borderTop: "20px solid transparent",
    borderBottom: "20px solid transparent",
    borderLeft: "20px solid grey",
  },
  "& .label": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%);",
    width: "100%",
    textAlign: "center",
  },
});

const useStyles = makeStyles((them) => ({
  active: {
    color: "white",
    "& .rectangle": {
      background: "green",
    },
    "& .triangle": {
      borderLeft: "20px solid green",
    },
  },
}));

const LayoutMenu: React.FC<Props> = ({ children, menuItems }) => {
  const classes = useStyles();

  const location = useLocation();

  const isActice = (path: string) => {
    return location.pathname.split('/')[2] === path.split('/')[2]
  }

  return (
    <div>
      <LinkWrapper>
        {menuItems.map((item) => (
          <MyLink
            to={item.path}
            key={item.path}
            className={isActice(item.path) ? classes.active : ""}
          >
            <div className="rectangle"></div>
            <div className="triangle"></div>
            <div className="label">{item.label}</div>
          </MyLink>
        ))}
      </LinkWrapper>
      {children}
    </div>
  );
};

export default LayoutMenu;
