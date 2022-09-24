/** @format */

import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// PANTALLAS

import LoadingScreen from '../screens/LoadingScreen';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import MainBottomNavigation from './MainBottomNavigation';
import { useDispatch, useSelector } from 'react-redux';
import MaintenanceScreen from '../screens/auth/MaintenanceScreen';

// STORE
import { fetchGlobalVariables } from '../store/actions/general';
import { fetchMyUser } from '../store/actions/me';

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth);

  const maintenance = useSelector(state => state.general.maintenance);

  const userId = '62385d8caee17d13a1762b39';

  useEffect(() => {
    dispatch(fetchMyUser(userId));
  }, []);

  // we will ask for globalvariables in this point
  useEffect(() => {
    dispatch(fetchGlobalVariables());
  }, []);

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

  // we load the app
  if (isAuth.isAuthenticated) {
    return <MainBottomNavigation />;
  }

  // the app itself
  return <MainNavigator />;
}
