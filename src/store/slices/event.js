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
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
