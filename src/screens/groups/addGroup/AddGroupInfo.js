/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';

export default function AddGroupInfo(props) {
  return (
    <View>
      <Text>Here we put a title and description</Text>
      <ButtonFilled
        onPress={() => props.navigation.navigate('CreateGroupResume')}
      >
        Final
      </ButtonFilled>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Group information',
  };
};
