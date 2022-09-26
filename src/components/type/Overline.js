/** @format */

// GENERICS
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

// CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

export default function Overline(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Text
      style={{
        ...Styles.overLine,
        color: darkMode
          ? Colors.dark.OnBackgroundActive
          : Colors.light.OnBackgroundActive,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
}
