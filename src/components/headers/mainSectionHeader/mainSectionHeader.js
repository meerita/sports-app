/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import HeadlineThree from '../../type/HeadlineThree';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';

export default function MainSectionHeader(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: props.menu === true ? 0 : 64,
        paddingBottom: 16,
      }}
    >
      <HeadlineThree
        style={{
          color: darkMode
            ? Colors.dark.OnBackgroundActive
            : Colors.light.OnBackgroundActive,
        }}
      >
        {props.title}
      </HeadlineThree>
    </View>
  );
}
