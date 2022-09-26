import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadlineSix = props => {
  return <Text style={{...styles.text,...props.style}}>{ props.children }</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-Medium',
    fontSize: 20,
    letterSpacing: -0.3,
    lineHeight: 24
  }
});

export default HeadlineSix;