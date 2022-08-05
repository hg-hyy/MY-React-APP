import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, login } from "../../reducers/counterSlice";
import Tinymce from "./Tinymce";
export default function Counter() {
  const count = useSelector((state) => state.counterReducer.value);
  const isauth = useSelector((state) => state.counterReducer.isauth);
  const dispatch = useDispatch();

  return (
    <div className="m-3">
      <div className="d-flex flex-row m-3 justify-content-start  align-items-center align-self-center align-content-center">
        <span className="h3">{count}</span>
        <button
          className="btn btn-primary"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="btn btn-info"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="btn btn-success"
          aria-label="Increment value"
          onClick={() => dispatch(login())}
        >
          login
        </button>
        {isauth ? <span className="h3">true</span> : <div>false</div>}
      </div>
      <Tinymce />
    </div>
  );
}
