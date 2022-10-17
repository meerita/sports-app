/** @format */

import { View, Image, ScrollView, Dimensions, Text } from 'react-native';
import React, { useEffect } from 'react';
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
  promoteMemberToAdmin,
  promoteNoobToMember,
  unbanUserFromGroup,
} from '../../store/actions/group';

export default function GroupBannedScreen(props) {
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

  const openBannedSheet = data => {
    const options = [t('groups:unbanUser'), t('common:close')];
    // const destructiveButtonIndex = 0; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 1; //Element number 2 in the array will be the 'Cancel' button
    const icons = [
      <Image
        source={require('../../assets/images/icons/suspense.png')}
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
      },
      selectedIndex => {
        switch (selectedIndex) {
          case 0:
            dispatch(
              unbanUserFromGroup({
                userId: data.userId,
                groupId: group._id,
              })
            );
            break;
        }
      }
    );
  };

  return (
    <ScrollViewLayout style={{ paddingVertical: 16 }}>
      {group.banned.length < 1 ? (
        <BodyTwo style={{ paddingHorizontal: 16 }}>
          No hay banneds, son todos basados en este grupo.
        </BodyTwo>
      ) : (
        group.banned.map(noob => (
          <TwoLineWithAvatar
            key={noob._id}
            title={noob.username}
            subtitle={noob.tag}
            avatar={{ uri: noob.avatar }}
            onLongPress={() =>
              groupAdmin
                ? openBannedSheet({
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
    headerTitle: 'Members',
  };
};
