/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupDetail: null,
    groupEvents: [],
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
    addGroupEvents(state, action) {
      state.groupEvents = action.payload.events;
    },
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
    updateDiversity(state, action) {
      state.groupDetail.preferences.group.membership.diversity =
        action.payload.diversity;
    },
    updateRegistration(state, action) {
      state.groupDetail.preferences.group.membership.noRegistration =
        action.payload.noRegistration;
    },
    updateFreeToJoin(state, action) {
      state.groupDetail.preferences.group.membership.freeToJoin =
        action.payload.freeToJoin;
    },
    updateMembersOnly(state, action) {
      state.groupDetail.preferences.group.membership.membersOnly =
        action.payload.membersOnly;
    },
    updateVisibilityPrivate(state, action) {
      state.groupDetail.preferences.group.visibility.private =
        action.payload.private;
    },
    updateGroupVisibility(state, action) {
      state.groupDetail.preferences.group.visibility.visibility =
        action.payload.visibility;
    },
    updateGroupGender(state, action) {
      state.groupDetail.preferences.group.membership.diversity =
        action.payload.gender;
    },
    updateEventActivity(state, action) {
      state.groupDetail.preferences.events.activity = action.payload.activity;
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
