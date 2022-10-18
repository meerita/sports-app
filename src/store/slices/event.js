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
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
