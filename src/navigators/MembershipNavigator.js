/** @format */

import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MeScreen, {
  screenOptions as MeScreenOptions,
} from '../screens/me/MeScreen';

import MeEventsScreen, {
  screenOptions as MeEventsScreenOptions,
} from '../screens/me/MeEventsScreen';

import GroupMembersScreen, {
  screenOptions as GroupMembersScreenOptions,
} from '../screens/groups/GroupMembersScreen';

import GroupBannedScreen, {
  screenOptions as GroupBannedScreenOptions,
} from '../screens/groups/GroupBannedScreen';

import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';
import { t } from '../services/i18n';

const Tabs = createMaterialTopTabNavigator();

export default function MembershipNavigator(props) {
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
      <Tabs.Screen
        name={t('groups:settings.members')}
        component={GroupMembersScreen}
        options={GroupMembersScreenOptions}
      />
      <Tabs.Screen
        name={t('groups:settings.banned')}
        component={GroupBannedScreen}
        options={GroupBannedScreenOptions}
      />
    </Tabs.Navigator>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('groups:settings.members'),
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
    headerShadowVisible: false,
  };
};
