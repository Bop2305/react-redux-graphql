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
  classInputsFrameFlight: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: theme.spacing(5),
  },
  inputsFrameFlightAreaFull: {
    gridColumn: "4 span",
  },
  inputsFrameFlightAreaCenter: {
    gridColumn: "2 / 2 span",
  },
  inputsFrameFlightAreaHalfLeft: {
    gridColumn: "1 / 3",
  },
  inputsFrameFlightAreaHalfRight: {
    gridColumn: "3 / 5",
  },
  classFrameFlightLeft: {
    paddingLeft: 0,
    paddingBottom: 0,
  },
  classInputsFrameFlightLeft: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(5),
  },
  inputsFrameFlightLeftAreaFull: {
    gridColumn: "2 span",
  },
  classFrameFlightRight: {
    paddingRight: 0,
    paddingBottom: 0,
  },
  classInputsFrameFlightRight: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(5),
  },
  classInputsFrameBuyer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(5),
  },
  classInputsFrameInsureds: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(5),
  },
  classGroupPaymentMethod: {
    display: "grid !important",
    gridTemplateColumns: "1fr",
    columnGap: "5px",
    rowGap: "5px",
  },
  flightIcon: {
    width: 40,
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
