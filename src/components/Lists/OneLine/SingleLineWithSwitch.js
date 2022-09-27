/** @format */

// BASE
import React, { useState } from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Switch,
} from 'react-native';

// CONSTANTS
import Styles from '../../../../constants/Styles';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';

// COMPONENTS
import ListItem from '../ListItem/ListItem';

export default function SingleLineWithSwitch(props) {
  return (
    <ListItem>
      <View style={Styles.listSingleCointainer}>
        <SubtitleOne style={Styles.listTitle}>{props.title}</SubtitleOne>
        <View style={Styles.listSwitchView}>{props.children}</View>
      </View>
    </ListItem>
  );
}
