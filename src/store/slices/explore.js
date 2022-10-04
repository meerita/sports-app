/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const exploreSlice = createSlice({
  name: 'explore',
  initialState: {
    sports: [],
    groupsBySport: [],
  },
  reducers: {
    fetchAllSports(state, action) {
      state.sports = action.payload.sports;
    },
    fetchGroupsBySport(state, action) {
      state.groupsBySport = action.payload.groups;
    },
  },
});

export const exploreActions = exploreSlice.actions;

export default exploreSlice.reducer;
