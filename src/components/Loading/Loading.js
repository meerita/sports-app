/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';

export default function Loading() {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Progress.Bar
      indeterminate
      width={null}
      useNativeDriver={true}
      animated={true}
      animationType='spring'
      borderRadius={0}
      height={2}
      unfilledColor={
        darkMode ? Colors.dark.primaryVariant : Colors.light.primaryVariant
      }
      borderWidth={0}
      color={darkMode ? Colors.dark.primary : Colors.light.primary}
      indeterminateAnimationDuration={1000}
    />
  );
}
