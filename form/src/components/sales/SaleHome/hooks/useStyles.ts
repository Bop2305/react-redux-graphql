import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(5),
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
  label: {
    color: theme.palette.grey[500],
    "& > p": {
      fontSize: "1.2rem !important",
    },
  },
  inputsFrameBuyer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(5),
  },
  title: {
    color: theme.palette.common.purple,
    fontWeight: `${theme.typography.fontWeightBold} !important`,
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
