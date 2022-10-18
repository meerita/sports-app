/** @format */

import { View, Text } from 'react-native';
import React from 'react';

export default function ParticipantContainer(props) {
  return (
    <View
      style={{
        ...props.style,
        paddingHorizontal: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {props.children}
    </View>
  );
}
