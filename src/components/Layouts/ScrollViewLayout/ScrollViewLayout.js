/** @format */

import { ScrollView } from 'react-native';
import React from 'react';
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';
import { useSelector } from 'react-redux';

export default function ScrollViewLayout(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ScrollView
      style={{
        ...props.style,
        ...Styles.body,
        paddingTop: 16,
        backgroundColor: darkMode
          ? Colors.dark.background
          : Colors.light.background,
      }}
    >
      {props.children}
    </ScrollView>
  );
}
