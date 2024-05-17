import React from "react";
import { makeStyles } from "@mui/styles";

import withTheme from "hoc/withTheme";
import useToggle from "helper/hook/useToggle";
import DialogImageView from "components/DialogImageView";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "2px",
    position: "relative",
  },
  scaleIcon: {
    position: "absolute",
    bottom: 1,
    right: 3,
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  scaleImg: {
    backgroundColor: "#0000001a",
  },
}));

type ImageViewProps = {
  width?: string | number;
  height?: string | number;
  scaleIcon?: any;
  src: string;
  styles?: any;
};

const ImageView = ({
  width = "100%",
  height = "100%",
  scaleIcon,
  src,
  styles = {},
}: ImageViewProps) => {
  const classes = useStyles();

  const [isOpen, { toggle }] = useToggle() as any;

  return (
    <div
      className={classes.container}
      style={{
        width: width,
        height: height,
        ...styles,
      }}
    >
      <img className={classes.image} src={src} />
      <div className={classes.scaleIcon}>
        {scaleIcon ? (
          scaleIcon
        ) : (
          <img
            className={classes.scaleImg}
            onClick={toggle}
            src="https://opes.com.vn/images/scale-img.png"
          />
        )}
      </div>
      <DialogImageView isOpen={isOpen} onClose={toggle} src={src} />
    </div>
  );
};

export default withTheme<ImageViewProps>(ImageView);
