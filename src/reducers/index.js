import { combineReducers } from "redux";
import cartReducer from "./cart-reducer";
import loginReducer from "./login-reducer";
import registReducer from "./regist-reducer";
import reduxReducer from "./redux_reducer";
import { postsBySubreddit, selectedsubreddit } from "./subreddit-reducer";
import todosReducer from "./todos-reducer";
import visibilityFilter from "./visibilityFilter";

const allReducers = {
  cartReducer,
  todosReducer,
  visibilityFilter,
  loginReducer,
  postsBySubreddit,
  selectedsubreddit,
  reduxReducer,
  registReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
