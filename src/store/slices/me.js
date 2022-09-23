/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const meSlice = createSlice({
  name: 'me',
  initialState: {
    myData: null,
    myGroups: [],
  },
  reducers: {
    addMyGroups(state, action) {
      state.myGroups = action.payload.groups;
    },
    addMyUser(state, action) {
      state.myData = action.payload.user;
    },
  },
});

export const meActions = meSlice.actions;

export default meSlice.reducer;
