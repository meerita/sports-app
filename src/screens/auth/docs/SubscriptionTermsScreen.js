/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function SubscriptionTermsScreen() {
  return (
    <View>
      <Text>TermsAndConditionsScreen</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Términos de suscripción',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
