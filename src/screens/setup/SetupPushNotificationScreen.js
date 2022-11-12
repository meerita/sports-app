/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function SetupPushNotificationScreen(props) {
  return (
    <View>
      <Text>SetupPushNotification</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Push notifications permissions',
  };
};
