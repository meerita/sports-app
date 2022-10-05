/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';

export default function CreateGroupResume(props) {
  return (
    <View>
      <Text>createGroupResume</Text>
      <ButtonFilled onPress={() => props.navigation.popToTop()}>
        Create group
      </ButtonFilled>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Resume creation',
  };
};
