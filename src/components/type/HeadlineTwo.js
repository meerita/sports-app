import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadlineTwo = props => {
  return <Text style={{...styles.text,...props.style}}>{ props.children }</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-Light',
    fontSize: 60,
    letterSpacing: -3,
    lineHeight: 72
  }
});

export default HeadlineTwo;