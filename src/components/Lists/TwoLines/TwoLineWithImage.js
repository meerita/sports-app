/** @format */

// BASE
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

// CONSTANTS
import Colors from '../../../../constants/Colors';
import Styles from '../../../../constants/Styles';

// COMPONENTS
import ListItem from '../ListItem/ListItem';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';
import Caption from '../../../type/Caption';
import BodyTwo from '../../../type/BodyTwo';

export default function TwoLineWithImage(props) {
  return (
    <ListItem onPress={props.onPress}>
      <View style={Styles.listDoubleContainer}>
        <View style={Styles.listImageContainer}>
          <Image style={Styles.listImage} source={props.image} />
        </View>
        <View style={Styles.listDoubleContent}>
          <SubtitleOne>{props.title}</SubtitleOne>
          <BodyTwo>{props.subtitle}</BodyTwo>
        </View>
        <Caption style={Styles.listCaption}>{props.caption}</Caption>
      </View>
    </ListItem>
  );
}
