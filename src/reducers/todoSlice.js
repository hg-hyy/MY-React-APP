import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import axios from "axios";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("http://127.0.0.1:8000/blog/todos");
  return response.todos;
});

export const saveNewTodo = createAsyncThunk(
  "todos/saveNewTodo",
  async (text) => {
    const initialTodo = { text };
    const response = await axios.post("http://127.0.0.1:8000/blog/todo/", {
      todo: initialTodo,
    });
    return response.data.todo;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [], visibilityFilter: "SHOW_ALL", status: null },
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
    todosLoading(state, action) {
      return {
        ...state,
        status: "loading",
      };
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload;
        state.todos[todoId].color = color;
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        };
      },
    },
    todoDeleted(state, action) {
      // delete state.todos[action.payload];
      state.todos = state.todos.filter((t) => {
        return t.id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const newEntities = {};
        action.payload.forEach((todo) => {
          newEntities[todo.id] = todo;
        });
        state.entities = newEntities;
        state.status = "idle";
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state.todos.push(todo);
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  getVisibleTodos,
  todosLoading,
  todoColorSelected,
  todoDeleted,
} = todoSlice.actions;

export default todoSlice.reducer;
