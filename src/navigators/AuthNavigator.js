/** @format */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import React from 'react';

// screens
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

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}
