/** @format */

import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// PANTALLAS
import LoadingScreen from '../screens/LoadingScreen';
import MaintenanceScreen from '../screens/auth/MaintenanceScreen';

// NAVIGATORS
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import MainBottomNavigation from './MainBottomNavigation';

// STORE
import { fetchGlobalVariables } from '../store/actions/general';
import { fetchMyUser } from '../store/actions/me';
import { changeMyDarkMode } from '../store/actions/theme';

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth);

  const maintenance = useSelector(state => state.general.maintenance);

  // const userId = '62385d8caee17d13a1762b39';
  const userId = '623b5d3d7e4216025e7210fd';
  // const userId = '631a1d63644135c5f00dca63';
  // const userId = '6238a480170aff10d16ccd86';

  const me = useSelector(state => state.me.myData);

  useEffect(() => {
    dispatch(fetchMyUser(userId));
  }, [dispatch]);

  // we will ask for globalvariables in this point
  useEffect(() => {
    dispatch(fetchGlobalVariables());
  }, [dispatch]);

  if (maintenance) {
    return <MaintenanceScreen />;
  }

  // we load the app
  if (!initializing) {
    return <LoadingScreen />;
  }

  // in case we need to auth
  // we load the app
  if (!isAuth.isAuthenticated) {
    return <AuthNavigator />;
  }

  // the app itself
  return <MainNavigator />;
}
