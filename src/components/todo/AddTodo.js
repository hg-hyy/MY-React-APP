import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../reducers/todoSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/Input";
import Box from "@mui/material/Box";
const AddTodo = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(addTodo(todo));
    e.preventDefault();
  };

  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <Box sx={{ p: 1 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-name"
          label="Name"
          value={todo}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Add Todo
        </Button>
      </form>
    </Box>
  );
};

export default AddTodo;
