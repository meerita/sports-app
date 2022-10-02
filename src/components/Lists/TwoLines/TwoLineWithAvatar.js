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
import Colors from '../../../constants/Colors';

// TYPE
import SubtitleOne from '../../type/SubtitleOne';
import Caption from '../../type/Caption';
import BodyTwo from '../../type/BodyTwo';

const TwoLineWithAvatar = props => {
  // we define a variable to use TouchableOpacity or NaviteWithFeedback
  let ListItem = TouchableOpacity;
  // if the platform is android, then we use TouchableNativeFeedback
  if (Platform.OS === 'android') {
    ListItem = TouchableNativeFeedback;
  }
  return (
    <ListItem onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={props.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <SubtitleOne style={styles.label}>{props.title}</SubtitleOne>
          <BodyTwo style={styles.subtitle}>{props.subtitle}</BodyTwo>
        </View>
        <Caption style={styles.caption}>{props.caption}</Caption>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
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
    // color: Colors.OnBackgroundActive,
  },
  subtitle: {
    // color: Colors.OnBackgroundUnfocused,
  },
  caption: {
    // color: Colors.OnBackgroundUnfocused,
    flexGrow: 2,
    textAlign: 'right',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    marginRight: 32,
    flexGrow: 0,
    borderRadius: 512,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});

export default TwoLineWithAvatar;
