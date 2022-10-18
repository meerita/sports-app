/** @format */

import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import Card from '../../Card';
import SubtitleOne from '../../type/SubtitleOne';
import BodyTwo from '../../type/BodyTwo';
import Colors from '../../../constants/Colors';
import { useSelector } from 'react-redux';

export default function Participant(props) {
  const darkMode = useSelector(state => state.theme.darkMode);
  const isOrganizer = props.organizer;

  return (
    <View
      style={{
        width: Dimensions.get('window').width / 2 - 20,
        marginLeft: 8,
        marginBottom: 8,
      }}
    >
      <Card
        onPress={props.onPress}
        style={{
          backgroundColor: isOrganizer
            ? darkMode
              ? Colors.dark.primary
              : Colors.light.primary
            : darkMode
            ? Colors.dark.surface
            : Colors.light.surface,
        }}
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{
              width: '100%',
              height: 160,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
            source={{ uri: props.avatar }}
          />
        </View>
        <View
          style={{
            minHeight: 64,
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <SubtitleOne
            style={{
              color: isOrganizer
                ? darkMode
                  ? Colors.dark.OnPrimaryActive
                  : Colors.light.OnPrimaryActive
                : darkMode
                ? Colors.dark.OnSurfaceActive
                : Colors.light.OnSurfaceActive,
            }}
          >
            {props.username}
          </SubtitleOne>
          <BodyTwo
            style={{
              color: isOrganizer
                ? darkMode
                  ? Colors.dark.OnPrimaryUnfocused
                  : Colors.light.OnPrimaryUnfocused
                : darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          >
            {props.tag}
          </BodyTwo>
        </View>
      </Card>
    </View>
  );
}
