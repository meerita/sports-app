/** @format */

import React from 'react';
import { Text, StyleSheet } from 'react-native';
const HeadlineFour = props => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-Regular',
    fontSize: 34,
    letterSpacing: -1.5,
    lineHeight: 41,
  },
});

export default HeadlineFour;
