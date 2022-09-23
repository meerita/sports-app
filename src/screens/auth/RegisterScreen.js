/** @format */

import { View, Text, Button, Platform } from 'react-native';
import React from 'react';

export default function RegisterScreen(props) {
  return (
    <View>
      <Text>RegisterScreen</Text>
      <View>
        <Text>Email</Text>
        <Text>Repeat Email</Text>
        <Text>Password</Text>
        <Button title='Register' />
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Register an account',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
