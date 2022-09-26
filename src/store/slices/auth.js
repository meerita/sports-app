/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: false,
    acceptedTerms: 0,
    cookies: {
      analytics: false,
      marketing: false,
      others: false,
    },
  },
  reducers: {
    authenticate: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
    updateCookies: (state, action) => {
      state.cookies = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
