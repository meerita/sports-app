/** @format */
import { View, Text, Button } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function MyGroupsScreen(props) {
  const me = useSelector(state => state.me.myData);

  const dispatch = useDispatch();

  return (
    <View>
      <Text>My groups</Text>
      <Button
        title='hola'
        onPress={() => props.navigation.navigate('Settings')}
      />
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'My groups',
  };
};
