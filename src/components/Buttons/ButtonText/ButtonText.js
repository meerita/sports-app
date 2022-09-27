/** @format */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from '../../type/TextButton';
import Colors from '../../../constants/Colors';
import BaseButton from '../BaseButton/BaseButton';
import { useSelector } from 'react-redux';

export default function ButtonText(props) {
  // darkMode ?
  const darkMode = useSelector(state => state.theme.darkMode);

  return props.loading ? (
    <View
      {...props}
      style={{ ...styles.button, ...styles.loading, ...props.style }}
    >
      <TextButton style={styles.loadingText}>{props.children}</TextButton>
    </View>
  ) : props.disabled ? (
    <View {...props} style={{ ...styles.button, ...styles.disabled }}>
      <TextButton style={styles.disabledText}>{props.children}</TextButton>
    </View>
  ) : (
    <BaseButton
      {...props}
      textColor={{ color: Colors.light.OnSurfaceActive }}
      style={{ ...styles.text, ...styles.button, ...props.style }}
    >
      {props.children}
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 3,
    padding: 4,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  disabled: {
    backgroundColor: Colors.light.background,
  },
  disabledText: {
    color: Colors.light.OnBackgroundDisabled,
  },
  loading: {
    backgroundColor: Colors.light.primaryVariant,
  },
  loadingText: {
    color: Colors.light.OnPrimaryVariantUnfocused,
  },
});
