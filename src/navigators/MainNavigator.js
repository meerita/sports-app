/** @format */

import { t } from '../services/i18n';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import MainBottomNavigation from './MainBottomNavigation';

// ************************************************
// SCREENS
// ************************************************

import GroupDetailNavigator, {
  screenOptions as GroupDetailNavigatorOptions,
} from '../navigators/GroupDetailNavigator';

// ************************************************
// SETTINGS CREENS
// ************************************************

import SettingsScreen, {
  screenOptions as SettingScreenOption,
} from '../screens/settings/SettingsScreen';

import SettingsAccountScreen, {
  screenOptions as SettingsAccountScreenOption,
} from '../screens/settings/SettingsAccountScreen';

import SettingsProfileScreen, {
  screenOptions as SettingsProfileScreenOption,
} from '../screens/settings/SettingsProfileScreen';

import SettingsPreferencesScreen, {
  screenOptions as SettingsPreferencesScreenOption,
} from '../screens/settings/SettingsPreferencesScreen';

import SettingsPrivacyScreen, {
  screenOptions as SettingsPrivacyScreenOption,
} from '../screens/settings/SettingsPrivacyScreen';

import SettingsSubscriptionScreen from '../screens/settings/SettingsSubscriptionScreen';

import SettingsNotificationsScreen, {
  screenOptions as SettingsNotificationsScreenOption,
} from '../screens/settings/SettingsNotificationsScreen';

import SettingsFeedbackScreen, {
  screenOptions as SettingsFeedbackScreenOption,
} from '../screens/settings/SettingsFeedbackScreen';

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
        name='SettingsAccountScreen'
        component={SettingsAccountScreen}
        options={SettingsAccountScreenOption}
      />
      <Stack.Screen
        name='SettingsProfileScreen'
        component={SettingsProfileScreen}
        options={SettingsProfileScreenOption}
      />
      <Stack.Screen
        name='SettingsPreferencesScreen'
        component={SettingsPreferencesScreen}
        options={SettingsPreferencesScreenOption}
      />
      <Stack.Screen
        name='SettingsPrivacyScreen'
        component={SettingsPrivacyScreen}
        options={SettingsPrivacyScreenOption}
      />
      <Stack.Screen
        name='SettingsSubscriptionScreen'
        component={SettingsSubscriptionScreen}
        options={{
          headerTitle: t('settings:subscription.subscription'),
          presentation: 'modal',
          headerStyle: {
            backgroundColor: darkMode
              ? Colors.dark.primary
              : Colors.light.primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: darkMode
            ? Colors.dark.OnPrimaryActive
            : Colors.light.OnPrimaryActive,
          headerTitleStyle: {
            fontFamily: 'Barlow-Medium',
            letterSpacing: -0.3,
            fontSize: 20,
            color: darkMode
              ? Colors.dark.OnPrimaryActive
              : Colors.light.OnPrimaryActive,
          },
          headerBackTitleStyle: {
            fontFamily: 'Barlow-Medium',
            fontSize: 17,
            letterSpacing: -0.3,
            color: darkMode
              ? Colors.dark.OnPrimaryActive
              : Colors.light.OnPrimaryActive,
          },
        }}
      />
      <Stack.Screen
        name='SettingsNotificationsScreen'
        component={SettingsNotificationsScreen}
        options={SettingsNotificationsScreenOption}
      />
      <Stack.Screen
        name='SettingsFeedbackScreen'
        component={SettingsFeedbackScreen}
        options={SettingsFeedbackScreenOption}
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
