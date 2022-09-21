/** @format */

import { View, Text } from 'react-native';
import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MeScreen, {
  screenOptions as MeScreenOptions,
} from '../screens/me/MeScreen';

import MeEventsScreen, {
  screenOptions as MeEventsScreenOptions,
} from '../screens/me/MeEventsScreen';

const Tabs = createMaterialTopTabNavigator();

export default function MeNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Me' component={MeScreen} options={MeScreenOptions} />
      <Tabs.Screen
        name='Events'
        component={MeEventsScreen}
        options={MeEventsScreenOptions}
      />
    </Tabs.Navigator>
  );
}
