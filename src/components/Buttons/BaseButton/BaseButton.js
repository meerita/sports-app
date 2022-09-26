/** @format */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ProgressViewIOSComponent,
} from 'react-native';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

// COMPONENTS
import TextButton from '../../type/TextButton';

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
          ...Styles.button,
          elevation: 0,
          backgroundColor: darkMode
            ? Colors.dark.primary
            : Colors.light.primary,
          ...props.style,
        }}
      >
        <TextButton
          style={{
            ...props.textColor,
          }}
        >
          {props.children}
        </TextButton>
      </View>
    </ButtonComponent>
  );
}
