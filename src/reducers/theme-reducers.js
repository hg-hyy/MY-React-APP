import { CHANGE_THEME } from "../actions/theme-actions";

const initialState = {
  color: "blue",
  img: "",
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        color: action.payload,
        img: action.payload,
      };
    default:
      return state;
  }
}
