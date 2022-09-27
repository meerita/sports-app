/** @format */

// BASE
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

// CONSTANTS
import Colors from '../../../../constants/Colors';

// TYPE
import SubtitleOne from '../../../type/SubtitleOne';
import BodyTwo from '../../../type/BodyTwo';
import Caption from '../../../type/Caption';

const TwoLineItemWithCaption = props => {
  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let ListItem = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    ListItem = TouchableNativeFeedback;
  }
  return (
    <ListItem onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <SubtitleOne>{props.title}</SubtitleOne>
          <BodyTwo>{props.subtitle}</BodyTwo>
        </View>
        <Caption>{props.caption}</Caption>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexShrink: 4,
    flexGrow: 0,
    marginRight: 16,
  },
  label: {
    color: Colors.background,
  },
  subtitle: {
    color: Colors.background,
  },
  caption: {
    color: Colors.background,
    flexGrow: 2,
    textAlign: 'right',
  },
});

export default TwoLineItemWithCaption;
