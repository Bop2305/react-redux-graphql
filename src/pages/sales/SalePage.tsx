import { connect } from "react-redux";
import InputSimple from "../../components/common/InputSimple";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SelectSimple from "../../components/common/SelectSimple";
import ButtonSimple from "../../components/common/ButtonSimple";

const SalePage: React.FC = () => {
  return (
    <>
      <h1>Sale</h1>
      <InputSimple
        label="FullName"
        name="fullName"
        icon={<PermContactCalendarIcon />}
        defaultValue={"Nguyen Van A"}
      />
      <br></br>
      <InputSimple
        label="CarName"
        name="carName"
        icon={<DirectionsCarIcon />}
      />
      <br></br>
      <SelectSimple
        label="Giới tính"
        options={[
          { label: "Female", value: "female" },
          { label: "Male", value: "male" },
        ]}
      />
      <br>{/* <ButtonSimple label="Submit" /> */}</br>
      <ButtonSimple label="Submit" />
    </>
  );
};

export default connect()(SalePage);
