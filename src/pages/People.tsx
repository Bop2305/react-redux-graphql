import { connect } from "react-redux";
import { getAllPeople } from "../store/people.service";

const People: React.FC = () => {
  getAllPeople().then((res) => console.log("[People] [res]", res));
  return (
    <>
      <h1>People</h1>
    </>
  );
};

export default connect()(People);
