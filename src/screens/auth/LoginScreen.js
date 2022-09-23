/** @format */

import { View, Text, Button } from 'react-native';
import React from 'react';

export default function LoginScreen(props) {
  return (
    <View>
      <Text>LoginScreen</Text>
      <View>
        <Text>Email</Text>
        <Text>Password</Text>
        <Button title='login' />
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Login',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
