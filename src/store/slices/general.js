/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    currentUpdatedTerms: 1,
  },
  reducers: {
    updateTerms: (state, action) => {
      state.updateTerms = payload.action;
    },
  },
});

export const generalActions = generalSlice.actions;

export default generalSlice.reducer;
