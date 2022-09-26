/** @format */

import { TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';
import React from 'react';

import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';

export default function Card(props) {
  let Card = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    Card = TouchableNativeFeedback;
  }

  // darkMode ?
  const darkMode = false;

  return (
    <View
      style={{
        ...Styles.cards,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...props.style,
      }}
    >
      <Card {...props}>
        <View>{props.children}</View>
      </Card>
    </View>
  );
}
