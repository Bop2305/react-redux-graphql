import { connect } from "react-redux";
import { AppDispatch, RootState } from "../store";
import React from "react";

const Counter: React.FC<{
  value: string;
  onIncrease: any;
  onDecrease: any;
}> = ({ value, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>Counter</h1>
      <div>{value}</div>
      <button onClick={() => onIncrease()}>Increase</button>
      <button onClick={() => onDecrease()}>Decrease</button>
    </div>
  );
};

export default connect(
  ({ counter }: RootState) => ({
    value: counter.value,
  }),
  (dispatch: AppDispatch) => {
    return {
      onIncrease: () => dispatch({ type: "counter/incremented" }),
      onDecrease: () => dispatch({ type: "counter/decremented" }),
    };
  }
)(Counter);
