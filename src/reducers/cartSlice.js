import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
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
  },
  reducers: {
    addToCart: (state, action) => {
      state.push({
        id: state.cart.length + 1,
        product: action.payload.product,
        quantity: action.payload.quantity,
        unitCost: action.payload.unitCost,
      });
    },
    updateCart: (state, action) => {
      state.cart.map((item) =>
        item.product === action.payload.product ? action.payload : item
      );
    },
    deleteFromCartByID: (state, action) => {
      state.cart.filter((item) => item.id !== action.payload.id);
    },
    deleteFromCart: (state, action) => {
      state.cart.filter((item) => item.product !== action.payload.product);
    },
    seleteFromCart: (state, action) => {
      state.cart.filter((item) => item.product === action.payload.product);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  updateCart,
  deleteFromCartByID,
  deleteFromCart,
  seleteFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
