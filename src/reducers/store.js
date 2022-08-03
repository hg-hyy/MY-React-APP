import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import cartReducer from "./cart-reducer";
import loginReducer from "./login-reducer";
import registReducer from "./regist-reducer";
import reduxReducer from "./redux-reducer";
import themeReducer from "./theme-reducers";
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
  registReducer,
  themeReducer,
  counterReducer,
};

const rootReducer = combineReducers(allReducers);

// export  configureStore({
//   reducer: {
//     counterReducer,
//   },
// });

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
);
export default store;
