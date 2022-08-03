import React from "react";
import PropTypes from "prop-types";
import { setVisibilityFilter } from "../reducers/todoSlice";
import { useDispatch, useSelector } from "react-redux";
export const FilterLink = ({ children, filter }) => {
  const dispatch = useDispatch();
  const visibilityFilter = useSelector(
    (state) => state.todoReducer.visibilityFilter
  );
  return (
    <button
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={visibilityFilter === filter}
      style={{
        marginLeft: "4px",
      }}
    >
      {children}
    </button>
  );
};

FilterLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilterLink;
