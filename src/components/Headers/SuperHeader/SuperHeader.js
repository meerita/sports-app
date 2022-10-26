/** @format */

import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

// CONSTANTS
import Colors from '../../../constants/Colors';

export default function SuperHeader(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <View
      style={{
        shadowColor: darkMode ? Colors.dark.shadow : Colors.light.shadow,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        zIndex: 24,
        borderRadius: 0,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
}
