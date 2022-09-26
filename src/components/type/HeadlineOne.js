import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadlineOne = props => {
  return <Text style={{...styles.text,...props.style}}>{ props.children }</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-Light',
    fontSize: 96,
    letterSpacing: -5,
    lineHeight: 108
  }
});

export default HeadlineOne;