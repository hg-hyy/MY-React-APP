import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "../reducers/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  // let todos = useSelector((state) => state.todoReducer.todos);
  let todos = [];
  const visibilityFilter = useSelector(
    (state) => state.todoReducer.visibilityFilter
  );

  function getVisibleTodos(filter) {
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

  useEffect(() => {
    todos = getVisibleTodos(visibilityFilter);
    console.log(todos);
  }, [visibilityFilter]);

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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

export default TodoList;
