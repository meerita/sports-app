/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../services/i18n';

export default function DeleteAccountScreen(props) {
  return (
    <View>
      <Text>{t('settings:deleteDesc')}</Text>
    </View>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: t('settings:delete'),
    presentation: 'modal',
  };
};
