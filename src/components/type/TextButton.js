/** @format */

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextButton = props => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
});

export default TextButton;
