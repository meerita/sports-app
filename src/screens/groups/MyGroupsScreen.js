/** @format */
import { View, Text, Button } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/auth';

export default function MyGroupsScreen(props) {
  const me = useSelector(state => state.me.myData);
  const myGroups = useSelector(state => state.me.myGroups);
  const isAuth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <View>
      {myGroups.map(group => (
        <View key={group._id}>
          <Text>{group.title}</Text>
          <Text>{group.members.length + 'members'}</Text>
        </View>
      ))}
      <Button title='hola' onPress={() => logoutHandler()} />
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'My groups',
  };
};
