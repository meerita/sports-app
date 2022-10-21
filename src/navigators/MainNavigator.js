/** @format */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { t } from '../services/i18n';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

// NAVIGATORS
import MainBottomNavigation from './MainBottomNavigation';

// CONSTANTS
import Colors from '../constants/Colors';

// ************************************************
// SCREENS
// ************************************************

import GroupDetailNavigator, {
  screenOptions as GroupDetailNavigatorOptions,
} from '../navigators/GroupDetailNavigator';

import MembershipNavigator, {
  screenOptions as MembershipNavigatorOptions,
} from './MembershipNavigator';

// ************************************************
// USERDETAIL
// ************************************************

import UserDetailScreen, {
  screenOptions as UserDetailScreenOptions,
} from '../navigators/UserDetailNavigator';

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
// SETTINGS SCREENS / PRIVACY COOKIE
// ************************************************

import BasicCoockiesInfoScreen, {
  screenOptions as BasicCoockiesInfoScreenOption,
} from '../screens/settings/privacy/basicCookies/BasicCookiesInfoScreen';

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

// ************************************************
// ADD GROUP SCREENS
// ************************************************

import SelectSportScreen, {
  screenOptions as SelectSportScreenOptions,
} from '../screens/groups/addGroup/SelectSportScreen';

import CreateGroupResume, {
  screenOptions as CreateGroupResumeOptions,
} from '../screens/groups/addGroup/CreateGroupResume';

import AddGroupInfo, {
  screenOptions as AddGroupInfoOptions,
} from '../screens/groups/addGroup/AddGroupInfo';

// ************************************************
// ADD GROUP SCREENS
// ************************************************

import GroupSettingsScreen, {
  screenOptions as GroupSettingsScreenOptions,
} from '../screens/groups/settings/GroupSettingsScreen';

import GroupSettingsPrivacyScreen, {
  screenOptions as GroupSettingsPrivacyScreenOptions,
} from '../screens/groups/settings/GroupSettingsPrivacyScreen';

import GroupSettingsEventsScreen, {
  screenOptions as GroupSettingsEventsScreenOptions,
} from '../screens/groups/settings/GroupSettingsEventsScreen';

import GroupSettingsMembershipScreen, {
  screenOptions as GroupSettingsMembershipScreenOptions,
} from '../screens/groups/settings/GroupSettingsMembershipScreen';

import GroupSettingsInformationScreen, {
  screenOptions as GroupSettingsInformationScreenOptions,
} from '../screens/groups/settings/GroupSettingsInformationScreen';

import GroupSettingsInformationFormScreen, {
  screenOptions as GroupSettingsInformationFormScreenOptions,
} from '../screens/groups/settings/GroupSettingsInformationFormScreen/GroupSettingsInformationFormScreen';

import EventOptionsTypeOfActivitySelectorScreen, {
  screenOptions as EventOptionsTypeOfActivitySelectorScreenOptions,
} from '../screens/groups/settings/EventsOptions/EventOptionsTypeOfActivitySelectorScreen';

import EventOptionsCreationSelectorScreen, {
  screenOptions as EventOptionsCreationSelectorScreenOptions,
} from '../screens/groups/settings/EventsOptions/EventOptionsCreationSelectorScreen';

import EventOptionsGenderSelectorScreen, {
  screenOptions as EventOptionsGenderSelectorScreenOptions,
} from '../screens/groups/settings/EventsOptions/EventOptionsGenderSelectorScreen';

import EventOptionsParticipationSelectorScreen, {
  screenOptions as EventOptionsParticipationSelectorScreenOptions,
} from '../screens/groups/settings/EventsOptions/EventOptionsParticipationSelectorScreen';

import EventOptionsVisibilitySelectorScreen, {
  screenOptions as EventOptionsVisibilitySelectorScreenOptions,
} from '../screens/groups/settings/EventsOptions/EventOptionsVisibilitySelectorScreen';

import EventOptionsReplacementsSelectorScreen, {
  screenOptions as EventOptionsReplacementsSelectorScreenOptions,
} from '../screens/groups/settings/EventsOptions/EventOptionsReplacementsSelectorScreen';

