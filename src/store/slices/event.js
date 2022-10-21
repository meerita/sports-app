/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    eventDetail: null,
  },
  reducers: {
    addEventDetail(state, action) {
      state.eventDetail = action.payload.event;
    },
    changeVisibility(state, action) {
      state.eventDetail.visibility = action.payload.visibility;
    },
    changeSkill(state, action) {
      state.eventDetail.skill = action.payload.skill;
    },
    changeGender(state, action) {
      state.eventDetail.allowedGender = action.payload.gender;
    },
    changeParticipation(state, action) {
      state.eventDetail.allowedParticipants =
        action.payload.allowedParticipants;
    },
    changeActivity(state, action) {
      state.eventDetail.activity = action.payload.activity;
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
