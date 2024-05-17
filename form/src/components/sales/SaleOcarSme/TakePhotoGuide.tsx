import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    image: {
      maxWidth: '100%'
    }
  }
})

const TakePhotoGuide = () => {

  const classes = useStyles()
  return <>
    <img
      className={classes.image}
      src={"https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/take-photo-guide.png"}
     alt={'image'}/>
    </>
}

export default TakePhotoGuide;
