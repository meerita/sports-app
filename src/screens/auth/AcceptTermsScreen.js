/** @format */

import { View, Text, Platform } from 'react-native';
import React from 'react';

// COMPONENTS
import Card from '../../components/Card';

export default function AcceptTermsScreen(props) {
  return (
    <View>
      <Card
        style={{ padding: 16 }}
        onPress={() => props.navigation.navigate('AcceptCookies')}
      >
        <Text>Tienes que aceptar términos</Text>
      </Card>
      <Text>Tienes que aceptar términos</Text>
      <Text>Términos y condiciones 1</Text>
      <Text>Política de Privacidad</Text>
      <Text>Términos de suscripción</Text>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Accept terms',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
