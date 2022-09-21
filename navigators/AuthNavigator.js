/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
    </Stack.Navigator>
  );
}
