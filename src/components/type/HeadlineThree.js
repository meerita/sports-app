import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadlineThree = props => {
  return <Text style={{...styles.text,...props.style}}>{ props.children }</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-Regular',
    fontSize: 48,
    letterSpacing: -2.5,
    lineHeight: 56
  }
});

export default HeadlineThree;