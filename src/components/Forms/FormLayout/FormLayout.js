/** @format */

import { ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

export default function FormLayout(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ScrollView
      style={{
        ...Styles.body,
        backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
        ...Styles.formPadded,
      }}
    >
      {props.children}
    </ScrollView>
  );
}
