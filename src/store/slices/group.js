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
    updateReplacements(state, action) {
      state.groupDetail.preferences.events.replacements =
        action.payload.replacements;
    },
    updateSkill(state, action) {
      state.groupDetail.preferences.events.skill = action.payload.skill;
    },
    updateVisibility(state, action) {
      state.groupDetail.preferences.events.visibility =
        action.payload.visibility;
    },
    updateParticipation(state, action) {
      state.groupDetail.preferences.events.participation =
        action.payload.participation;
    },
    updateCreation(state, action) {
      state.groupDetail.preferences.events.creation = action.payload.creation;
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
