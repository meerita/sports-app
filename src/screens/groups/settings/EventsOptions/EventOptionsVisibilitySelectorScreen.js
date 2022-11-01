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
import { updateEventVisibility } from '../../../../store/actions/group';
import { changeCustomEventVisibility } from '../../../../store/actions/event';
import { eventActions } from '../../../../store/slices/event';

export default function EventOptionsVisibilitySelectorScreen(props) {
  // we use this to use different texts and dispatch functions depending
  // if we are editing one event or the group settings events
  const eventOnEdition = props.route.params
    ? props.route.params.editEvent
    : false;

  const eventOnCreation = props.route.params
    ? props.route.params.createEvent
    : false;

  const eventId = props.route.params ? props.route.params.eventId : false;
  const groupId = props.route.params ? props.route.params.groupId : false;

  // event visibility settings or group event visibility settings
  const eventVisibility = eventOnEdition
    ? useSelector(state => state.event.eventDetail.visibility)
    : eventOnCreation
    ? useSelector(
        state => state.group.groupDetail.preferences.events.visibility
      )
    : useSelector(
        state => state.group.groupDetail.preferences.events.visibility
      );

  const toast = useToast();

  const dispatch = useDispatch();

  // what radiobutton is checked first
  const [selected, setSelected] = useState(!eventVisibility ? 0 : 1);

  // The current options for creating the radio button options
  const OPTIONS = [
    {
      label: t('groups:settings.events.types.only-my-group'),
      value: false,
    },
    {
      label: t('groups:settings.events.types.anyone'),
      value: true,
    },
  ];

  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        {eventOnEdition
          ? "If you want to make public this event so other players join your activity, you can do it here. You can change the visibility settings of this event without affecting your group's settings."
          : t('groups:settings.events.visibilityDesc')}
      </BodyTwo>
      <SingleLineWithRadio
        options={OPTIONS}
        selected={selected}
        onChangeSelect={(option, index) => (
          dispatch(
            eventOnEdition
              ? changeCustomEventVisibility({
                  eventId: eventId,
                  groupId: groupId,
                })
              : eventOnCreation
              ? eventActions.createEventVisibility({ visibility: option.value })
              : updateEventVisibility(option.value)
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

  const eventOnCreation = navData.route.params
    ? navData.route.params.createEvent
    : false;

  return {
    headerTitle: editingEvent
      ? 'Event visibility'
      : eventOnCreation
      ? 'no'
      : t('groups:settings.events.visibility'),
    presentation: 'modal',
  };
};
