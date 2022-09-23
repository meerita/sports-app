/** @format */
import { View, Text, Button, Image, Dimensions } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function MeScreen(props) {
  const me = useSelector(state => state.me.myData);

  const dispatch = useDispatch();

  return (
    <View>
      <View style={{ width: '100%', height: Dimensions.get('window').width }}>
        <Image
          source={{ uri: me.avatar }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <Text>{me.description}</Text>
      <Text>{me.age}</Text>
      <Text>{me.email}</Text>
      <Button
        title='hola'
        onPress={() => props.navigation.navigate('Settings')}
      />
    </View>
  );
}
