/** @format */

import { configureStore } from '@reduxjs/toolkit';

// REDUCERS
import authReducer from './slices/auth';
import generalReducer from './slices/general';
import meReducer from './slices/me';
import themeReducer from './slices/theme';

export default configureStore({
  reducer: {
    auth: authReducer,
    me: meReducer,
    theme: themeReducer,
    general: generalReducer,
  },
});
