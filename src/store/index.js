/** @format */

import { configureStore } from '@reduxjs/toolkit';

// REDUCERS
import authReducer from './slices/auth';
import exploreReducer from './slices/explore';
import generalReducer from './slices/general';
import groupReducer from './slices/group';
import meReducer from './slices/me';
import themeReducer from './slices/theme';
import userReducer from './slices/user';

export default configureStore({
  reducer: {
    auth: authReducer,
    me: meReducer,
    theme: themeReducer,
    general: generalReducer,
    explore: exploreReducer,
    group: groupReducer,
    user: userReducer,
  },
});
