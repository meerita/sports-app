/** @format */

import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

export default function BodyOne(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <Text
      style={{
        ...Styles.bodyOne,
        color: darkMode
          ? Colors.dark.OnSurfaceUnfocused
          : Colors.light.OnSurfaceUnfocused,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
}
