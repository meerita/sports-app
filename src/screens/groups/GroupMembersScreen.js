/** @format */

import { View, Image, ScrollView, Dimensions, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';
import { useActionSheet } from '@expo/react-native-action-sheet';

// CONSTANTS
import SubHeader from '../../components/SubHeader/SubHeader';
import TwoLineWithAvatar from '../../components/Lists/TwoLines/TwoLineWithAvatar';
import BodyTwo from '../../components/type/BodyTwo';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import Colors from '../../constants/Colors';

// STORE
import {
  demoteAdminToMember,
  demoteMemberToNoob,
  kickUserFromGroup,
  leaveThisGroup,
  promoteMemberToAdmin,
  promoteNoobToMember,
} from '../../store/actions/group';

export default function GroupMembersScreen(props) {
  // me
  const me = useSelector(state => state.me.myData);

  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // currentGroup
  const group = useSelector(state => state.group.groupDetail);

  // am I an admin?
  const groupAdmin = group.admins.find(admin => admin._id === me._id);

  // user's actionsheet
  const { showActionSheetWithOptions } = useActionSheet();

  const dispatch = useDispatch();

  const menuOptions = {
    userInterfaceStyle: darkMode ? 'dark' : 'light',
    // message: data.tag,

    tintColor: darkMode ? Colors.OnSurfaceActive : Colors.light.OnSurfaceActive,
    tintIcons: true,
    containerStyle: {
      backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      paddingBottom: 16,
    },
    destructiveColor: darkMode ? Colors.dark.error : Colors.light.error,
    textStyle: {
      fontFamily: 'Barlow-Medium',
      fontSize: 16,
      color: Colors.light.OnSurfaceUnfocused,
    },
    titleTextStyle: {
      fontFamily: 'Barlow-SemiBold',
      fontSize: 18,
      margin: 0,
      padding: 0,
    },
  };

  const openAdminSheet = data => {
    // who's the superadmin in this group
    const superAdminId = group.admins[0]._id;

    const iAmASuperAdminOnMe =
      superAdminId === me._id && superAdminId === data.userId;

    const iAmASuperAdminOnOthers =
      superAdminId === me._id && superAdminId != data.userId;

    const iAmANormalAdminOnMe = me._id === data.userId;

    const iAmANormalAdminOnSuperAdmin =
      me._id != superAdminId && me._id != data.userId;

    console.log('iAmASuperAdminOnMe: ' + iAmASuperAdminOnMe);
    console.log('iAmASuperAdminOnOthers: ' + iAmASuperAdminOnOthers);
    console.log('iAmANormalAdminOnOthers: ' + iAmANormalAdminOnSuperAdmin);

    const options =
      iAmASuperAdminOnMe || iAmANormalAdminOnMe
        ? [t('groups:demoteMeAsAMember'), t('groups:leave'), t('common:close')]
        : iAmASuperAdminOnOthers
        ? [
            t('groups:demoteItAsAMember'),
            t('groups:kickFromGroup'),
            t('common:close'),
          ]
        : iAmANormalAdminOnSuperAdmin
        ? [t('common:close')]
        : [t('common:close')];

    const cancelButtonIndex =
      iAmASuperAdminOnMe || iAmANormalAdminOnMe || iAmASuperAdminOnOthers
        ? 2
        : 0; //Element number 2 in the array will be the 'Cancel' button

    const icons =
      iAmASuperAdminOnMe || iAmANormalAdminOnMe
        ? [
            <Image
              source={require('../../assets/images/icons/arrow_downward.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
            <Image
              source={require('../../assets/images/icons/logout.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
            <Image
              source={require('../../assets/images/icons/close.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
          ]
        : iAmASuperAdminOnOthers
        ? [
            <Image
              source={require('../../assets/images/icons/arrow_downward.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
            <Image
              source={require('../../assets/images/icons/block.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
            <Image
              source={require('../../assets/images/icons/close.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
          ]
        : iAmANormalAdminOnSuperAdmin
        ? [
            <Image
              source={require('../../assets/images/icons/close.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
          ]
        : [
            <Image
              source={require('../../assets/images/icons/close.png')}
              style={{
                tintColor: darkMode
                  ? Colors.dark.OnSurfaceUnfocused
                  : Colors.light.OnSurfaceUnfocused,
              }}
            />,
          ];

    showActionSheetWithOptions(
      {
        ...menuOptions,
        title: data.username,
        icons: icons,
        options,
        cancelButtonIndex, //the third button will be the 'Cancel' button
      },
      selectedIndex => {
        if (iAmASuperAdminOnMe || iAmANormalAdminOnMe) {
          switch (selectedIndex) {
            case 0:
              dispatch(
                demoteAdminToMember({ userId: data.userId, groupId: group._id })
              );
              break;
            case 1:
              dispatch(leaveThisGroup(group._id));
              props.navigation.popToTop();
              break;
          }
        }
        if (iAmASuperAdminOnOthers) {
          switch (selectedIndex) {
            case 0:
              dispatch(
                demoteAdminToMember({ userId: data.userId, groupId: group._id })
              );
              break;
            case 0:
              dispatch(
                kickUserFromGroup({ userId: data.userId, groupId: group._id })
              );
              break;
          }
        }
      }
    );
  };

  const openMembersSheet = data => {
    // Am I an admin?
    const amIAnAdmin = group.admins.find(admin => admin._id === data.userId);

    const options = amIAnAdmin
      ? [t('groups:leave'), t('common:close')]
      : [
          t('groups:promoteAsAnAdmin'),
          t('groups:demoteItAsANoob'),
          t('groups:kickFromGroup'),
          t('common:close'),
        ];

    // const destructiveButtonIndex = 0; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = amIAnAdmin ? 1 : 3; //Element number 2 in the array will be the 'Cancel' button
    const icons = amIAnAdmin
      ? [
          <Image
            source={require('../../assets/images/icons/logout.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          />,
          <Image
            source={require('../../assets/images/icons/close.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          />,
        ]
      : [
          <Image
            source={require('../../assets/images/icons/admin_panel.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          />,
          <Image
            source={require('../../assets/images/icons/arrow_downward.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          />,
          <Image
            source={require('../../assets/images/icons/block.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          />,
          <Image
            source={require('../../assets/images/icons/close.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnSurfaceUnfocused
                : Colors.light.OnSurfaceUnfocused,
            }}
          />,
        ];
    showActionSheetWithOptions(
      {
        ...menuOptions,
        title: data.username,
        icons: icons,
        options,
        cancelButtonIndex, //the third button will be the 'Cancel' button
        // destructiveButtonIndex, //the first button will be the 'Delete' option
      },
      selectedIndex => {
        if (amIAnAdmin) {
          switch (selectedIndex) {
            case 0:
              dispatch(leaveThisGroup(group._id));
              props.navigation.popToTop();
          }
        }

        if (!amIAnAdmin) {
          switch (selectedIndex) {
            case 0:
              dispatch(
                promoteMemberToAdmin({
                  userId: data.userId,
                  groupId: group._id,
                })
              );
              break;
            case 1:
              dispatch(
                demoteMemberToNoob({ userId: data.userId, groupId: group._id })
              );
              break;
            case 2:
              dispatch(
                kickUserFromGroup({ userId: data.userId, groupId: group._id })
              );
              break;
          }
        }
      }
    );
  };

  const openNoobSheet = data => {
    // Am I an admin?
    const amIAnAdmin = group.admins.find(admin => admin._id === data.userId);

    const options = [
      t('groups:promoteAsAMember'),
      t('groups:kickFromGroup'),
      t('common:close'),
    ];

    // const destructiveButtonIndex = 0; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = amIAnAdmin ? 1 : 3; //Element number 2 in the array will be the 'Cancel' button
    const icons = [
      <Image
        source={require('../../assets/images/icons/arrow_upward.png')}
        style={{
          tintColor: darkMode
            ? Colors.dark.OnSurfaceUnfocused
            : Colors.light.OnSurfaceUnfocused,
        }}
      />,
      <Image
        source={require('../../assets/images/icons/block.png')}
        style={{
          tintColor: darkMode
            ? Colors.dark.OnSurfaceUnfocused
            : Colors.light.OnSurfaceUnfocused,
        }}
      />,
      <Image
        source={require('../../assets/images/icons/close.png')}
        style={{
          tintColor: darkMode
            ? Colors.dark.OnSurfaceUnfocused
            : Colors.light.OnSurfaceUnfocused,
        }}
      />,
    ];
    showActionSheetWithOptions(
      {
        ...menuOptions,
        title: data.username,
        icons: icons,
        options,
        cancelButtonIndex, //the third button will be the 'Cancel' button
        // destructiveButtonIndex, //the first button will be the 'Delete' option
      },
      selectedIndex => {
        switch (selectedIndex) {
          case 0:
            dispatch(
              promoteNoobToMember({
                userId: data.userId,
                groupId: group._id,
              })
            );
            break;
          case 1:
            dispatch(
              kickUserFromGroup({ userId: data.userId, groupId: group._id })
            );
            break;
        }
      }
    );
  };

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      <SubHeader title={t('common:admins')} />
      {group.admins.map(user => (
        <TwoLineWithAvatar
          key={user._id}
          title={user.username}
          subtitle={user.tag}
          avatar={{ uri: user.avatar }}
          onLongPress={() =>
            groupAdmin
              ? openAdminSheet({
                  userId: user._id,
                  username: user.username,
                })
              : null
          }
          onPress={() =>
            props.navigation.navigate('UserDetailScreen', {
              userId: user._id,
              username: user.username,
            })
          }
        />
      ))}
      <SubHeader title={t('common:members')} />
      {group.members.map(user => (
        <TwoLineWithAvatar
          key={user._id}
          title={user.username}
          subtitle={user.tag}
          avatar={{ uri: user.avatar }}
          onLongPress={() =>
            groupAdmin
              ? openMembersSheet({
                  userId: user._id,
                  username: user.username,
                })
              : null
          }
          onPress={() =>
            props.navigation.navigate('UserDetailScreen', {
              userId: user._id,
              username: user.username,
            })
          }
        />
      ))}
      <SubHeader title={t('common:noobs')} />
      {group.noobs.length < 1 ? (
        <BodyTwo style={{ paddingHorizontal: 16 }}>
          No hay noobs, son todos basados en este grupo.
        </BodyTwo>
      ) : (
        group.noobs.map(noob => (
          <TwoLineWithAvatar
            key={noob._id}
            title={noob.username}
            subtitle={noob.tag}
            avatar={{ uri: noob.avatar }}
            onLongPress={() =>
              groupAdmin
                ? openNoobSheet({
                    userId: noob._id,
                    username: noob.username,
                  })
                : null
            }
            onPress={() =>
              props.navigation.navigate('UserDetailScreen', {
                userId: noob._id,
                username: noob.username,
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
    headerTitle: t('common:members'),
  };
};
