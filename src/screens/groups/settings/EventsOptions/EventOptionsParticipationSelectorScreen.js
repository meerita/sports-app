/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import { t } from '../../../../services/i18n';
import Colors from '../../../../constants/Colors';
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import { useToast } from 'react-native-toast-notifications';
import BodyTwo from '../../../../components/type/BodyTwo';
import { updateEventParticipation } from '../../../../store/actions/group';
import { changeEventParticipation } from '../../../../store/actions/event';

export default function EventOptionsParticipationSelectorScreen(props) {
  // we use this to use different texts and dispatch functions depending
  // if we are editing one event or the group settings events
  const eventOnEdition = props.route.params
    ? props.route.params.editEvent
    : false;
  const eventId = props.route.params ? props.route.params.eventId : false;
  const groupId = props.route.params ? props.route.params.groupId : false;

  // groupDetails
  const participationPreferences = eventOnEdition
    ? useSelector(state => state.event.eventDetail.allowedParticipants)
    : useSelector(
        state => state.group.groupDetail.preferences.events.participation
      );

  const toast = useToast();

  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(
    participationPreferences === 'any-member'
      ? 0
      : participationPreferences === 'only-members'
      ? 1
      : participationPreferences === 'only-admins'
      ? 2
      : 3
  );

  // The current options for creating the radio button options
  const OPTIONS = [
    {
      label: t('groups:settings.events.types.any-member'),
      value: 'any-member',
    },
    {
      label: t('groups:settings.events.types.only-members'),
      value: 'only-members',
    },
    {
      label: t('groups:settings.events.types.only-admins'),
      value: 'only-admins',
    },
    {
      label: t('groups:settings.events.types.anyone'),
      value: 'anyone',
    },
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {eventOnEdition
          ? "Select which members or external users can participate in this event. If you select 'anyone' and later you change this option, you may have to edit your participants list later to take out any possible non-group member."
          : t('groups:settings.events.participationDesc')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            eventOnEdition
              ? changeEventParticipation({
                  eventId: eventId,
                  groupId: groupId,
                  allowedParticipants: option.value,
                })
              : updateEventParticipation(option.value)
          ),
          setSelected(index),
          toast.show(t('common:infoUpdated')),
          props.navigation.goBack()
        )}
      />
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS
export const screenOptions = navData => {
  const editingEvent = navData.route.params
    ? navData.route.params.editEvent
    : false;
  return {
    headerTitle: editingEvent
      ? 'Event participation'
      : t('groups:settings.events.participation'),
    presentation: 'modal',
  };
};
