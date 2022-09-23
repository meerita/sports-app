/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    currentUpdatedTerms: null,
    version: null,
    login: false,
    register: false,
    maintenance: true,
  },
  reducers: {
    updateVariables: (state, action) => {
      state.currentUpdatedTerms = action.payload.currentUpdatedTerms;
      state.version = action.payload.version;
      state.register = action.payload.register;
      state.login = action.payload.login;
      state.maintenance = action.payload.maintenance;
    },
  },
});

export const generalActions = generalSlice.actions;

export default generalSlice.reducer;
