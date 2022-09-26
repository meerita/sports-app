/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import Card from '../../components/Card';

export default function AcceptCookiesScreen(props) {
  return (
    <View>
      <Text>
        Por favor accepta nuestras cookies porque así podemos trackearte, puedes
        sacar el consentimiento cuando quieras.
      </Text>
      <Card
        style={{ padding: 16 }}
        onPress={() => props.navigation.navigate('RegisterScreen')}
      >
        <Text>Cookie 1</Text>

        <Text>Cookie 2</Text>
        <Text>Cookie 3</Text>
      </Card>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Cookies acceptance',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
