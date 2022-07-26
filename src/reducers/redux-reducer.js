// 对authAchtions.js返回回来的定义type类型进行判断成功后再把用户数据返回至组件
import { SET_AUTH_TRUE, SET_AUTH_FALSE } from "../actions/redux_actions";

const initialState = {
  isAuthenticated: false,
  data: {},
};

export default function reduxReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TRUE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_AUTH_FALSE:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}
