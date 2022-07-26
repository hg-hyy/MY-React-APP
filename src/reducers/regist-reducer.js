import { SET_SIGN_UP, GET_ERRORS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: [],
};
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export default function registReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIGN_UP:
      return {
        //如果type类型匹配上就把最新的state赋给initialState中对应的属性,再返回至来源组件(login.js)
        ...state, //可能返回多个,所以用展开运算符
        user: action.payload, //把action下的payload更新至user
        isAuthenticated: !isEmpty(action.payload), //确认授权,为防止payload是空值所以还在判断一下
      };
    case GET_ERRORS: {
      return {
        ...state,
        errors: [action.payload],
      };
    }
    default:
      return state;
  }
}
