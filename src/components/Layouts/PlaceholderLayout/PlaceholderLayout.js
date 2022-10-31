/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function PlaceholderLayout(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
}
