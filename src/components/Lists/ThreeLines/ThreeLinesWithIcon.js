/** @format */

import { View, Text, Image } from 'react-native';
import React from 'react';
import ListItem from '../ListItem/ListItem';
import SubtitleOne from '../../type/SubtitleOne';
import BodyTwo from '../../type/BodyTwo';
import BodyOne from '../../type/BodyOne';
import { useSelector } from 'react-redux';
import Colors from '../../../constants/Colors';

export default function ThreeLinesWithIcon(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ListItem {...props} onPress={props.onPress}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Image
          source={props.icon}
          style={{
            width: 24,
            height: 24,
            marginRight: 32,
            flexGrow: 0,
            tintColor: darkMode
              ? Colors.dark.OnSurfaceUnfocused
              : Colors.light.OnSurfaceUnfocused,
          }}
        />
        <View style={{ flexShrink: 5, flexGrow: 5, marginRight: 16 }}>
          <BodyTwo>{props.subtitle}</BodyTwo>
          <SubtitleOne>{props.title}</SubtitleOne>
          <BodyTwo>{props.caption}</BodyTwo>
        </View>
      </View>
    </ListItem>
  );
}
