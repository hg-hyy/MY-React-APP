import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { img: null },
  reducers: {
    changeTheme(state, action) {
      state.img = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
