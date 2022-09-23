/** @format */

import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// PANTALLAS

import LoadingScreen from '../screens/LoadingScreen';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import MainBottomNavigation from './MainBottomNavigation';
import { useSelector } from 'react-redux';

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);

  const isAuth = useSelector(state => state.auth);

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
