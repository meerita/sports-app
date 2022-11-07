/** @format */

import { TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ListItem(props) {
  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let Item = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    Item = TouchableNativeFeedback;
  }
  return <Item {...props}>{props.children}</Item>;
}
