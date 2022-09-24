/** @format */
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/slices/auth';

// COMPONENTS
import Card from '../../components/Card/';

export default function MyGroupsScreen(props) {
  const me = useSelector(state => state.me.myData);
  const myGroups = useSelector(state => state.me.myGroups);
  const isAuth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
    >
      {myGroups.map(group => (
        <Card
          key={group._id}
          onPress={() => logoutHandler()}
          style={{ marginBottom: 8 }}
        >
          <View
            style={{
              width: '100%',
              height: Dimensions.get('window').width / 2,
            }}
          >
            <Image
              source={{ uri: group.image }}
              style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
            <Text>{group.title}</Text>
            <Text>{group.members.length + 'members'}</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'My groups',
  };
};
