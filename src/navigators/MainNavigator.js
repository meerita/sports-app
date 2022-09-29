/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import MainBottomNavigation from './MainBottomNavigation';

// ************************************************
// SCREENS
// ************************************************

import SettingsScreen, {
  screenOptions as SettingScreenOption,
} from '../screens/settings/SettingsScreen';

import GroupDetailNavigator, {
  screenOptions as GroupDetailNavigatorOptions,
} from '../navigators/GroupDetailNavigator';

// CONSTANTS
import Colors from '../constants/Colors';

export default function MainNavigator(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // ************************************************
  // DEFINITION OF THE STACK
  // ************************************************
  const Stack = createNativeStackNavigator();

  // ************************************************
  // OPTIONS OF THE STACK NAVIGATION
  // ************************************************

  const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: darkMode
      ? Colors.dark.OnSurfaceActive
      : Colors.light.OnSurfaceActive,
    headerTitleStyle: {
      fontFamily: 'Barlow-Medium',
      letterSpacing: -0.3,
      fontSize: 20,
      color: darkMode
        ? Colors.dark.OnSurfaceActive
        : Colors.light.OnSurfaceActive,
    },
    headerBackTitleStyle: {
      fontFamily: 'Barlow-Medium',
      fontSize: 17,
      letterSpacing: -0.3,
      color: darkMode
        ? Colors.dark.OnSurfaceActive
        : Colors.light.OnSurfaceActive,
    },
  };

  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name='BottomNavigation'
        component={MainBottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        options={SettingScreenOption}
      />
      <Stack.Screen
        name='GroupDetailScreen'
        component={GroupDetailNavigator}
        options={GroupDetailNavigatorOptions}
      />
    </Stack.Navigator>
  );
}
