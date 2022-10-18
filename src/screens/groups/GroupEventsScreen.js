/** @format */

import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../services/i18n';

// components
import SubtitleOne from '../../components/type/SubtitleOne';
import ScrollViewLayout from '../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import TwoLineWithIcon from '../../components/Lists/TwoLines/TwoLineWithIcon';
import SubHeader from '../../components/SubHeader/SubHeader';

// STORE
import { getGroupEvents } from '../../store/actions/group';

export default function GroupEventsScreen(props) {
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

  const pastEvents = groupEvents.filter(group => !group.open);

  if (groupEvents.length < 1) {
    return (
      <ScrollViewLayout>
        <SubtitleOne>This group has no events</SubtitleOne>
      </ScrollViewLayout>
    );
  }

  return (
    <ScrollViewLayout>
      <SubHeader title='Nuevos eventos' />
      {newEvents.map(event => (
        <TwoLineWithIcon
          icon={{ uri: event.sport.iconUrl }}
          key={event._id}
          title={event.title}
          subtitle={event.sport.title}
          onPress={() =>
            props.navigation.navigate('EventDetailScreen', {
              title: event.title,
              _id: event._id,
            })
          }
        />
      ))}
      <SubHeader title='Eventos pasados' />
      {pastEvents.map(event => (
        <TwoLineWithIcon
          icon={{ uri: event.sport.iconUrl }}
          key={event._id}
          title={event.title}
          subtitle={event.sport.title}
          onPress={() =>
            props.navigation.navigate('EventDetailScreen', {
              title: event.title,
              _id: event._id,
            })
          }
        />
      ))}
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  return {
    headerTitle: t('common:events'),
  };
};
