/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import MainBottomNavigation from '../navigators/MainBottomNavigation';

import SettingsScreen, {
  screenOptions as SettingScreenOption,
} from '../screens/settings/SettingsScreen';

export default function MainNavigator(props) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomNavigation'
        component={MainBottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={SettingScreenOption}
      />
    </Stack.Navigator>
  );
}
