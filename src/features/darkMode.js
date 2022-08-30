import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: { value: false },
  reducers: {
    toggleDarkMode: function (state, action) {
      if (state.value === false) {
        state.value = true;
      } else {
        state.value = false;
      }
    },
  },
});
export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
