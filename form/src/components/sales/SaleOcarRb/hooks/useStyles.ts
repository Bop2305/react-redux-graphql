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
  classGroupPaymentMethod: {
    display: "grid !important",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "5px",
    rowGap: "5px",
  },
  onlyCarUsingBusinessText: {
    textAlign: "center",
  },
  subText: {
    fontSize: "12px",
    display: "block",
    color: theme.palette.text.primary,
    fontWeight: 400,
  },
  onlyCarUsingBusinessField: {
    gridColumn: "1 / 2 span",
    marginBottom: "-15px",
  },
  onlyCarUsingBusinessBlock: {
    textAlign: "center",
  },
  discountCodeLabel: {
    // color: theme.palette.charcoalPurple.main,
    fontWeight: 700,
    fontSize: "14px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
      lineHeight: "25px",
    },
  },
  tplBundleEffectiveDate: {
    cursor: "pointer",
    padding: "5px 10px",
    backgroundColor: "#efefef",
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    borderRadius: "5px",
    "& span": {
      cursor: "pointer"
    },
    "& svg": {
      cursor: "pointer"
    },
    "& svg:hover": {
      "& path": {
        stroke: "#434345"
      },
    }
  },
  [theme.breakpoints.down("sm")]: {
    tplBundleEffectiveDate: {
      marginTop: "-15px"
    }
  }
}));

export default useStyles;
