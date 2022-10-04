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
//
// EXPLORE SCREENS
//
// ************************************************

import ExploreGroupsBySport, {
  screenOptions as ExploreGroupsBySportOptions,
} from '../screens/explore/ExploreGroupsBySport';

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

// ************************************************
// SETTINGS SCREENS / ACCOUNT
// ************************************************

import ChangePasswordScreen, {
  screenOptions as ChangePasswordScreenOption,
} from '../screens/settings/account/ChangePasswordScreen';

import ChangeEmailScreen, {
  screenOptions as ChangeEmailScreenOption,
} from '../screens/settings/account/ChangeEmailScreen';

import DeleteAccountScreen, {
  screenOptions as DeleteAccountScreenOption,
} from '../screens/settings/account/DeleteAccountScreen';

// ************************************************
// SETTINGS SCREENS / PROFILE
// ************************************************

import BasicInformationScreen, {
  screenOptions as BasicInformationScreenOption,
} from '../screens/settings/profile/BasicInformationScreen';

import BasicInformationUsernameScreen, {
  screenOptions as BasicInformationUsernameScreenOption,
} from '../screens/settings/profile/info/BasicInformationUsernameScreen';

import BasicInformationTagScreen, {
  screenOptions as BasicInformationTagScreenOption,
} from '../screens/settings/profile/info/BasicInformationTagScreen';

import BasicInformationDescriptionScreen, {
  screenOptions as BasicInformationDescriptionScreenOption,
} from '../screens/settings/profile/info/BasicInformationDescriptionScreen';

import BasicInformationGenderScreen, {
  screenOptions as BasicInformationGenderScreenOption,
} from '../screens/settings/profile/info/BasicInformationGenderScreen';

import BasicInformationWeightHeightScreen, {
  screenOptions as BasicInformationWeightHeightScreenOption,
} from '../screens/settings/profile/info/BasicInformationWeightHeightScreen';

import BasicInformationWeightSelectorScreen, {
  screenOptions as BasicInformationWeightSelectorScreenOption,
} from '../screens/settings/profile/info/weightHeight/BasicInformationWeightSelectorScreen';

import BasicInformationHeightSelectorScreen, {
  screenOptions as BasicInformationHeightSelectorScreenOption,
} from '../screens/settings/profile/info/weightHeight/BasicInformationHeightSelectorScreen';

// ************************************************
// SETTINGS SCREENS / PREFERENCES
// ************************************************

import PreferencesDimensionsScreen, {
  screenOptions as PreferencesDimensionsScreenOption,
} from '../screens/settings/preferences/PreferencesDimensionsScreen';

import PreferencesWeightScreen, {
  screenOptions as PreferencesWeightScreenOption,
} from '../screens/settings/preferences/PreferencesWeightScreen';

import PreferencesThemeScreen, {
  screenOptions as PreferencesThemeScreenOption,
} from '../screens/settings/preferences/PreferencesThemeScreen';

// CONSTANTS
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

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
      letterSpacing: -0.4,
      fontSize: Platform.OS === 'android' ? 18 : 20,
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
        name='PreferencesDimensionsScreen'
        component={PreferencesDimensionsScreen}
        options={PreferencesDimensionsScreenOption}
      />
      <Stack.Screen
        name='PreferencesWeightScreen'
        component={PreferencesWeightScreen}
        options={PreferencesWeightScreenOption}
      />
      <Stack.Screen
        name='PreferencesThemeScreen'
        component={PreferencesThemeScreen}
        options={PreferencesThemeScreenOption}
      />
      <Stack.Screen
        name='ChangePasswordScreen'
        component={ChangePasswordScreen}
        options={ChangePasswordScreenOption}
      />
      <Stack.Screen
        name='ChangeEmailScreen'
        component={ChangeEmailScreen}
        options={ChangeEmailScreenOption}
      />
      <Stack.Screen
        name='DeleteAccountScreen'
        component={DeleteAccountScreen}
        options={DeleteAccountScreenOption}
      />
      <Stack.Screen
        name='BasicInformationScreen'
        component={BasicInformationScreen}
        options={BasicInformationScreenOption}
      />
      <Stack.Screen
        name='BasicInformationUsernameScreen'
        component={BasicInformationUsernameScreen}
        options={BasicInformationUsernameScreenOption}
      />
      <Stack.Screen
        name='BasicInformationTagScreen'
        component={BasicInformationTagScreen}
        options={BasicInformationTagScreenOption}
      />
      <Stack.Screen
        name='BasicInformationDescriptionScreen'
        component={BasicInformationDescriptionScreen}
        options={BasicInformationDescriptionScreenOption}
      />
      <Stack.Screen
        name='BasicInformationGenderScreen'
        component={BasicInformationGenderScreen}
        options={BasicInformationGenderScreenOption}
      />
      <Stack.Screen
        name='BasicInformationWeightHeightScreen'
        component={BasicInformationWeightHeightScreen}
        options={BasicInformationWeightHeightScreenOption}
      />
      <Stack.Screen
        name='BasicInformationWeightSelectorScreen'
        component={BasicInformationWeightSelectorScreen}
        options={BasicInformationWeightSelectorScreenOption}
      />
      <Stack.Screen
        name='BasicInformationHeightSelectorScreen'
        component={BasicInformationHeightSelectorScreen}
        options={BasicInformationHeightSelectorScreenOption}
      />
      <Stack.Screen
        name='GroupDetailScreen'
        component={GroupDetailNavigator}
        options={GroupDetailNavigatorOptions}
      />
      <Stack.Screen
        name='ExploreGroupsBySport'
        component={ExploreGroupsBySport}
        options={ExploreGroupsBySportOptions}
      />
    </Stack.Navigator>
  );
}
