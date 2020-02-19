import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import AddTodo from "../../containers/AddTodo";
import VisibleTodoList from "../../containers/VisibleTodoList";
import UndoRedo from "../../containers/UndoRedo";
import FilterLink from "../../containers/FilterLink";
import { VisibilityFilters } from "../../actions/todo-actions";



function ToDo() {
  return (
    <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddTodo />
          <VisibleTodoList />
          <span>Show: </span>
          <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed
          </FilterLink>
          <UndoRedo />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ToDo;
