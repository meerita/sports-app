/** @format */

import { View, Text, Platform } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

import MyGroupsScreen, {
  screenOptions as MyGroupsScreenOptions,
} from '../screens/groups/MyGroupsScreen';

import ExploreScreen, {
  screenOptions as ExploreScreenOptions,
} from '../screens/explore/ExploreScreen';

import ActivityScreen, {
  screenOptions as ActivityScreenOptions,
} from '../screens/activity/ActivityScreen';

import MeScreen, {
  screenOptions as MeScreenOptions,
} from '../screens/me/MeScreen';

import MeNavigator from './MeNavigator';

export default function MainBottomNavigation() {
  const me = useSelector(state => state.me.myData);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Groups'
        component={MyGroupsScreen}
        options={MyGroupsScreenOptions}
      />
      <Tab.Screen
        name='Explore'
        component={ExploreScreen}
        options={ExploreScreenOptions}
      />
      <Tab.Screen
        name='Activity'
        component={ActivityScreen}
        options={ActivityScreenOptions}
      />
      <Tab.Screen
        name={me.username}
        component={MeNavigator}
        options={{ title: me.username || 'User' }}
      />
    </Tab.Navigator>
  );
}
