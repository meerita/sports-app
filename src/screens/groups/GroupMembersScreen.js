/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function GroupMembersScreen(props) {
  return (
    <View>
      <Text>GroupMembersScreen</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Members',
  };
};
