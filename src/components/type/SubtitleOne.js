/** @format */

import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

export default function SubtitleOne(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <Text
      style={{
        ...Styles.subtitleOne,
        color: darkMode
          ? Colors.dark.OnSurfaceActive
          : Colors.light.OnSurfaceActive,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
}
