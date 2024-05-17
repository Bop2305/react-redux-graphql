import { connect } from "react-redux";
import { AppDispatch, RootState } from "../store";
import React from "react";

const Counter: React.FC<{
  value: number;
  onIncrease: any;
  onDecrease: any;
}> = ({ value, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>Counter</h1>
      <div style={{ display: "flex" }}>
        <button onClick={() => onDecrease()}>-</button>
        <div style={{ padding: "0px 10px" }}>{value}</div>
        <button onClick={() => onIncrease()}>+</button>
      </div>
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
