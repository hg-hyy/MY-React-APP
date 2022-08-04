import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, todoDeleted } from "../../reducers/todoSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
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

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ bgcolor: "background.paper", maxWidth: 500, p: 1 }}>
      {todos &&
        todos.map(
          (todo) =>
            todo && (
              <ListItem
                alignItems="flex-start"
                key={todo.id}
                color="primary"
                onClick={() => dispatch(toggleTodo(todo.id))}
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="comment"
                    onClick={(e) => {
                      dispatch(todoDeleted(todo.id));
                      e.stopPropagation();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                </ListItemIcon>

                <ListItemText
                  primary={todo.text}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
        )}
    </List>
  );
};

export default TodoList;
