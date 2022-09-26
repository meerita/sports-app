/** @format */

import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../../../constants/Colors';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';

export default function BaseButton(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let ButtonComponent = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <ButtonComponent accessibilityRole='button' onPress={props.onPress}>
      <View
        style={{
          marginRight: 16,
          marginTop: 4,
          ...props.style,
        }}
      >
        <SubtitleOne
          style={{
            color: darkMode ? Colors.dark.primary : Colors.light.primary,
          }}
        >
          {props.children}
        </SubtitleOne>
      </View>
    </ButtonComponent>
  );
}