import EventOptionsSkillsSelectorScreen, {
  screenOptions as EventOptionsSkillsSelectorScreenOptions,
} from '../screens/groups/settings/EventsOptions/EventOptionsSkillsSelectorScreen';

import EventDetailScreen, {
  screenOptions as EventDetailScreenOptions,
} from '../screens/events/EventDetailScreen';

// STORE
import { themeActions } from '../store/slices/theme';

export default function MainNavigator(props) {
  const dispatch = useDispatch();

  const me = useSelector(state => state.me.myData);

  const myDarkMode = useSelector(
    state => state.me.myData.settings.preferences.theme
  );

  useEffect(() => {
    dispatch(themeActions.changeTheme({ darkMode: myDarkMode }));
  }, [myDarkMode]);

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
        name='GroupMemberShipScreen'
        component={MembershipNavigator}
        options={MembershipNavigatorOptions}
      />
      <Stack.Screen
        name='UserDetailScreen'
        component={UserDetailScreen}
        options={UserDetailScreenOptions}
      />
      <Stack.Screen
        name='EventDetailScreen'
        component={EventDetailScreen}
        options={EventDetailScreenOptions}
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
        name='EventOptionsTypeOfActivitySelectorScreen'
        component={EventOptionsTypeOfActivitySelectorScreen}
        options={EventOptionsTypeOfActivitySelectorScreenOptions}
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
      <Stack.Screen
        name='SelectSportScreen'
        component={SelectSportScreen}
        options={SelectSportScreenOptions}
      />
      <Stack.Screen
        name='AddGroupInfo'
        component={AddGroupInfo}
        options={AddGroupInfoOptions}
      />
      <Stack.Screen
        name='CreateGroupResume'
        component={CreateGroupResume}
        options={CreateGroupResumeOptions}
      />
      <Stack.Screen
        name='GroupSettingsScreen'
        component={GroupSettingsScreen}
        options={GroupSettingsScreenOptions}
      />
      <Stack.Screen
        name='GroupSettingsPrivacyScreen'
        component={GroupSettingsPrivacyScreen}
        options={GroupSettingsPrivacyScreenOptions}
      />
      <Stack.Screen
        name='GroupSettingsEventsScreen'
        component={GroupSettingsEventsScreen}
        options={GroupSettingsEventsScreenOptions}
      />
      <Stack.Screen
        name='GroupSettingsMembershipScreen'
        component={GroupSettingsMembershipScreen}
        options={GroupSettingsMembershipScreenOptions}
      />
      <Stack.Screen
        name='GroupSettingsInformationScreen'
        component={GroupSettingsInformationScreen}
        options={GroupSettingsInformationScreenOptions}
      />
      <Stack.Screen
        name='GroupSettingsInformationFormScreen'
        component={GroupSettingsInformationFormScreen}
        options={GroupSettingsInformationFormScreenOptions}
      />
      <Stack.Screen
        name='EventOptionsCreationSelectorScreen'
        component={EventOptionsCreationSelectorScreen}
        options={EventOptionsCreationSelectorScreenOptions}
      />
      <Stack.Screen
        name='EventOptionsParticipationSelectorScreen'
        component={EventOptionsParticipationSelectorScreen}
        options={EventOptionsParticipationSelectorScreenOptions}
      />
      <Stack.Screen
        name='EventOptionsVisibilitySelectorScreen'
        component={EventOptionsVisibilitySelectorScreen}
        options={EventOptionsVisibilitySelectorScreenOptions}
      />
      <Stack.Screen
        name='EventOptionsReplacementsSelectorScreen'
        component={EventOptionsReplacementsSelectorScreen}
        options={EventOptionsReplacementsSelectorScreenOptions}
      />
      <Stack.Screen
        name='EventOptionsSkillsSelectorScreen'
        component={EventOptionsSkillsSelectorScreen}
        options={EventOptionsSkillsSelectorScreenOptions}
      />
      <Stack.Screen
        name='EventOptionsGenderSelectorScreen'
        component={EventOptionsGenderSelectorScreen}
        options={EventOptionsGenderSelectorScreenOptions}
      />
      <Stack.Screen
        name='BasicCoockiesInfoScreen'
        component={BasicCoockiesInfoScreen}
        options={BasicCoockiesInfoScreenOption}
      />
    </Stack.Navigator>
  );
}
