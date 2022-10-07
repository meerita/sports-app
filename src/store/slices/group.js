/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupDetail: null,
    createNewGroup: {
      sportId: '',
      sportName: '',
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
    addSport(state, action) {
      state.createNewGroup.sportId = action.payload.sportId;
      state.createNewGroup.sportName = action.payload.sportName;
    },
    addTitleAndDescription(state, action) {
      state.createNewGroup.title = action.payload.title;
      state.createNewGroup.description = action.payload.description;
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
