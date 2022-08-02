import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_LOGIN_IN, SET_LOGIN_OUT } from "./types";
let url = "http://127.0.0.1:8000/blog/signIn";

const setAuthToken = (token) => {
  if (token) {
    // token存在设置header,因为后续每个请求都需要
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // 没有token就移除
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const login = (userData) => (dispatch) => {
  console.log(userData);
  axios
    .get(url, {
      params: userData,
    })
    .then(
      (res) => {
        //对返回的token进行解构,并存储
        const { token } = res.data;
        if (token) {
          localStorage.setItem("jwToken", token);
          // 设置axios的headers token
          setAuthToken(token);
          // 解析token
          const decoded = jwt_decode(token);
          dispatch(loginIn(decoded));
        } else {
          dispatch(getErrors(res.data));
        }
      },
      (event) => {
        // 在登录息错误的时候用dispatch把信息返回回去
        console.log(event);
        dispatch(getErrors(event));
      }
    );
};

export const getErrors = (event) => {
  return {
    type: GET_ERRORS,
    payload: event,
  };
};

export const loginIn = (decoded) => {
  return {
    type: SET_LOGIN_IN,
    payload: decoded,
  };
};
export const loginOut = (islogin) => {
  localStorage.clear();
  return {
    type: SET_LOGIN_OUT,
    payload: islogin,
  };
};
