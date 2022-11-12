/** @format */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// ************************************************
// SCREENS
// ************************************************
import SplashScreen, {
  screenOptions as SplashScreenOptions,
} from '../screens/auth/SplashScreen';
import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from '../screens/auth/LoginScreen';
import RegisterScreen, {
  screenOptions as RegisterScreenOptions,
} from '../screens/auth/RegisterScreen';
import AcceptTermsScreen, {
  screenOptions as AcceptTermsScreenOptions,
} from '../screens/auth/AcceptTermsScreen';
import AcceptCookiesScreen, {
  screenOptions as AcceptCookiesScreenOptions,
} from '../screens/auth/AcceptCookiesScreen';
import Colors from '../constants/Colors';

import SetupPushNotificationScreen, {
  screenOptions as SetupPushNotificationScreenOptions,
} from '../screens/setup/SetupPushNotificationScreen';

export default function AuthNavigator() {
  // Definition of the stack
  const Stack = createNativeStackNavigator();

  // Options of the stack
  const defaultAuthNavigationOptions = {
    headerStyle: {
      backgroundColor: Colors.light.surface,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: Colors.light.OnSurfaceActive,
    headerTitleStyle: {
      fontFamily: 'Barlow-Medium',
      letterSpacing: -0.4,
      fontSize: 20,
      lineHeight: 22,
    },
  };

  return (
    <Stack.Navigator screenOptions={defaultAuthNavigationOptions}>
      <Stack.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={SplashScreenOptions}
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={RegisterScreenOptions}
      />
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={LoginScreenOptions}
      />
      <Stack.Screen
        name='AcceptTermsScreen'
        component={AcceptTermsScreen}
        options={AcceptTermsScreenOptions}
      />
      <Stack.Screen
        name='AcceptCookies'
        component={AcceptCookiesScreen}
        options={AcceptCookiesScreenOptions}
      />
      <Stack.Screen
        name='SetupPushNotificationScreen'
        component={SetupPushNotificationScreen}
        options={SetupPushNotificationScreenOptions}
      />
    </Stack.Navigator>
  );
}
