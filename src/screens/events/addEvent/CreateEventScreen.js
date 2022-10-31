/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function CreateEventScreen(props) {
  return (
    <View>
      <Text>This is the create event screen bitches</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Create an event',
  };
};
