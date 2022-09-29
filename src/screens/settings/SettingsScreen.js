/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function SettingsScreen(props) {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Settings',
    presentation: 'modal',
  };
};
