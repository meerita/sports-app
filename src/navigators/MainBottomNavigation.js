/** @format */

import { View, Text, Platform, Image } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { t } from '../services/i18n';

// COMPONENTS
import IconButton from '../components/IconButton/IconButton';

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

// NAVIGATORS
import MeNavigator from './MeNavigator';
import Colors from '../constants/Colors';

export default function MainBottomNavigation(props) {
  const me = useSelector(state => state.me.myData);

  // DARK MODE
  const darkMode = useSelector(state => state.theme.darkMode);

  // BOTTOM TAB BAR OPTIONS
  const tabBarOptions = {
    tabBarActiveTintColor: darkMode
      ? Colors.dark.primary
      : Colors.light.primary,
    tabBarInactiveTintColor: darkMode
      ? Colors.dark.OnSurfaceDisabled
      : Colors.light.OnSurfaceDisabled,
    tabBarHideOnKeyboard: true,
    headerStyle: {
      backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      shadowColor: darkMode ? Colors.dark.black : Colors.light.black,
      shadowOffset: {
        height: Platform.OS === 'ios' ? 3 : 0,
        width: 0,
      },
      shadowOpacity: 0.1,
      elevation: 20,
    },
    headerTitleStyle: {
      fontFamily: 'Barlow-Medium',
      letterSpacing: -0.3,
      fontSize: 20,
      color: darkMode
        ? Colors.dark.OnSurfaceActive
        : Colors.light.OnSurfaceActive,
    },
    tabBarStyle: {
      backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      borderTopWidth: 1,
      shadowOpacity: Platform.OS === 'ios' ? 0.2 : 1,
      borderTopColor: darkMode
        ? Colors.dark.onSurfaceShadow
        : Colors.light.onSurfaceShadow,
      elevation: 20,
      height: Platform.OS === 'ios' ? 90 : 60,
    },
    tabBarLabelStyle: {
      paddingTop: 0,
      paddingBottom: 8,
    },
  };

  return (
    <Tab.Navigator
      initialRouteName='Groups'
      activeColor={darkMode ? Colors.dark.primary : Colors.light.primary}
      inactiveColor={darkMode ? Colors.dark.error : Colors.light.error}
      labeled={true}
      shifting={false}
      screenOptions={tabBarOptions}
      barStyle={{
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      }}
    >
      <Tab.Screen
        name='Groups'
        component={MyGroupsScreen}
        options={{
          headerTitle: t('groups'),
          tabBarLabel: t('groups'),
          headerRight: color => {
            return (
              <IconButton
                source={require('../assets/images/icons/group_add.png')}
                onPress={() => props.navigation.navigate('SelectSportScreen')}
                style={{
                  marginRight: 16,
                  tintColor: darkMode
                    ? Colors.dark.OnSurfaceActive
                    : Colors.light.OnSurfaceActive,
                }}
              />
            );
          },
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/icons/groups.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Explore'
        component={ExploreScreen}
        options={{
          tabBarLabel: t('explore'),
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/icons/travel_explore.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Activity'
        component={ActivityScreen}
        options={{
          tabBarLabel: t('activity'),
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/icons/Notifications.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={me.username}
        component={MeNavigator}
        options={{
          title: me.username,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) =>
            me === null ? (
              <Image
                source={require('../assets/images/icons/question_mark.png')}
                style={{ tintColor: color }}
              />
            ) : me.characteristics.gender === 'male' ? (
              <Image
                source={require('../assets/images/icons/el.png')}
                style={{ tintColor: color }}
              />
            ) : me.characteristics.gender === 'female' ? (
              <Image
                source={require('../assets/images/icons/ella.png')}
                style={{ tintColor: color }}
              />
            ) : (
              <Image
                source={require('../assets/images/icons/question_mark.png')}
                style={{ tintColor: color }}
              />
            ),
          headerRight: color => {
            return (
              <IconButton
                source={require('../assets/images/icons/settings.png')}
                onPress={() => props.navigation.navigate('SettingsScreen')}
                style={{
                  marginRight: 16,
                  tintColor: darkMode
                    ? Colors.dark.OnSurfaceActive
                    : Colors.light.OnSurfaceActive,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
