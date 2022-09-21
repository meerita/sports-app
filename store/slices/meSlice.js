/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const meSlice = createSlice({
  name: 'me',
  initialState: {
    myData: {
      username: 'Minide',
      age: '20',
      email: 'meerita@icloud.com',
    },
  },
  reducers: {
    changeUsername: state => state,
  },
});

export const { changeUsername } = meSlice.actions;

export default meSlice.reducer;
