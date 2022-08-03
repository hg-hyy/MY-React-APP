import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let url = "http://127.0.0.1:8000/blog/postman/";

export const reduxSlice = createSlice({
  name: "cart",
  initialState: {
    isAuthenticated: true,
    data: { email: "1021509854@qq.com" },
  },
  reducers: {
    loginIn: (state, action) => {
      axios
        .post(url, action.newUser)
        .then((res) => {
          state = res.data;
        })
        .catch((e) => {
          loginOut();
        });
    },
    loginOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginIn, loginOut } = reduxSlice.actions;

export default reduxSlice.reducer;
