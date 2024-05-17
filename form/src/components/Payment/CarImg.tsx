import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import withTheme from "hoc/withTheme";
import { ZoomOutMap } from "@mui/icons-material";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const useStyles = makeStyles((theme) => ({
  wrapCarImg: {
    marginTop: 20,
  },
  title: {
    color: theme.palette.common.purple,
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
  imgList: {
    display: "flex",
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexWrap: "wrap",
    },
    "@media (max-width: 414px)": {
      justifyContent: "space-evenly",
    },
  },
  imgItem: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginRight: 10,
    [theme.breakpoints.down('sm')]: {
      marginRight: 9,
    },
    cursor: "pointer",
    "@media (max-width: 414px)": {
      width: "calc(50% - 5px)",
      "&:nth-child(2)": {
        marginRight: 0,
      },
    },
    "& span": {
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      }
    },
    "& img": {
      width: 84,
      height: 84,
      objectFit: "cover",
      "@media (max-width: 414px)": {
        width: "100%",
        height: "100%",
      },
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  imgWrap: {
    position: "relative",
  },
  iconZoom: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
}));

type ImgProps = {
  title: string;
  data: any;
  carUrl?: string,
};

const CarImg = ({ title, data, carUrl }: ImgProps) => {
  const classes = useStyles();

  const newName = {
    "front_left_view": "Trước - Lái",
    "front_right_view": "Trước - Phụ",
    "rear_right_view": "Sau - Phụ",
    "rear_left_view": "Sau - Lái",
  } as any;

  const sortOrder = [
    "front_left_view",
    "front_right_view",
    "rear_right_view",
    "rear_left_view",
  ];

  const customSort = (a: any, b: any) => {
    var indexA = sortOrder.indexOf(a.inspecImageTags);
    var indexB = sortOrder.indexOf(b.inspecImageTags);
    return indexA - indexB;
  }

  data.sort(customSort);
  data.forEach(function (item: any) {
    item.inspecImageTags = newName[item.inspecImageTags];
  });

  const MyFigure = ({ url }: any) => (
    <Zoom>
      <img
        alt="car img"
        src={`${carUrl}/${url}`}
        width="500"
      />
      <span className={classes.iconZoom}>
        <ZoomOutMap style={{ color: 'white' }} />
      </span>
    </Zoom>
  )

  return (
    <div className={classes.wrapCarImg}>
      <Typography component="p" className={classes.title}>
        {title}
      </Typography>
      <ul className={classes.imgList}>
        {data?.map((item: any, idx: number) => (
          <li className={classes.imgItem} key={idx}>
            <span>{item.inspecImageTags}</span>
            <div>
              <MyFigure url={item.inspecImageFcode} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withTheme<ImgProps>(CarImg);
