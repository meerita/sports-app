/** @format */

import { configureStore } from '@reduxjs/toolkit';

// REDUCERS
import meReducer from './slices/meSlice';
import themeReducer from './slices/themeSlice';

export default configureStore({
  reducer: {
    me: meReducer,
    theme: themeReducer,
  },
});
