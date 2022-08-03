import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import reduxReducer from "./reduxSlice";
import themeReducer from "./themeSlice";
import todoReducer from "./todoSlice";

export default configureStore({
  reducer: {
    cartReducer,
    todoReducer,
    authReducer,
    reduxReducer,
    themeReducer,
    counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
