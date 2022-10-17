/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userProfileData: null,
  },
  reducers: {
    setCurrenUserProfile(state, action) {
      state.userProfileData = action.payload.user;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
