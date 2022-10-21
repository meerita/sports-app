/** @format */

import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';

// COMPONENTS
import Card from '../../Card';
import Caption from '../../type/Caption';
import SubtitleOne from '../../type/SubtitleOne';
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import BodyTwo from '../../type/BodyTwo';

export default function EventListItem(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <View style={{ ...props.style, marginBottom: 16 }}>
      <Card onPress={props.onPress}>
        <View
          style={{
            width: '100%',
            height: Dimensions.get('window').width / 2,
          }}
        >
          <Image
            source={{ uri: 'https://source.unsplash.com/random' }}
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
        </View>
        <View style={Styles.listDoubleContainer}>
          <Image
            style={{
              ...Styles.listLeadingIcon,
              tintColor: darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
              marginRight: 16,
            }}
            source={props.icon}
          />
          <View style={Styles.listDoubleContent}>
            <SubtitleOne>{props.title}</SubtitleOne>
            <BodyTwo>{props.subtitle}</BodyTwo>
          </View>
          <Caption style={Styles.listCaption}>{props.caption}</Caption>
        </View>
      </Card>
    </View>
  );
}
