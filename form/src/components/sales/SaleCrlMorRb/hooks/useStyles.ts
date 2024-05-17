import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(5),
  },
  inputsWrapperClass: {
    gridTemplateColumns: "1fr 1fr",
  },
  areaFull: {
    gridColumn: "2 span",
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
