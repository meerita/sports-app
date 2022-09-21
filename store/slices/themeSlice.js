/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
  },
  reducers: {
    switchTheme: {
      // switch the theme
      changeTheme(state, action) {
        return {
          darkMode: action.theme,
        };
      },
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
