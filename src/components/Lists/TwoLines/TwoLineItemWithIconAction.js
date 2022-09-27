/** @format */

// BASE
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Switch,
  Image,
} from 'react-native';

// CONSTANTS
import Colors from '../../../../constants/Colors';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';
import BodyTwo from '../../../type/BodyTwo';
import Styles from '../../../../constants/Styles';

export default function TwoLineItemWithIconAction(props) {
  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let ListItem = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    ListItem = TouchableNativeFeedback;
  }

  return (
    <ListItem onPress={props.onPress}>
      <View style={Styles.listDoubleContainer}>
        <View style={Styles.listDoubleContent}>
          <SubtitleOne style={Styles.listTitle}>{props.title}</SubtitleOne>
          <BodyTwo style={Styles.listSubtitle}>{props.subtitle}</BodyTwo>
        </View>
        <View style={Styles.listActionView}>
          <Image style={Styles.listAction} source={props.icon} />
        </View>
      </View>
    </ListItem>
  );
}
