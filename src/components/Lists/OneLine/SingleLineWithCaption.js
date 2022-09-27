/** @format */

// BASE
import React from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// CONSTANTS
import Colors from '../../../constants/Colors';

// TYPE
import SubtitleOne from '../../type/SubtitleOne';
import Caption from '../../type/Caption';

const SingleLineWithCaption = props => {
  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let ListItem = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    ListItem = TouchableNativeFeedback;
  }
  return (
    <ListItem onPress={props.onPress}>
      <View style={styles.container}>
        <SubtitleOne style={styles.label}>{props.title}</SubtitleOne>
        <Caption style={styles.caption}>{props.caption}</Caption>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    // color: Colors.OnBackgroundActive,
    flexShrink: 4,
    flexGrow: 0,
    marginRight: 16,
  },
  caption: {
    // color: Colors.OnBackgroundUnfocused,
    flexGrow: 2,
    textAlign: 'right',
  },
});

export default SingleLineWithCaption;
