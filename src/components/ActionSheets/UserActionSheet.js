/** @format */

import React from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { View, Button } from 'react-native';
export default function UserActionSheet(props) {
  return (
    <View>
      <Button title='More actions' onPress={() => alert('Button pressed')} />
    </View>
  );
}
