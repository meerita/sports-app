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
import Colors from '../../../constants/Colors';

// TYPE
import SubtitleOne from '../../type/SubtitleOne';
import BodyTwo from '../../type/BodyTwo';

const TwoLineItemLongerText = props => {
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
        <BodyTwo style={styles.subtitle}>{props.subtitle}</BodyTwo>
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
  },
  label: {
    color: Colors.background,
  },
  subtitle: {
    color: Colors.OnSurfaceDisabled,
  },
});

export default TwoLineItemLongerText;
