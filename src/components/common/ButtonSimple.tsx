import {
  Button,
  ButtonProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
  label: string;
  size?: string;
} & ButtonProps;

const useStyles = makeStyles((them) => ({
  button: {
    backgroundColor: "#F89621 !important",
    color: "white !important",
    borderRadius: "5px",
  },
}));

const ButtonSimple: React.FC<Props> = ({
  label,
  size = "medium",
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} fullWidth size={size} {...props}>
      {label}
    </Button>
  );
};

export default ButtonSimple;
