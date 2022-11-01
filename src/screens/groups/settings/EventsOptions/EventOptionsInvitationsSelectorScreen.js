/** @format */
import React from 'react';
import { t } from '../../../../services/i18n';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

// CONSTANTS
import Colors from '../../../../constants/Colors';

// COMPONENTS
import SingleLineWithRadio from '../../../../components/Lists/OneLine/SingleLineWithRadio';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../../components/type/BodyTwo';

// STORE
import {
  updateEventVisibility,
  updateMyGroupDiversity,
  updateMyGroupInvitations,
} from '../../../../store/actions/group';
import {
  changeCustomEventVisibility,
  changeEventGenderRequirement,
  changeEventInvitations,
} from '../../../../store/actions/event';
import { eventActions } from '../../../../store/slices/event';

export default function EventOptionsInvitationsSelectorScreen(props) {
  // we use this to use different texts and dispatch functions depending
  // if we are editing one event or the group settings events
  const eventOnEdition = props.route.params
    ? props.route.params.editEvent
    : false;

  const createEvent = props.route.params
    ? props.route.params.createEvent
    : false;

  const eventId = props.route.params ? props.route.params.eventId : false;
  const groupId = props.route.params ? props.route.params.groupId : false;

  // event visibility settings or group event visibility settings
  const invitationSelector = eventOnEdition
    ? useSelector(state => state.event.eventDetail.allowInvitations)
    : createEvent
    ? useSelector(state => state.event.createEvent.allowInvitations)
    : useSelector(
        state => state.group.groupDetail.preferences.event.invitations
      );

  // we initialize Toasts
  const toast = useToast();

  // loading state
  const [loading, setLoading] = useState(false);

  // we manage the errors
  const [newError, setNewError] = useState();

  // we setup the use of dispatch
  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(!invitationSelector ? 0 : 1);

  // The current options for creating the radio button options
  const OPTIONS = [
    {
      label: 'No invitations',
      value: false,
    },
    {
      label: 'Invitations allowed',
      value: true,
    },
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {eventOnEdition || createEvent
          ? 'Allow non-group users to register in your event on the invitatation list. You can add them as participant manually.'
          : 'When you create an event, you can preset the invitation feature. All non-members can register in your event in the invitation list. You can add them as participant manually.'}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            eventOnEdition
              ? changeEventInvitations({
                  eventId: eventId,
                  groupId: groupId,
                  gender: option.value,
                })
              : createEvent
              ? eventActions.createEventInvitations({
                  allowInvitations: option.value,
                })
              : updateMyGroupInvitations(option.value)
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
  const createEvent = navData.route.params
    ? navData.route.params.createEvent
    : false;
  return {
    headerTitle:
      editingEvent || createEvent
        ? 'Allow invitation list'
        : 'Invitation list options',
    presentation: 'modal',
  };
};
