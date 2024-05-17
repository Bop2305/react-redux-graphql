import { makeStyles } from "@mui/styles";

const infoStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    gap: theme.spacing(2),
    marginTop: 10,
  },
  infoLineWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(5),
  },
  title: {
    color: theme.palette.common.purple,
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    marginBottom: 7,
  },
  label: {
  },
  content: {
    whiteSpace: "pre-line",
    textAlign: "right",
    maxWidth: "calc(100vw - 40%)",
    wordBreak: "break-all",
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    [theme.breakpoints.down('md')]: {
      textAlign: "right",
    },
  },
  typeInsure: {
    color: "#F7971D",
    textDecoration: "underline",
    textTransform: "uppercase",
    fontWeight: "bold !important",
  },
  contentHighLight: {
    color: "#fa673e",
  }
}));

export { infoStyles };
