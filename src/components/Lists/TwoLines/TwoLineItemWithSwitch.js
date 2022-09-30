/** @format */

// BASE
import React from 'react';
import { View, Switch } from 'react-native';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

// TYPE
import SubtitleOne from '../../type/SubtitleOne';
import BodyTwo from '../../type/BodyTwo';
import ListItem from '../ListItem/ListItem';

export default function TwoLineItemWithSwitch(props) {
  return (
    <ListItem onPress={props.onPress}>
      <View style={Styles.listDoubleContainer}>
        <View style={Styles.listDoubleContent}>
          <SubtitleOne>{props.title}</SubtitleOne>
          <BodyTwo>{props.subtitle}</BodyTwo>
        </View>
        <View style={Styles.listSwitchView}>{props.children}</View>
      </View>
    </ListItem>
  );
}
