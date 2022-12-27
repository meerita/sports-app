/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function PrivacyPolicyScreen() {
  return (
    <View>
      <Text>TermsAndConditionsScreen</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Privacy Policy Screen',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
