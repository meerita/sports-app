/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function GroupInfoScreen(props) {
  return (
    <View>
      <Text>GroupInfoScreen</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Information',
  };
};
