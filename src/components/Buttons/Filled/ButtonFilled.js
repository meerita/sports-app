/** @format */

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

// TEXT
import TextButton from '../../type/TextButton';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

// COMPONENTS
import BaseButton from '../BaseButton/BaseButton';

export default function ButtonFilled(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  return props.error ? (
    <View
      style={{
        ...Styles.button,
        backgroundColor: darkMode ? Colors.dark.error : Colors.light.error,
        ...props.style,
      }}
    >
      <TextButton
        style={{
          color: darkMode
            ? Colors.dark.OnErrorActive
            : Colors.light.OnErrorActive,
        }}
      >
        {props.children}
      </TextButton>
    </View>
  ) : props.loading ? (
    <View
      style={{
        ...Styles.button,
        backgroundColor: darkMode ? Colors.dark.primary : Colors.light.primary,
        ...props.style,
      }}
    >
      <TextButton
        style={{
          color: darkMode
            ? Colors.dark.OnPrimaryUnfocused
            : Colors.light.OnPrimaryUnfocused,
        }}
      >
        {props.children}
      </TextButton>
    </View>
  ) : props.disabled ? (
    <View
      style={{
        ...Styles.button,
        backgroundColor: darkMode
          ? Colors.dark.background
          : Colors.light.background,
      }}
    >
      <TextButton
        style={{
          color: darkMode
            ? Colors.dark.OnBackgroundDisabled
            : Colors.light.OnBackgroundDisabled,
        }}
      >
        {props.children}
      </TextButton>
    </View>
  ) : (
    <BaseButton
      onPress={props.onPress}
      textColor={{
        color: darkMode
          ? Colors.dark.OnPrimaryActive
          : Colors.light.OnPrimaryActive,
      }}
      style={{ ...props.style }}
    >
      {props.children}
    </BaseButton>
  );
}
