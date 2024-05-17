import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  areaFull: {
    gridColumn: "1 / 2 span",
  },
  classGroupCarUsing: {
    display: "grid !important",
    gridTemplateColumns: "1fr 1fr",
    gap: `${theme.spacing(10)} !important`,
    [theme.breakpoints.down("sm")]: {
      gap: `${theme.spacing(5)} !important`,
    },
  },
  inputsWrapperClass: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(5),
  },
}));

export default useStyles;
