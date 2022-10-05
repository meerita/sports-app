/** @format */

import { View, Text, Button } from 'react-native';
import React from 'react';
import ButtonFilled from '../../../components/Buttons/Filled/ButtonFilled';

export default function SelectSportScreen(props) {
  return (
    <View>
      <Text>First select an sport that will represent your group</Text>
      <Text>Sport list here</Text>
      <ButtonFilled onPress={() => props.navigation.navigate('AddGroupInfo')}>
        Next
      </ButtonFilled>
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Select a sport',
  };
};
