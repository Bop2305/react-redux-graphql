import { connect } from "react-redux";
import { RootState } from "../store";

const People: React.FC<any> = ({ allPeople }) => {
  console.log("[People] [allPeople]", allPeople);
  return (
    <>
      <h1>People</h1>
    </>
  );
};

export default connect(({ people }: RootState) => {
  return { allPeople: people.allPeople };
})(People);
