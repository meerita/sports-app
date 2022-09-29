/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const exploreSlice = createSlice({
  name: 'explore',
  initialState: {
    sports: [],
  },
  reducers: {
    fetchAllSports(state, action) {
      state.sports = action.payload.sports;
    },
  },
});

export const exploreActions = exploreSlice.actions;

export default exploreSlice.reducer;
