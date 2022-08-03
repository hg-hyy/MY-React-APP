import axios from "axios";
export const SET_AUTH_TRUE = "SET_AUTH_TRUE";
export const SET_AUTH_FALSE = "SET_AUTH_FALSE";

let url = "http://127.0.0.1:8000/blog/postman/";

export const loginIn = (newUser) => (dispatch) => {
  axios
    .post(url, newUser)
    .then((res) => {
      dispatch({
        type: SET_AUTH_TRUE,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch(loginOut);
    });
};

export const loginOut = () => {
  return {
    type: SET_AUTH_FALSE,
    payload: false,
  };
};
