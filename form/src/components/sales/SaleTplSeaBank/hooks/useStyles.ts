import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(5),
  },
  title: {
    color: theme.palette.common.purple,
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
  inputsWrapperClass: {
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  },
  areaCenter: {
    gridColumn: "2 / 2 span",
  },
  areaFull: {
    gridColumn: "4 span",
  },
  areaHalf: {
    gridColumn: "2 span",
  },
  areaHalfLeft: {
    gridColumn: "1 / 3",
  },
  classInputsFrameVehicle: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(5),
  },
  classInputsFrameDuration: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(5),
  },
  frameDurationAreaFull: {
    gridColumn: "2 span",
  },
  labelFrameOwnerCar: {
    gridColumn: "3 / 2 span",
    gridRow: "2 / 2 span",
  },
  inputsFrameOwnerCar: {
    gridColumn: "3 / 2 span",
    gridRow: "3 / 3 span",
  },
  labelFrameOwnerMoto: {
    gridColumn: "3 / 2 span",
    gridRow: "3 / 2 span",
  },
  inputsFrameOwnerMoto: {
    gridColumn: "3 / 2 span",
    gridRow: "4 / 3 span",
  },
  classGroupPaymentMethod: {
    display: "grid !important",
    gridTemplateColumns: "1fr",
    columnGap: "5px",
    rowGap: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    wrapper: {
      padding: theme.spacing(1),
    },
    classGroupPaymentMethod: {
      gridTemplateColumns: "1fr",
    },
  },
}));

export default useStyles;
