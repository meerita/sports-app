/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function GroupEventsScreen(props) {
  return (
    <View>
      <Text>GroupEventsScreen</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Events',
  };
};
