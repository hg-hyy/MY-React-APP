import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../reducers/todoSlice";
const AddTodo = () => {
  let input;
  const dispatch = useDispatch();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <input ref={(node) => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
