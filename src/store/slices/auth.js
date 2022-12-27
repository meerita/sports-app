/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: false,
    acceptedTerms: 0,
    acceptedPolicy: 0,
    acceptedSubcriptionTerms: 0,
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
    authenticate: state => {
      state.isAuthenticated = true;
    },
    logout: state => {
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
