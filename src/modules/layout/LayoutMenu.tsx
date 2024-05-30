import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

type MenuItem = {
  label: string;
  path: string;
};

type Props = {
  children: React.ReactNode;
  menuItems: MenuItem[];
};

const LinkWrapper = styled("div")({
  position: "relative",
  display: "flex",
  gap: "5px",
  marginTop: "10px",
  overflow: "hidden",
});

const MyLink = styled(Link)({
  position: "relative",
  display: "flex",
  color: "black",
  "& .rectangle": {
    width: 250,
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
  "& .prevTriangle": {
    position: "absolute",
    top: "50%",
    left: "9px",
    transform: "translate(-50%, -50%);",
    width: 0,
    height: 0,
    borderTop: "20px solid transparent",
    borderBottom: "20px solid transparent",
    borderLeft: "20px solid white",
  },
});

const useStyles = makeStyles((them) => ({
  active: {
    color: "white",
    "& .rectangle": {
      background: "#00BABC",
    },
    "& .triangle": {
      borderLeft: "20px solid #00BABC",
    },
  },
  arrowLeftIconWrapper: {
    position: "absolute",
    top: "50%",
    left: "22px",
    transform: "translate(-50%, -50%);",
    background: "#fff",
    display: "flex",
    padding: "10px",
    zIndex: 10,
    cursor: "pointer",
  },
  arrowRightIconWrapper: {
    position: "absolute",
    top: "50%",
    right: "-22px",
    transform: "translate(-50%, -50%);",
    background: "#fff",
    display: "flex",
    padding: "10px",
    zIndex: 10,
    cursor: "pointer",
  },
}));

const LayoutMenu: React.FC<Props> = ({ children, menuItems }) => {
  const classes = useStyles();

  const [isScrollable, setIsScrollable] = useState(false);
  const [isShowRightArrow, setIsShowRightArrow] = useState(true);
  const [isShowLeftArrow, setIsShowLeftArrow] = useState(false);

  const containerRef = useRef(null);

  const location = useLocation();

  const isActice = (path: string) => {
    return location.pathname === path;
  };

  const scrollToRight = () => {
    if (containerRef.current) {
      const { scrollWidth } = containerRef.current;
      containerRef.current["scrollLeft"] = scrollWidth;
      setIsShowRightArrow(false);
      setIsShowLeftArrow(true);
    }
  };

  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current["scrollLeft"] = 0 as never;
      setIsShowLeftArrow(false);
      setIsShowRightArrow(true);
    }
  };

  const checkForScroll = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      setIsScrollable(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkForScroll();
    window.addEventListener("resize", checkForScroll);
    return () => {
      window.removeEventListener("resize", checkForScroll);
    };
  }, []);

  return (
    <div>
      <div style={{ position: "relative" }}>
        {isScrollable && isShowLeftArrow && (
          <div className={classes.arrowLeftIconWrapper} onClick={scrollToLeft}>
            <ArrowBackIosNewOutlinedIcon />
          </div>
        )}
        <LinkWrapper ref={containerRef}>
          {menuItems.map((item, index, arr) => (
            <MyLink
              to={item.path}
              key={item.path}
              className={isActice(item.path) ? classes.active : ""}
            >
              {index > 0 && <div className="prevTriangle"></div>}
              <div className="rectangle"></div>
              <div className="triangle"></div>
              <div className="label">{item.label}</div>
            </MyLink>
          ))}
        </LinkWrapper>
        {isScrollable && isShowRightArrow && (
          <div
            className={classes.arrowRightIconWrapper}
            onClick={scrollToRight}
          >
            <ArrowForwardIosIcon />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default LayoutMenu;
