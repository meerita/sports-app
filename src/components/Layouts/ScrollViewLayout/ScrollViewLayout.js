/** @format */

import { Platform, ScrollView } from 'react-native';
import React from 'react';
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

export default function ScrollViewLayout(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode
          ? Colors.dark.background
          : Colors.light.background,
        ...props.style,
      }}
    >
      <StatusBar
        style={darkMode ? 'light' : 'dark'}
        backgroundColor={
          Platform.OS === 'android' && darkMode
            ? Colors.dark.background
            : Colors.light.background
        }
      />
      {props.children}
    </ScrollView>
  );
}
