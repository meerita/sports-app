/** @format */

import { View, Text, Button } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';

export default function UserList(props) {
  const users = useSelector(state => state.group.groupDetail);

  // console.log(users);
  // console.log('hola');

  if (!users) {
    return (
      <View>
        <Text>No hay usuarios</Text>
      </View>
    );
  }

  return (
    <View>
      {users.members.map(user => (
        <ButtonFilled
          key={user._id}
          style={{ margin: 8 }}
          onPress={() =>
            props.navigation.navigate('NewUserDetailScreen', {
              userId: user._id,
              username: user.username,
            })
          }
        >
          {user.username}
        </ButtonFilled>
      ))}
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Users list',
  };
};
