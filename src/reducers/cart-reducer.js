import {
  ADD_TO_CART,
  UPDATE_CART,
  DELETE_FROM_CART,
  DELETE_FROM_CART_ID,
  SELETE_FROM_CART,
} from "../actions/cart-actions";

const initialState = {
  cart: [
    {
      product: "bread 700g",
      quantity: 2,
      unitCost: 32,
      id: 1,
    },
    {
      product: "milk 500ml",
      quantity: 100,
      unitCost: 3.8,
      id: 2,
    },
    {
      product: "egg 500g",
      quantity: 50,
      unitCost: 1,
      id: 3,
    },
  ],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }

    case UPDATE_CART: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product === action.payload.product ? action.payload : item
        ),
      };
    }

    case DELETE_FROM_CART_ID: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    }
    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.product !== action.payload.product
        ),
      };
    }
    case SELETE_FROM_CART: {
      // return {
      //   ...state,
      //   cart: state.cart.filter(item => item.product == action.payload.product)
      // }
      return {
        cart: state.cart.filter(
          (item) => item.product === action.payload.product
        ),
      };
    }

    default:
      return state;
  }
}
