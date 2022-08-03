import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../../reducers/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    const uncompletedTodos = getVisibleTodos(
      state.todoReducer.todos,
      state.todoReducer.visibilityFilter
    );
    return uncompletedTodos;
  });

  function getVisibleTodos(todos, filter) {
    switch (filter) {
      case "SHOW_COMPLETED":
        return todos.filter((t) => t.completed);
      case "SHOW_ACTIVE":
        return todos.filter((t) => !t.completed);
      case "SHOW_ALL":
        return todos;
      default:
        return todos;
    }
  }

  return (
    <ul>
      {todos &&
        todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </li>
        ))}
    </ul>
  );
};

export default TodoList;
