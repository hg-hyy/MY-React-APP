import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, login } from "../../reducers/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counterReducer.value);
  const isauth = useSelector((state) => state.counterReducer.isauth);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button aria-label="Increment value" onClick={() => dispatch(login())}>
          login
        </button>
        <span>{count}</span>
        {isauth ? <span>true</span> : <div>false</div>}
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
