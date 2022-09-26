/** @format */

import { View, Text, Button, Platform } from 'react-native';
import { t } from '../../services/i18n';
import React from 'react';

// COMPONENTS
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';

export default function RegisterScreen(props) {
  const hola = 0;

  return (
    <View>
      <Text>
        {hola === 1
          ? t('groups:petitions_one', { count: hola })
          : t('groups:petitions_other', { count: hola })}
      </Text>
      <View>
        <Text>Email</Text>
        <Text>Repeat Email</Text>
        <Text>Passworda</Text>
        <ButtonFilled>Hola</ButtonFilled>
        <Button title='Register' />
      </View>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Register an account',
    // headerBackTitle: null,
    presentation: Platform.OS === 'android' ? 'card' : 'modal',
  };
};
