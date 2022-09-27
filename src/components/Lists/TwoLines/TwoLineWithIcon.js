/** @format */

// BASE
import React from 'react';
import { Image, View } from 'react-native';

// CONSTANTS
import Styles from '../../../../constants/Styles';
import Colors from '../../../../constants/Colors';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';
import Caption from '../../../type/Caption';
import BodyTwo from '../../../type/BodyTwo';

// COMPONENTS
import ListItem from '../ListItem/ListItem';
import { useSelector } from 'react-redux';

export default function TwoLineWithIcon(props) {
  // darkMode ?
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <ListItem {...props} onPress={props.onPress}>
      <View style={Styles.listDoubleContainer}>
        <Image
          style={{
            ...Styles.listLeadingIcon,
            tintColor: darkMode
              ? Colors.dark.OnSurfaceUnfocused
              : Colors.light.OnSurfaceUnfocused,
          }}
          source={props.icon}
        />
        <View style={Styles.listDoubleContent}>
          <SubtitleOne>{props.title}</SubtitleOne>
          <BodyTwo>{props.subtitle}</BodyTwo>
        </View>
        <Caption style={Styles.listCaption}>{props.caption}</Caption>
      </View>
    </ListItem>
  );
}
