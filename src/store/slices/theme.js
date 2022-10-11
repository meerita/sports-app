/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
  },
  reducers: {
    changeTheme(state, action) {
      state.darkMode = action.payload.darkMode;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
