/** @format */

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { t } from '../services/i18n';

// STORE & ACTIONS
import { fetchCurrentGroup } from '../store/actions/group';

// SCREENS
import GroupInfoScreen, {
  screenOptions as GroupInfoScreenOptions,
} from '../screens/groups/GroupInfoScreen';

import GroupMembersScreen, {
  screenOptions as GroupMembersScreenOptions,
} from '../screens/groups/GroupMembersScreen';

import GroupEventsScreen, {
  screenOptions as GroupEventsScreenOptions,
} from '../screens/groups/GroupEventsScreen';

import GroupTestScreen, {
  screenOptions as GroupTestScreenOptions,
} from '../screens/groups/GroupTestScreen';

import ButtonFilled from '../components/Buttons/Filled/ButtonFilled';
import SubtitleOne from '../components/type/SubtitleOne';
import HeadlineFive from '../components/type/HeadlineFive';
import IconButton from '../components/IconButton/IconButton';
import Colors from '../constants/Colors';
import ScrollViewLayout from '../components/Layouts/ScrollViewLayout/ScrollViewLayout';

const Tabs = createMaterialTopTabNavigator();

export default function GroupDetailNavigator(props) {
  // myData
  const me = useSelector(state => state.me.myData);

  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);

  // we capture the current groupId from the navigation prop
  const groupId = props.route.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchCurrentGroup(groupId));
    } catch (error) {
      console.log(error);
      props.navigation.popToTop();
    }
  }, [groupId]);

  const groupMembers = useSelector(state => state.group.groupDetail.members);
  const groupNoobs = useSelector(state => state.group.groupDetail.noobs);

  // We need to know if the visitor is a member of the group
  const isItMyGroup = groupMembers.find(member => member._id === me._id)
    ? true
    : groupNoobs.find(member => member._id === me._id)
    ? true
    : false;

  const currentGroup = useSelector(state => state.group.groupDetail);

  // TRUE or FALSE for visilibity means, TRUE everyone can see the group info, details, events, members, etc.
  // FALSE means only members of that group will be able to see, join or create events.
  const groupVisibility = currentGroup.preferences.group.visibility.visibility;

  // Groups can be MIXED, MALE or FEMALE sex based. If MIXED both males and females will be able to join
  // the others options means only people from one sex will be able to opt for an invitation or join
  const groupDiversity = currentGroup.preferences.group.membership.diversity;

  const currentVisitorGender = me.characteristics.gender;

  // registration policiy can be TRUE or FALSE
  // meaning TRUE that all new members must request an invitation to join
  // if FALSE, all new members can freely join the group if the Join Policy is TRUE
  const groupRegistrationPolicy =
    currentGroup.preferences.group.membership.noRegistration;

  // there are two options: false and true
  // TRUE means the admins allow people to freely join the group, no invitation required
  // everyone starts as noobs.
  const groupJoinPolicy = currentGroup.preferences.group.membership.freeToJoin;

  // simple operator to see if I can register thanks to my current Gender
  // if groupDiversity is Mixed, we just give TRUE by default. But if false, we check the group
  // matches with the current sex of the visitor
  const canIRegister =
    groupDiversity === 'mixed'
      ? true
      : currentVisitorGender === groupDiversity
      ? true
      : false;

  const amIbanned = currentGroup.banned.includes(me._id);

  if (amIbanned) {
    return (
      <View>
        <Text>Estás banneado de este grupo</Text>
      </View>
    );
  }

  // if the current visitor is NOT a member of this group we simply
  // check if the group visibility is FALSE, because if it false, we cannot
  // show any screen to that non-member
  if (isItMyGroup === false && groupVisibility === true) {
    return (
      <ScrollViewLayout style={{ padding: 16 }}>
        <HeadlineFive style={{ textAlign: 'center' }}>
          Este grupo sólo es visible a miembros registrados.
        </HeadlineFive>
        {
          // now we check if this visitor can request a registration by first checking
          // this group accepts registrations, if so, then can this user opt for registration
          // matching the group gender policy?
          // registration policy a false means the
          groupRegistrationPolicy === false && canIRegister === true ? (
            <ButtonFilled>Request join</ButtonFilled>
          ) : // Does the group accept free join or is based on invitation requests?
          canIRegister === true && groupJoinPolicy === true ? (
            <ButtonFilled>Join group</ButtonFilled>
          ) : null
        }
      </ScrollViewLayout>
    );
  }

  const tabOptions = {
    tabBarIndicatorStyle: {
      backgroundColor: darkMode ? Colors.dark.primary : Colors.light.primary,
    },
    tabBarActiveTintColor: darkMode
      ? Colors.dark.primary
      : Colors.light.primary,
    tabBarInactiveTintColor: darkMode
      ? Colors.dark.OnSurfaceUnfocused
      : Colors.light.OnSurfaceUnfocused,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: darkMode ? Colors.dark.surface : Colors.light.surface,
    },
  };

  if (isItMyGroup) {
    return (
      <Tabs.Navigator screenOptions={tabOptions}>
        <Tabs.Screen
          name={t('groups:settings.events.events')}
          component={GroupEventsScreen}
          options={GroupEventsScreenOptions}
        />
        <Tabs.Screen
          name={t('groups:settings.members')}
          component={GroupMembersScreen}
          options={GroupMembersScreenOptions}
        />
        <Tabs.Screen
          name={t('groups:settings.information.information')}
          component={GroupInfoScreen}
          options={GroupInfoScreenOptions}
        />
      </Tabs.Navigator>
    );
  }

  return (
    <Tabs.Navigator screenOptions={tabOptions}>
      <Tabs.Screen
        name={t('groups:settings.information.information')}
        component={GroupInfoScreen}
        options={GroupInfoScreenOptions}
      />

      {!currentGroup.preferences.group.visibility.private && (
        <>
          <Tabs.Screen
            name={t('groups:settings.events.events')}
            component={GroupEventsScreen}
            options={GroupEventsScreenOptions}
          />
          <Tabs.Screen
            name={t('groups:settings.members')}
            component={GroupMembersScreen}
            options={GroupMembersScreenOptions}
          />
        </>
      )}
    </Tabs.Navigator>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  const title = navData.route.params.title;
  return {
    headerTitle: title,
    headerShadowVisible: false,
    headerBackTitle: null,
    headerRight: color => {
      return (
        <IconButton
          source={require('../assets/images/icons/settings.png')}
          onPress={() => navData.navigation.navigate('GroupSettingsScreen')}
        />
      );
    },
  };
};
