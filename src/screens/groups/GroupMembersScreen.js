/** @format */

import { View, Image, ScrollView, Dimensions, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// CONSTANTS
import SubHeader from '../../components/SubHeader/SubHeader';
import TwoLineWithAvatar from '../../components/Lists/TwoLines/TwoLineWithAvatar';
import BodyTwo from '../../components/type/BodyTwo';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';

export default function GroupMembersScreen(props) {
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);
  // currentGroup
  const group = useSelector(state => state.group.groupDetail);

  // how many members this community has?
  const memberCount =
    group.members.length + group.admins.length + group.noobs.length;

  return (
    <ScrollViewLayout>
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
      {group.noobs.length < 1 ? (
        <BodyTwo style={{ paddingHorizontal: 16 }}>
          No hay noobs, son todos basados en este grupo.
        </BodyTwo>
      ) : (
        group.noobs.map(user => (
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
        ))
      )}
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: 'Members',
  };
};
