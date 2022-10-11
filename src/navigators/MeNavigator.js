/** @format */

import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MeScreen, {
  screenOptions as MeScreenOptions,
} from '../screens/me/MeScreen';

import MeEventsScreen, {
  screenOptions as MeEventsScreenOptions,
} from '../screens/me/MeEventsScreen';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';

const Tabs = createMaterialTopTabNavigator();

export default function MeNavigator(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  const tabOptions = {
    tabBarIndicatorStyle: {
      backgroundColor: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    tabBarActiveTintColor: darkMode
      ? Colors.dark.primary
      : Colors.light.primary,
    tabBarInactiveTintColor: darkMode
      ? Colors.dark.OnSurfaceUnfocused
      : Colors.light.OnSurfaceUnfocused,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
    },
  };

  return (
    <Tabs.Navigator screenOptions={tabOptions}>
      <Tabs.Screen name='Me' component={MeScreen} options={MeScreenOptions} />
      <Tabs.Screen
        name='Events'
        component={MeEventsScreen}
        options={MeEventsScreenOptions}
      />
    </Tabs.Navigator>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Login',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
