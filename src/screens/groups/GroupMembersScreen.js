/** @format */

import { View, Image, ScrollView, Dimensions, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// CONSTANTS
import SubHeader from '../../components/SubHeader/SubHeader';
import TwoLineWithAvatar from '../../components/Lists/TwoLines/TwoLineWithAvatar';

export default function GroupMembersScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);
  // currentGroup
  const group = useSelector(state => state.group.groupDetail);

  console.log('===============================');
  console.log('ADMINS');
  console.log('===============================');
  console.log(group.admins);
  console.log(group.members);
  console.log('===============================');
  console.log('ADMINS');
  console.log('===============================');

  // how many members this community has?
  const memberCount =
    group.members.length + group.admins.length + group.noobs.length;

  return (
    <View>
      <SubHeader title='Admins' />
      {group.admins.map(user => (
        <TwoLineWithAvatar
          key={user._id}
          title={user.username}
          subtitle={user.tag}
          avatar={{ uri: user.avatar }}
          onPress={() =>
            props.navigation.navigate('UserDetailScreen', {
              userId: user._id,
              username: user.username,
            })
          }
        />
      ))}
      <SubHeader title='Members' />
      {group.members.map(user => (
        <TwoLineWithAvatar
          key={user._id}
          title={user.username}
          subtitle={user.tag}
          avatar={{ uri: user.avatar }}
          onPress={() =>
            props.navigation.navigate('UserDetailScreen', {
              userId: user._id,
              username: user.username,
            })
          }
        />
      ))}
      <SubHeader title='n00bs' />
      {group.noobs.map(user => (
        <TwoLineWithAvatar
          key={user._id}
          title={user.username}
          subtitle={user.tag}
          avatar={{ uri: user.avatar }}
          onPress={() =>
            props.navigation.navigate('UserDetailScreen', {
              userId: user._id,
              username: user.username,
            })
          }
        />
      ))}
    </View>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Members',
  };
};
