import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    isauth: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    login: (state) => {
      state.isauth = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, login } =
  counterSlice.actions;

export default counterSlice.reducer;
