import { makeStyles } from "@mui/styles";
import LeftContent from "../modules/dashboard/LeftContent";
import RightContent from "../modules/dashboard/RightContent";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    gap: "30px",
    padding: "20px",
    background: 'grey',
  },
  leftContent: {
    position: "relative",
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
  },
  rightContent: {
    position: "relative",
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    overflow: 'auto',
  },
}));

const DashBoard: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftContent}>
        <LeftContent />
      </div>
      <div className={classes.rightContent}>
        <RightContent />
      </div>
    </div>
  );
};

export default DashBoard;
