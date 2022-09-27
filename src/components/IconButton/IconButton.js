/** @format */

import {
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';

export default function IconButton(props) {
  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let Icon = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    Icon = TouchableNativeFeedback;
  }
  return (
    <Icon onPress={props.onPress}>
      <Image source={props.source} style={props.style} />
    </Icon>
  );
}
