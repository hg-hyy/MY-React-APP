import { createSlice } from "@reduxjs/toolkit";
import undoable from "redux-undo";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [], visibilityFilter: "SHOW_ALL" },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: state.todos.length + 1,
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    setVisibilityFilter(state, action) {
      state.visibilityFilter = action.payload;
    },
    getVisibleTodos(state, action) {
      switch (action.payload) {
        case "SHOW_COMPLETED":
          return state.todos.filter((t) => t.completed);
        case "SHOW_ACTIVE":
          return state.todos.filter((t) => !t.completed);
        case "SHOW_ALL":
          return state.todos;
        default:
          return state.todos;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, toggleTodo, setVisibilityFilter, getVisibleTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
