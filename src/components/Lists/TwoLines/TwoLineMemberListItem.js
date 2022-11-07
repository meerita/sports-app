/** @format */

// BASE
import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Image,
} from 'react-native';

// CONSTANTS
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';

// TYPE
import SubtitleOne from '../../type/SubtitleOne';
import BodyTwo from '../../type/BodyTwo';
import { useSelector } from 'react-redux';

export default function TwoLineMemberListItem(props) {
  const darkMode = useSelector(state => state.theme.darkMode);

  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let ListItem = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    ListItem = TouchableNativeFeedback;
  }

  return (
    <ListItem onPress={props.onPress}>
      <View style={Styles.listDoubleContainer}>
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 16,
            flexGrow: 0,
            borderRadius: 512,
            overflow: 'hidden',
          }}
        >
          <Image
            source={props.avatar}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={Styles.listDoubleContent}>
          <SubtitleOne style={Styles.listTitle}>{props.title}</SubtitleOne>
          <BodyTwo style={Styles.listSubtitle}>{props.subtitle}</BodyTwo>
        </View>
        <View style={Styles.listActionView}>
          <Image
            style={{
              ...Styles.listAction,
              tintColor: darkMode
                ? Colors.dark.OnBackgroundActive
                : Colors.light.OnBackgroundActive,
            }}
            source={props.icon}
          />
        </View>
      </View>
    </ListItem>
  );
}
