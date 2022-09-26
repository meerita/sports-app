import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadlineFive = props => {
  return <Text style={{...styles.text,...props.style}}>{ props.children }</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-Medium',
    fontSize: 24,
    letterSpacing: -0.5, 
    lineHeight: 29
  }
});

export default HeadlineFive;