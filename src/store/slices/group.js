/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupDetail: null,
    createNewGroup: {
      sportId: '',
      title: '',
      description: '',
      country: 'es',
      city: 'Sant Adrià del Besòs',
    },
  },
  reducers: {
    fetchGroup(state, action) {
      state.groupDetail = action.payload.group;
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
