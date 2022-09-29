/** @format */

import { View, Text } from 'react-native';
import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GroupInfoScreen, {
  screenOptions as GroupInfoScreenOptions,
} from '../screens/groups/GroupInfoScreen';

import GroupMembersScreen, {
  screenOptions as GroupMembersScreenOptions,
} from '../screens/groups/GroupMembersScreen';

import GroupEventsScreen, {
  screenOptions as GroupEventsScreenOptions,
} from '../screens/groups/GroupEventsScreen';

const Tabs = createMaterialTopTabNavigator();

export default function GroupDetailNavigator(props) {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name='Info'
        component={GroupInfoScreen}
        options={GroupInfoScreenOptions}
      />
      <Tabs.Screen
        name='Events'
        component={GroupEventsScreen}
        options={GroupEventsScreenOptions}
      />
      <Tabs.Screen
        name='Members'
        component={GroupMembersScreen}
        options={GroupMembersScreenOptions}
      />
    </Tabs.Navigator>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  const title = navData.route.params.title;
  return {
    headerTitle: title,
    headerShadowVisible: false,
  };
};
