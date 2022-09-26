/** @format */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextButton from '../../../type/TextButton';
import Colors from '../../../../constants/Colors';
import BaseButton from '../BaseButton/BaseButton';

const ButtonTonal = props => {
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
      textColor={{ color: Colors.light.OnPrimaryVariantActive }}
      style={{ ...styles.tonal, ...styles.button, ...props.style }}
    >
      {props.children}
    </BaseButton>
  );
};

const styles = StyleSheet.create({
  tonal: {
    backgroundColor: Colors.light.primaryVariant,
  },
  button: {
    borderRadius: 3,
    padding: 4,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
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

export default ButtonTonal;
