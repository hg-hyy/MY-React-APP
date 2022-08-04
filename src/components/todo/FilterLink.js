import React from "react";
import PropTypes from "prop-types";
import { setVisibilityFilter } from "../../reducers/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
export const FilterLink = ({ children, filter }) => {
  const dispatch = useDispatch();
  const visibilityFilter = useSelector(
    (state) => state.todoReducer.visibilityFilter
  );
  return (
    <Button
      variant="outlined"
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={visibilityFilter === filter}
      style={{
        marginLeft: "4px",
      }}
    >
      {children}
    </Button>
  );
};

FilterLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterLink;
