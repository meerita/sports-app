/** @format */

import { View, Text, Button } from 'react-native';
import React from 'react';

export default function SplashScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is an app</Text>
      <View style={{ padding: 16 }}>
        <Button
          title='Register'
          onPress={() => props.navigation.navigate('RegisterScreen')}
        />
        <Text> </Text>
        <Button
          title='Login'
          onPress={() => props.navigation.navigate('LoginScreen')}
        />
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Minide',
    // headerBackTitle: null,
    // presentation: 'modal',
  };
};
