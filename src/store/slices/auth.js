/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    token: null,
    isAuthenticated: false,
    cookies: {
      analytics: false,
      marketing: false,
      others: false,
    },
    signUp: {
      docs: {
        terms: false,
        privacy: false,
        subscription: false,
      },
      cookies: {
        analytics: false,
        marketing: false,
        others: false,
      },
    },
  },
  reducers: {
    authenticate: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.userId = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateCookies: (state, action) => {
      state.cookies = action.payload;
    },
    signUpAcceptTerms: state => {
      state.signUp.docs.terms = !state.signUp.docs.terms;
    },
    signUpAcceptPrivacy: state => {
      state.signUp.docs.privacy = !state.signUp.docs.privacy;
    },
    signUpAcceptSubscription: state => {
      state.signUp.docs.subscription = !state.signUp.docs.subscription;
    },
    signUpAcceptAnalyticsCookies: state => {
      state.signUp.cookies.analytics = !state.signUp.cookies.analytics;
    },
    signUpAcceptMarketingCookies: state => {
      state.signUp.cookies.marketing = !state.signUp.cookies.marketing;
    },
    signUpAcceptOtherCookies: state => {
      state.signUp.cookies.others = !state.signUp.cookies.others;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
