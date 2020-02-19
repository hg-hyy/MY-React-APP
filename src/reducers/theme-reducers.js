import { CHANGE_THEME} from "../actions/theme-actions";

const initialState = {
  color:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        color:action.payload
      };
    default:
      return state;
  }
}
