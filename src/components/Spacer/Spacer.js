/** @format */

import { View } from 'react-native';
import React from 'react';

export default function Spacer(props) {
  return (
    <View {...props} height={props.height ? parseInt(props.height) : 16}></View>
  );
}
