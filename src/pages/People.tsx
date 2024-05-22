import { connect } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getAllPeople } from "../store/people.duck";
import { useEffect } from "react";

type Props = {
  allPeople: any;
  onGetAllPeople: () => void;
};

const People: React.FC<Props> = ({ allPeople, onGetAllPeople }) => {
  useEffect(() => {
    onGetAllPeople();
  }, []);

  return (
    <>
      <h1>People</h1>
    </>
  );
};

export default connect(
  ({ people }: RootState) => {
    return { allPeople: people.allPeople };
  },
  (dispatch: AppDispatch) => {
    return { onGetAllPeople: () => dispatch(getAllPeople()) };
  }
)(People);
