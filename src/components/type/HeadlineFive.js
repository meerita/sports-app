/** @format */

import { Text } from 'react-native';
import React from 'react';

export default function HeadlineFive(props) {
  return (
    <Text
      style={{
        fontFamily: 'Barlow-Medium',
        fontSize: 24,
        letterSpacing: -0.5,
        lineHeight: 29,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
}
