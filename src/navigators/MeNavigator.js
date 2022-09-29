/** @format */

import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MeScreen, {
  screenOptions as MeScreenOptions,
} from '../screens/me/MeScreen';

import MeEventsScreen, {
  screenOptions as MeEventsScreenOptions,
} from '../screens/me/MeEventsScreen';

const Tabs = createMaterialTopTabNavigator();

export default function MeNavigator(props) {
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

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Login',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
