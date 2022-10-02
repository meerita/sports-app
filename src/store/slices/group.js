/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupDetail: null,
  },
  reducers: {
    fetchGroup(state, action) {
      state.groupDetail = action.payload.group;
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
