/** @format */

import { Platform, Switch } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//CONSTANTS
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

export default function SwitchControl(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Switch
      thumbColor={
        props.value
          ? darkMode
            ? Platform.OS === 'ios'
              ? Colors.dark.surface
              : Colors.dark.primary
            : Platform.OS === 'ios'
            ? Colors.light.surface
            : Colors.light.primary
          : darkMode
          ? Colors.dark.surface
          : Colors.light.surface
      }
      trackColor={{
        true:
          Platform.OS === 'ios'
            ? darkMode
              ? Colors.dark.primary
              : Colors.light.primary
            : darkMode
            ? Colors.dark.shadow
            : Colors.light.shadow,
        false:
          Platform.OS === 'ios'
            ? darkMode
              ? Colors.dark.primary
              : Colors.light.shadow
            : darkMode
            ? Colors.dark.shadow
            : Colors.light.shadow,
      }}
      style={Styles.switchControl}
      onChange={props.onChange}
      value={props.value}
    />
  );
}
