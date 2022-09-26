import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SubtitleTwo = props => {
  return <Text style={{...styles.text,...props.style}}>{ props.children }</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20
  }
});

export default SubtitleTwo;