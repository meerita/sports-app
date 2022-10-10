/** @format */

import {
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

export default function IconButton(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let Icon = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    Icon = TouchableNativeFeedback;
  }

  return (
    <Icon onPress={props.onPress}>
      <Image
        source={props.source}
        style={{
          ...props.style,
          tintColor: darkMode
            ? Colors.dark.OnSurfaceActive
            : Colors.light.OnSurfaceActive,
        }}
      />
    </Icon>
  );
}
