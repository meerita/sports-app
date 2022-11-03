/** @format */

import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';
import { FloatingAction } from 'react-native-floating-action';
import moment from 'moment';

// COMPONENTS
import SubtitleOne from '../../components/type/SubtitleOne';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import TwoLineWithIcon from '../../components/Lists/TwoLines/TwoLineWithIcon';
import SubHeader from '../../components/SubHeader/SubHeader';
import EventListItem from '../../components/Lists/EventListItem/EventListItem';
import PlaceholderLayout from '../../components/Layouts/PlaceholderLayout/PlaceholderLayout';

// STORE
import { getGroupEvents } from '../../store/actions/group';

// CONSTANTS
import Colors from '../../constants/Colors';
import HeadlineFive from '../../components/type/HeadlineFive';
import { createIconSetFromFontello } from 'react-native-vector-icons';

export default function GroupEventsScreen(props) {
  const me = useSelector(state => state.me.myData);
  // darkMode
  const darkMode = useSelector(state => state.theme.darkMode);
  // currentGroup
  const group = useSelector(state => state.group.groupDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupEvents(group._id));
  }, [group]);

  // events in the group
  const groupEvents = useSelector(state => state.group.groupEvents);

  const newEvents = groupEvents.filter(group => group.open);

  const pastEvents = groupEvents.filter(group => group.open === false);

  // see if I am admin of the group
  const amIAdminOfThisGroup = group.admins.find(admin => admin._id === me._id);

  // am I a member of the group who organizes the event?
  const amIMemberOfThisGroup = group.members.find(
    member => member._id === me._id
  );
  // console.log(amIMemberOfThisGroup ? 'I AM MEMBER' : 'I AM NOT MEMBER');

  // am I a member of the group who organizes the event?
  const amINoobOfThisGroup = group.noobs.find(noob => noob._id === me._id);
  // console.log(amINoobOfThisGroup ? 'I AM NOOB' : 'I AM NOT NOOB');

  // I belong to this group?
  const iBelongToThisGroup =
    amIAdminOfThisGroup || amINoobOfThisGroup || amIMemberOfThisGroup;

  const creationPolicy = group.preferences.events.creation;

  const canCreate = amIAdminOfThisGroup
    ? true
    : creationPolicy === 'only-members' && amIMemberOfThisGroup
    ? true
    : creationPolicy === 'any-member' && iBelongToThisGroup
    ? true
    : creationPolicy === 'anyone'
    ? true
    : false;

  const darkModeOption = darkMode
    ? Colors.dark.secondary
    : Colors.light.secondary;

  const coreActions = {
    create: {
      text: 'Create',
      icon: require('../../assets/images/icons/event.png'),
      name: 'bt_create',
      position: 1,
      color: darkModeOption,
    },
  };

  let myActions = [coreActions.create];

  const eventFloatingButtonActions = name => {
    switch (name) {
      case 'bt_create':
        props.navigation.navigate('CreateEventScreen');
        break;
    }
  };

  if (groupEvents.length < 1) {
    return (
      <>
        <PlaceholderLayout>
          <Image
            source={require('../../assets/images/placeholders/event_placeholder.png')}
            style={{
              tintColor: darkMode
                ? Colors.dark.OnBackgroundUnfocused
                : Colors.light.OnBackgroundUnfocused,
              marginBottom: 16,
            }}
          />
          <HeadlineFive
            style={{
              textAlign: 'center',
              color: darkMode
                ? Colors.dark.OnBackgroundUnfocused
                : Colors.light.OnBackgroundUnfocused,
            }}
          >
            This group has no events
          </HeadlineFive>
        </PlaceholderLayout>
        {canCreate && (
          <FloatingAction
            actions={myActions}
            onPressItem={name => eventFloatingButtonActions(name)}
            color={darkMode ? Colors.dark.primary : Colors.light.primary}
            overlayColor='rgba(68, 68, 68, 0)'
            overrideWithAction
            iconWidth={24}
            iconHeight={24}
            iconColor={
              darkMode
                ? Colors.dark.OnPrimaryActive
                : Colors.light.OnPrimaryActive
            }
            floatingIcon={require('../../assets/images/icons/event.png')}
            actionsPaddingTopBottom={0}
          />
        )}
      </>
    );
  }

  return (
    <>
      <ScrollViewLayout>
        <SubHeader title='Nuevos eventos' />
        {newEvents
          .map(event => (
            <EventListItem
              key={event._id}
              title={event.title}
              subtitle={'Cuando: ' + moment(event.when).calendar()}
              icon={{ uri: event.sport.iconUrl }}
              onPress={() =>
                props.navigation.navigate('EventDetailScreen', {
                  title: event.title,
                  _id: event._id,
                })
              }
              style={{ marginHorizontal: 16 }}
            />
          ))
          .reverse()}
        <SubHeader title='Eventos pasados' />
        {pastEvents
          .map(event => (
            <TwoLineWithIcon
              icon={{ uri: event.sport.iconUrl }}
              key={event._id}
              title={event.title}
              subtitle={moment(event.when).calendar()}
              onPress={() =>
                props.navigation.navigate('EventDetailScreen', {
                  title: event.title,
                  _id: event._id,
                })
              }
            />
          ))
          .reverse()}
      </ScrollViewLayout>
      {canCreate && (
        <FloatingAction
          actions={myActions}
          onPressItem={name => eventFloatingButtonActions(name)}
          color={darkMode ? Colors.dark.primary : Colors.light.primary}
          overlayColor='rgba(68, 68, 68, 0)'
          overrideWithAction
          iconWidth={24}
          iconHeight={24}
          iconColor={
            darkMode
              ? Colors.dark.OnPrimaryActive
              : Colors.light.OnPrimaryActive
          }
          floatingIcon={require('../../assets/images/icons/event.png')}
          actionsPaddingTopBottom={0}
        />
      )}
    </>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('common:events'),
  };
};
