/** @format */

import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';

export default function SuperContainer(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <View {...props} style={{ flex: 1 }}>
      <StatusBar animated={true} style='auto' />
      {props.children}
    </View>
  );
}
