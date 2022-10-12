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
    changeMyWeight(state, action) {
      state.myData.characteristics.weight = action.payload.weight;
    },
    changeMyHeight(state, action) {
      state.myData.characteristics.height = action.payload.height;
    },
    changeMyWeightsPreferences(state, action) {
      state.myData.settings.preferences.weights = action.payload.weights;
    },
    changeMyDimensionsPreferences(state, action) {
      state.myData.settings.preferences.dimensions = action.payload.dimensions;
    },
    changeMySexPreferences(state, action) {
      state.myData.characteristics.gender = action.payload.gender;
    },
    changeMyUsername(state, action) {
      state.myData.username = action.payload.username;
    },
    changeMyDescription(state, action) {
      state.myData.description = action.payload.description;
    },
  },
});

export const meActions = meSlice.actions;

export default meSlice.reducer;
