import { CHANGE_THEME } from "../actions/theme-actions";

const initialState = {
  img: null,
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        img: action.payload,
      };
    default:
      return state;
  }
}
