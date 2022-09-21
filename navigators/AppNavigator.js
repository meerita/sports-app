/** @format */

import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// PANTALLAS

import LoadingScreen from '../screens/LoadingScreen';

import AuthNavigator from '../navigators/AuthNavigator';
import MainNavigator from './MainNavigator';
import MainBottomNavigation from './MainBottomNavigation';

export default function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const bottomNav = true;

  // we load the app
  if (!initializing) {
    return <LoadingScreen />;
  }

  // in case we need to auth
  // we load the app
  if (!authenticated) {
    return <AuthNavigator />;
  }

  // we load the app
  if (!bottomNav) {
    return <MainBottomNavigation />;
  }

  // the app itself
  return <MainNavigator />;
}
