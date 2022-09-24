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
      <Text>{'Usuario #' + me.userNumber}</Text>
      <Text>{me.verified ? 'It is admin' : 'Is not admin'}</Text>
      <Text>{me.isAdmin ? 'It is admin' : 'Is not admin'}</Text>
      <Text>{me.isSuscriber ? 'Is subscriber' : 'Is not subscriber'}</Text>
    </View>
  );
}
