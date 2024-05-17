import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import ImageView from "components/ImageView";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      color: theme.palette.common.purple,
      fontWeight: `${theme.typography.fontWeightBold} !important`,
    },
    label: {
      textAlign: "center",
      lineHeight: "26px",
      fontWeight: 400,
      color: theme.palette.common.purple,
      textTransform: "uppercase",
    },
  };
});

const CarImageListBlock = ({ items, title }: any) => {
  const classes = useStyles();
  return (
    <>
      {items?.find((it: any) => !!it?.src) && (
        <div>
          <div>
            <Typography component="p" className={classes.title}>
              {title}
            </Typography>
          </div>
          <Grid container columnSpacing={2}>
            {items.map((it: any, key: any) => {
              return (
                <Fragment key={key}>
                  {it?.src && (
                    <Grid item xs={3}>
                      <Typography component="p" className={classes.label}>
                        {it?.title}
                      </Typography>
                      <ImageView
                        width={"100%"}
                        height={"auto"}
                        src={it?.src}
                        styles={{
                          aspectRatio: "1/1",
                        }}
                      />
                    </Grid>
                  )}
                </Fragment>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
};

export default CarImageListBlock;
