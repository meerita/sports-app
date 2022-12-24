/** @format */

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { t } from '../services/i18n';
import { useSelector } from 'react-redux';
import React from 'react';

// CONSTANTS
import Colors from '../constants/Colors';

// SCREENS
import MeScreen from '../screens/me/MeScreen';

import MeEventsScreen, {
  screenOptions as MeEventsScreenOptions,
} from '../screens/me/MeEventsScreen';

export default function MeNavigator(props) {
  const Tabs = createMaterialTopTabNavigator();
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
      <Tabs.Screen name={t('common:info')} component={MeScreen} />
      <Tabs.Screen
        name={t('common:events')}
        component={MeEventsScreen}
        options={MeEventsScreenOptions}
      />
    </Tabs.Navigator>
  );
}
