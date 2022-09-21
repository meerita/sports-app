/** @format */
import { View, Text, Button } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function MeScreen(props) {
  const me = useSelector(state => state.me.myData);

  const dispatch = useDispatch();

  return (
    <View>
      <Text>{me.username}</Text>
      <Text>{me.age}</Text>
      <Text>{me.email}</Text>
      <Button
        title='hola'
        onPress={() => props.navigation.navigate('Settings')}
      />
    </View>
  );
}
