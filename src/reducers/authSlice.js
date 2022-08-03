import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
let login_api = "http://127.0.0.1:8000/blog/signIn";
let regist_api = "http://127.0.0.1:8000/blog/regist/";
const setAuthToken = (token) => {
  if (token) {
    // token存在设置header,因为后续每个请求都需要
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // 没有token就移除
    delete axios.defaults.headers.common["Authorization"];
  }
};
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

const logIn = createAsyncThunk("login", async (user) => {
  const response = await axios.get(login_api, {
    params: user,
  });
  return response.data;
});
const signUp = createAsyncThunk("signup", async (userData) => {
  const response = await axios.post(regist_api, userData);
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {},
    errors: [],
    error: null,
  },
  reducers: {
    getErrors: (state) => {
      return state.errors;
    },
    logOut: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {});
    builder.addCase(logIn.fulfilled, (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("jwToken", token);
      // 设置axios的headers token
      setAuthToken(token);
      // 解析token
      const decoded = jwt_decode(token);
      state.isAuthenticated = !isEmpty(decoded);
    });
    builder.addCase(logIn.rejected, (state, action) => {});
    builder.addCase(signUp.pending, (state, action) => {});
    builder.addCase(signUp.fulfilled, (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("jwToken", token);
      // 设置axios的headers token
      setAuthToken(token);
      // 解析token
      const decoded = jwt_decode(token);
      state.isAuthenticated = !isEmpty(decoded);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { getErrors, logOut } = authSlice.actions;
export { logIn, signUp };
export default authSlice.reducer;
